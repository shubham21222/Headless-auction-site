import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import countryConfigs from "@/data/countryConfigs";

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
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const CountryMap2 = ({ countryName, stateName = null }) => {
    const [locations, setLocations] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapZoom, setMapZoom] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatCountryKey = (name) => {
        let formatted = name.toLowerCase()
            .replace(/-/g, '_')
            .replace(/ /g, '_');
        
        if (!formatted.endsWith('_auction')) {
            formatted += '_auction';
        }
        
        return formatted;
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const formattedCountryKey = formatCountryKey(countryName);
                const config = countryConfigs[formattedCountryKey];

                if (!config) {
                    throw new Error(`Country configuration not found for ${countryName}`);
                }

                const headers = new Headers();
                headers.append("X-CSCAPI-KEY", "ZzIzSTA5TEJnWUVFakFRY3lhT0FubVE4ZmNzdDNNY0ZlcTBCM1ppTg==");
                
                const requestOptions = {
                    method: 'GET',
                    headers: headers,
                    redirect: 'follow'
                };

                // Set map center and zoom immediately
                setMapCenter(config.center);
                setMapZoom(config.zoom);

                if (stateName) {
                    // Existing state-level logic
                    const statesResponse = await fetch(
                        `https://api.countrystatecity.in/v1/countries/${config.code}/states`,
                        requestOptions
                    );

                    if (!statesResponse.ok) throw new Error('Failed to fetch states');
                    const statesData = await statesResponse.json();

                    const formattedStateName = stateName.toLowerCase()
                        .replace(/-auctions$/, '')
                        .replace(/-/g, ' ');

                    const state = statesData.find(s => 
                        s.name.toLowerCase() === formattedStateName ||
                        s.name.toLowerCase().includes(formattedStateName)
                    );

                    if (state) {
                        const citiesResponse = await fetch(
                            `https://api.countrystatecity.in/v1/countries/${config.code}/states/${state.iso2}/cities`,
                            requestOptions
                        );

                        if (!citiesResponse.ok) throw new Error('Failed to fetch cities');
                        const citiesData = await citiesResponse.json();

                        const cityLocations = citiesData
                            .filter(city => city.latitude && city.longitude)
                            .map(city => ({
                                name: city.name,
                                coordinates: {
                                    lat: parseFloat(city.latitude),
                                    lng: parseFloat(city.longitude)
                                }
                            }));

                        if (cityLocations.length > 0) {
                            const center = cityLocations.reduce(
                                (acc, city) => ({
                                    lat: acc.lat + city.coordinates.lat / cityLocations.length,
                                    lng: acc.lng + city.coordinates.lng / cityLocations.length
                                }),
                                { lat: 0, lng: 0 }
                            );

                            setLocations(cityLocations);
                            setMapCenter(center);
                            setMapZoom(9);
                        }
                    }
                } else {
                    // New country-level view with city fetching
                    const statesResponse = await fetch(
                        `https://api.countrystatecity.in/v1/countries/${config.code}/states`,
                        requestOptions
                    );

                    if (!statesResponse.ok) throw new Error('Failed to fetch states');
                    const statesData = await statesResponse.json();

                    // Get cities from first 3 states to ensure we have some markers
                    const allCities = [];
                    for (const state of statesData.slice(0, 3)) {
                        try {
                            const citiesResponse = await fetch(
                                `https://api.countrystatecity.in/v1/countries/${config.code}/states/${state.iso2}/cities`,
                                requestOptions
                            );

                            if (citiesResponse.ok) {
                                const citiesData = await citiesResponse.json();
                                allCities.push(...citiesData);
                            }
                        } catch (error) {
                            console.error(`Error fetching cities for state ${state.name}:`, error);
                        }
                    }

                    const cityLocations = allCities
                        .filter(city => city.latitude && city.longitude)
                        .slice(0, 15) // Limit to 15 cities for better performance
                        .map(city => ({
                            name: city.name,
                            coordinates: {
                                lat: parseFloat(city.latitude),
                                lng: parseFloat(city.longitude)
                            }
                        }));

                    setLocations(cityLocations);
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, [countryName, stateName]);

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

export default CountryMap2;