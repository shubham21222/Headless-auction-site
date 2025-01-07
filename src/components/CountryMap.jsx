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

const CountryMap = ({ countryName, stateName = null }) => {
    const [locations, setLocations] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapZoom, setMapZoom] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatCountryKey = (name) => {
        return name.toLowerCase()
            .replace(/-/g, ' ')
            .replace(/ /g, '_');
    };

    const countryKey = formatCountryKey(countryName);
    const countryConfig = countryConfigs[countryKey];

    useEffect(() => {
        const fetchLocations = async () => {
            if (!countryConfig) {
                setError("Country configuration not found");
                setIsLoading(false);
                return;
            }

            try {
                const headers = new Headers();
                headers.append("X-CSCAPI-KEY", "ZzIzSTA5TEJnWUVFakFRY3lhT0FubVE4ZmNzdDNNY0ZlcTBCM1ppTg==");

                if (stateName) {
                    // Fetch cities for specific state
                    const statesResponse = await fetch(
                        `https://api.countrystatecity.in/v1/countries/${countryConfig.code}/states`,
                        { headers }
                    );

                    if (!statesResponse.ok) throw new Error('Failed to fetch states');
                    const statesData = await statesResponse.json();

                    const state = statesData.find(s =>
                        s.name.toLowerCase() === stateName.toLowerCase().replace(/-/g, ' ')
                    );

                    if (state) {
                        const citiesResponse = await fetch(
                            `https://api.countrystatecity.in/v1/countries/${countryConfig.code}/states/${state.iso2}/cities`,
                            { headers }
                        );

                        if (!citiesResponse.ok) throw new Error('Failed to fetch cities');
                        const citiesData = await citiesResponse.json();
                        console.log('====================================');
                        console.log(state,"state");
                        console.log('====================================');

                        const cityLocations = citiesData
                            .filter(city => city.latitude && city.longitude)
                            .map(city => ({
                                name: city.name,
                                coordinates: {
                                    lat: parseFloat(city.latitude),
                                    lng: parseFloat(city.longitude)
                                }
                            }));

                        setLocations(cityLocations);

                        if (cityLocations.length > 0) {
                            // Center map on first city
                            setMapCenter(cityLocations[0].coordinates);
                            setMapZoom(8);
                        }
                    }
                } else {
                    // Original state fetching logic
                    const statesResponse = await fetch(
                        `https://api.countrystatecity.in/v1/countries/${countryConfig.code}/states`,
                        { headers }
                    );

                    if (!statesResponse.ok) throw new Error('Failed to fetch states');
                    const statesData = await statesResponse.json();

                    const stateLocations = await Promise.all(
                        statesData.map(async (state) => {
                            const citiesResponse = await fetch(
                                `https://api.countrystatecity.in/v1/countries/${countryConfig.code}/states/${state.iso2}/cities`,
                                { headers }
                            );

                            if (!citiesResponse.ok) return null;                
                            console.log('====================================');
                        console.log(state,"state");
                        console.log('====================================');
                            const citiesData = await citiesResponse.json();

                            if (citiesData?.length) {
                                const coords = citiesData.reduce((acc, city) => {
                                    if (city.latitude && city.longitude) {
                                        acc.latSum += parseFloat(city.latitude);
                                        acc.lngSum += parseFloat(city.longitude);
                                        acc.count++;
                                    }
                                    return acc;
                                }, { latSum: 0, lngSum: 0, count: 0 });

                                return coords.count > 0 ? {
                                    name: state.name,
                                    coordinates: {
                                        lat: coords.latSum / coords.count,
                                        lng: coords.lngSum / coords.count
                                    }
                                } : null;
                            }
                            return null;
                        })
                    );

                    setLocations(stateLocations.filter(loc => loc !== null));
                    setMapCenter(countryConfig.center);
                    setMapZoom(countryConfig.zoom);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, [countryConfig, stateName]);

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