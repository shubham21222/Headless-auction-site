import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import countryConfigs from "@/data/countryConfigs";
import statesData from "../../public/states.json";

const defaultIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const ChangeMapView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        console.log("Changing map view:", { center, zoom });
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const CountryMap = ({ countryName }) => {
    const [locations, setLocations] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapZoom, setMapZoom] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatCountryConfigKey = (name) => {
        const formattedKey = name
            .toLowerCase()
            .replace(/[\s-]/g, '_');
        
        console.log("Formatted country key for countryConfigs:", formattedKey);
        return formattedKey;
    };

    const formatStatesKey = (name) => {
        const formattedKey = name
            .toLowerCase()
            .replace(/[_-]/g, ' ');
        console.log("Formatted country key for statesData:", formattedKey);
        return formattedKey;
    };

    const fetchOverpassData = async (countryCode) => {
        const query = `
            [out:json][timeout:25];
            area["iso3166-1"="${countryCode}"]->.country;
            (
                relation["admin_level"="4"]["boundary"="administrative"](area.country);
                relation["admin_level"="5"]["boundary"="administrative"](area.country);
            );
            out body;
            >;
            out skel qt;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from Overpass API');
        }

        const data = await response.json();
        return data;
    };

    const processOverpassData = (data) => {
        const states = [];
        const nodes = {};

        // First, create a map of all nodes
        data.elements.forEach(element => {
            if (element.type === 'node') {
                nodes[element.id] = element;
            }
        });

        // Then process relations (states)
        data.elements.forEach(element => {
            if (element.type === 'relation') {
                const stateName = element.tags?.name;
                if (stateName) {
                    // Calculate center point from member nodes
                    let lat = 0, lon = 0, count = 0;
                    element.members.forEach(member => {
                        if (member.type === 'node' && nodes[member.ref]) {
                            lat += nodes[member.ref].lat;
                            lon += nodes[member.ref].lon;
                            count++;
                        }
                    });

                    if (count > 0) {
                        states.push({
                            name: stateName,
                            coordinates: {
                                lat: lat / count,
                                lng: lon / count
                            }
                        });
                    }
                }
            }
        });

        return states;
    };

    const countryConfigKey = formatCountryConfigKey(countryName);
    const countryConfig = countryConfigs[countryConfigKey];

    useEffect(() => {
        const fetchLocations = async () => {
            if (!countryConfig) {
                console.error("Country configuration not found.");
                setError("Country configuration not found");
                setIsLoading(false);
                return;
            }

            try {
                console.log("Fetching data for country:", countryConfigKey);

                // First try: CountryStateCity API
                const headers = new Headers();
                headers.append("X-CSCAPI-KEY", "ZzIzSTA5TEJnWUVFakFRY3lhT0FubVE4ZmNzdDNNY0ZlcTBCM1ppTg==");

                const statesDataKey = formatStatesKey(countryName);
                const countryStates = statesData.find((item) => item[statesDataKey]);
                if (!countryStates) {
                    throw new Error("No states found for this country in the JSON file.");
                }

                const stateNames = countryStates[statesDataKey];
                console.log("States found in JSON:", stateNames);

                let stateLocations = [];
                
                // Try CountryStateCity API
                try {
                    const statesResponse = await fetch(
                        `https://api.countrystatecity.in/v1/countries/${countryConfig.code}/states`,
                        { headers }
                    );
                    
                    if (statesResponse.ok) {
                        const apiStates = await statesResponse.json();
                        console.log("API States:", apiStates);

                        if (apiStates.length > 0) {
                            const matchedStates = apiStates.filter((apiState) =>
                                stateNames.some((stateName) => 
                                    stateName.toLowerCase() === apiState.name.toLowerCase()
                                )
                            );
                            console.log("Matched States:", matchedStates);

                            stateLocations = await Promise.all(
                                matchedStates.map(async (state) => {
                                    const citiesResponse = await fetch(
                                        `https://api.countrystatecity.in/v1/countries/${countryConfig.code}/states/${state.iso2}/cities`,
                                        { headers }
                                    );

                                    if (!citiesResponse.ok) return null;

                                    const citiesData = await citiesResponse.json();
                                    console.log(`Cities data for ${state.name}:`, citiesData);

                                    if (citiesData.length) {
                                        const coords = citiesData.reduce((acc, city) => {
                                            if (city.latitude && city.longitude) {
                                                acc.latSum += parseFloat(city.latitude);
                                                acc.lngSum += parseFloat(city.longitude);
                                                acc.count++;
                                            }
                                            return acc;
                                        }, { latSum: 0, lngSum: 0, count: 0 });

                                        return coords.count > 0
                                            ? {
                                                name: state.name,
                                                coordinates: {
                                                    lat: coords.latSum / coords.count,
                                                    lng: coords.lngSum / coords.count,
                                                },
                                            }
                                            : null;
                                    }
                                    return null;
                                })
                            );
                        }
                    }
                } catch (error) {
                    console.warn("CountryStateCity API failed:", error);
                }

                // Second try: Nominatim API
                if (stateLocations.filter(loc => loc !== null).length === 0) {
                    console.warn("Trying Nominatim API as fallback...");
                    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                    
                    stateLocations = [];
                    for (const stateName of stateNames) {
                        try {
                            const response = await fetch(
                                `https://nominatim.openstreetmap.org/search?` +
                                `q=${encodeURIComponent(stateName)},${encodeURIComponent(countryName)}` +
                                `&format=json&limit=1&addressdetails=1`,
                                {
                                    headers: {
                                        'User-Agent': 'CountryMapComponent/1.0'
                                    }
                                }
                            );

                            if (response.ok) {
                                const data = await response.json();
                                if (data.length > 0) {
                                    stateLocations.push({
                                        name: stateName,
                                        coordinates: {
                                            lat: parseFloat(data[0].lat),
                                            lng: parseFloat(data[0].lon)
                                        }
                                    });
                                }
                            }
                            await delay(1000); // Respect rate limits
                        } catch (error) {
                            console.warn("Nominatim API failed for state:", stateName, error);
                        }
                    }
                }

                // Third try: Overpass API
                if (stateLocations.filter(loc => loc !== null).length === 0) {
                    console.warn("Trying Overpass API as final fallback...");
                    try {
                        const overpassData = await fetchOverpassData(countryConfig.code);
                        stateLocations = processOverpassData(overpassData);
                        console.log("States found via Overpass API:", stateLocations);
                    } catch (error) {
                        console.error("Overpass API failed:", error);
                    }
                }

                // Final fallback: Use country center point
                if (stateLocations.filter(loc => loc !== null).length === 0) {
                    console.warn("All APIs failed. Using country center point.");
                    stateLocations = [{
                        name: countryName,
                        coordinates: {
                            lat: countryConfig.center.lat,
                            lng: countryConfig.center.lng
                        }
                    }];
                    setMapZoom(4);
                }

                setLocations(stateLocations.filter((loc) => loc !== null));
                setMapCenter(countryConfig.center);
            } catch (err) {
                console.error("Error during data fetch:", err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, [countryConfigKey, countryName, countryConfig]);

    if (isLoading) return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500" />;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!mapCenter) return null;

    return (
        <div className="h-[400px] w-full">
            <MapContainer
                center={[mapCenter.lat, mapCenter.lng]}
                zoom={mapZoom}
                className="h-full w-full rounded-lg shadow-lg"
            >
                <ChangeMapView
                    center={[mapCenter.lat, mapCenter.lng]}
                    zoom={mapZoom}
                />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={[location.coordinates.lat, location.coordinates.lng]}
                        icon={defaultIcon}
                    >
                        <Popup>
                            <div className="font-semibold">{location.name}</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default CountryMap;