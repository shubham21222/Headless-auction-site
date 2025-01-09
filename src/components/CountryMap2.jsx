import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import structuredCountries from "../../public/structured_countries.json";

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
        console.log("ChangeMapView - Updating map view:", { center, zoom });
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const CountryMapCities = ({ countryName, stateName }) => {
    console.log("CountryMapCities - Component initialized with:", { countryName, stateName });

    const [locations, setLocations] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapZoom, setMapZoom] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatCountryKey = (name) => `${name.toLowerCase()} auction`;
    const formatStateKey = (name) => `${name.toLowerCase()} auctions`;

    const getCitiesFromStructuredData = (countryKey, stateKey) => {
        console.log("getCitiesFromStructuredData - Fetching cities for:", { countryKey, stateKey });
        const country = structuredCountries.find((c) => Object.keys(c)[0] === countryKey);

        if (!country) {
            console.warn("getCitiesFromStructuredData - Country not found:", countryKey);
            return [];
        }

        const states = country[countryKey];
        if (!states || states.length === 0) {
            console.warn("getCitiesFromStructuredData - No states found for country:", countryKey);
            return [];
        }

        const state = states.find((s) => Object.keys(s)[0] === stateKey);
        if (!state) {
            console.warn("getCitiesFromStructuredData - State not found:", stateKey);
            return [];
        }

        const cities = state[stateKey];
        console.log("getCitiesFromStructuredData - Cities found:", cities);
        return cities;
    };

    useEffect(() => {
        const fetchLocations = async () => {
            setIsLoading(true);
            try {
                const countryKey = formatCountryKey(countryName);
                const stateKey = formatStateKey(stateName);

                console.log("fetchLocations - Formatted keys:", { countryKey, stateKey });

                const cities = getCitiesFromStructuredData(countryKey, stateKey);
                if (!cities.length) {
                    throw new Error("No cities found in the JSON for the specified state.");
                }

                for (const city of cities) {
                    console.log("fetchLocations - Geocoding city:", city);
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
                                const newLocation = {
                                    name: city,
                                    coordinates: { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) },
                                };

                                setLocations((prevLocations) => {
                                    if (prevLocations.length === 0) {
                                        setMapCenter(newLocation.coordinates);
                                    }
                                    return [...prevLocations, newLocation];
                                });

                                setMapZoom(8); // Adjust zoom when the first city is added
                            }
                        }
                    } catch (error) {
                        console.error(`fetchLocations - Error fetching data for city: ${city}`, error);
                    }
                }

                setIsLoading(false);
            } catch (err) {
                console.error("fetchLocations - Error:", err.message);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, [countryName, stateName]);

    if (isLoading && locations.length === 0) return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500" />;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!mapCenter) return null;

    return (
        <div className="h-[400px] w-full pb-10">
            <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={mapZoom} className="h-full w-full rounded-lg shadow-lg">
                <ChangeMapView center={[mapCenter.lat, mapCenter.lng]} zoom={mapZoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location, index) => (
                    <Marker key={index} position={[location.coordinates.lat, location.coordinates.lng]} icon={defaultIcon}>
                        <Popup>
                            <div className="font-semibold">{location.name}</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default CountryMapCities;
