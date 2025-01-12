import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import structuredCountries from "../../public/structured_countries.json";
import countryConfigs from "@/data/countryConfigs";
// Import your country configs

const defaultIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const getCountryConfig = async (countryName) => {
    const countryKey = `${countryName.toLowerCase().replace(/\s+/g, '_')}_auction`;

    // Check if country exists in configs
    if (countryConfigs[countryKey]) {
        return {
            center: countryConfigs[countryKey].center,
            zoom: countryConfigs[countryKey].zoom
        };
    }

    // Fallback to geocoding if country not in configs
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(countryName)}&format=json&limit=1`,
            { headers: { "User-Agent": "CountryMapComponent/1.0" } }
        );

        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                return {
                    center: {
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lon)
                    },
                    zoom: 6
                };
            }
        }
    } catch (error) {
        console.error("Error geocoding country:", error);
    }

    // Default fallback
    return {
        center: { lat: 0, lng: 0 },
        zoom: 2
    };
};

const ChangeMapView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const CountryMapCities = ({ countryName, stateName }) => {
    const [locations, setLocations] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapZoom, setMapZoom] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usingFallback, setUsingFallback] = useState(false);

    const formatCountryKey = (name) => `${name.toLowerCase()} auction`;
    const formatStateKey = (name) => `${name.toLowerCase()} auctions`;

    const getCitiesFromStructuredData = (countryKey, stateKey) => {
        const country = structuredCountries.find((c) => Object.keys(c)[0] === countryKey);
        if (!country) return [];

        const states = country[countryKey];
        if (!states || states.length === 0) return [];

        const state = states.find((s) => Object.keys(s)[0] === stateKey);
        if (!state) return [];

        return state[stateKey] || [];
    };

    useEffect(() => {
        const initializeMap = async () => {
            setIsLoading(true);
            setLocations([]);
            setError(null);
            setUsingFallback(false);

            try {
                // First try to get cities
                const countryKey = formatCountryKey(countryName);
                const stateKey = formatStateKey(stateName);
                const cities = getCitiesFromStructuredData(countryKey, stateKey);
                let hasSuccessfulCities = false;

                if (cities.length > 0) {
                    for (const city of cities) {
                        try {
                            const response = await fetch(
                                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)},${encodeURIComponent(
                                    stateName
                                )},${encodeURIComponent(countryName)}&format=json&limit=1`,
                                { headers: { "User-Agent": "CountryMapComponent/1.0" } }
                            );

                            if (response.ok) {
                                const data = await response.json();
                                if (data.length > 0) {
                                    hasSuccessfulCities = true;
                                    const newLocation = {
                                        name: city,
                                        coordinates: { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) },
                                    };

                                    setLocations(prev => [...prev, newLocation]);
                                    if (!mapCenter) {
                                        setMapCenter(newLocation.coordinates);
                                        setMapZoom(8);
                                    }
                                }
                            }
                        } catch (error) {
                            console.error(`Error geocoding city ${city}:`, error);
                        }
                    }
                }

                // If no cities were successfully geocoded, fall back to country configuration
                if (!hasSuccessfulCities) {
                    const countryConfig = await getCountryConfig(countryName);
                    setMapCenter(countryConfig.center);
                    setMapZoom(countryConfig.zoom);
                    setUsingFallback(true);
                    // setError("Unable to load specific cities. Showing country overview.");
                }
            } catch (err) {
                console.error("Error initializing map:", err);
                // Final fallback to country configuration
                const countryConfig = await getCountryConfig(countryName);
                setMapCenter(countryConfig.center);
                setMapZoom(countryConfig.zoom);
                setUsingFallback(true);
                // setError("Unable to load specific locations. Showing country overview.");
            } finally {
                setIsLoading(false);
            }
        };

        initializeMap();
    }, [countryName, stateName]);

    if (isLoading && !mapCenter) {
        return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500" />;
    }

    if (!mapCenter) return null;

    return (
        <div className="h-[400px] w-full pb-10">
            {error && <div className="text-amber-600 mb-2">{error}</div>}
            <MapContainer
                center={[mapCenter.lat, mapCenter.lng]}
                zoom={mapZoom}
                className="h-full w-full rounded-lg shadow-lg"
                dragging={true} // Enable dragging
                touchZoom={true} // Enable zooming with gestures
                gestureHandling={true} // Custom plugin for gesture handling
                tap={false} // Avoid unintended taps while dragging
                wheelPxPerZoomLevel={100}
                zoomSnap={0.25}
            >
                <ChangeMapView center={[mapCenter.lat, mapCenter.lng]} zoom={mapZoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {!usingFallback && locations.map((location, index) => (
                    <Marker key={index} position={[location.coordinates.lat, location.coordinates.lng]} icon={defaultIcon}>
                        <Popup>
                            <div className="font-semibold">{location.name}</div>
                        </Popup>
                    </Marker>
                ))}
                {usingFallback && (
                    <Marker position={[mapCenter.lat, mapCenter.lng]} icon={defaultIcon}>
                        <Popup>
                            <div className="font-semibold">{countryName}</div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default CountryMapCities;