import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import Link from "next/link";
import { useParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import countryData from "../../public/Countries_codinats.json";
import "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

const defaultIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const formatStateName = (stateName) => {
    try {
        const decodedState = decodeURIComponent(stateName);
        const withoutAuctions = decodedState.replace(/-auctions$/, '');
        const withSpaces = withoutAuctions.replace(/-/g, ' ');
        return withSpaces;
    } catch (error) {
        console.error('Error formatting state name:', error);
        return stateName;
    }
};

// Function to generate spread out coordinates
const generateSpreadCoordinates = (baseLatitude, baseLongitude, index, totalCities) => {
    const spread = 0.1; // Spread cities by 0.1 degrees
    const row = Math.floor(index / 3); // 3 cities per row
    const col = index % 3;
    
    return {
        lat: baseLatitude + (row * spread),
        lng: baseLongitude + (col * spread)
    };
};

const ChangeMapView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [center, zoom, map]);
    return null;
};

const CountryMapCities = ({ countryName, stateName }) => {
    const [cities, setCities] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapZoom, setMapZoom] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();

    useEffect(() => {
        const loadCitiesData = () => {
            setIsLoading(true);
            try {
                // Normalize country name
                const cleanedCountryName = countryName.replace(/[\s-]?auction$/, "").trim();
                const formattedCountryName = cleanedCountryName
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ");
    
                // Normalize state name
                const formattedStateName = formatStateName(stateName);
    
                console.log('Looking for country:', formattedCountryName);
                console.log('Looking for state:', formattedStateName);
    
                const country = countryData[formattedCountryName];
                if (!country || !country.states) {
                    console.error('Country data not found or invalid:', formattedCountryName);
                    setError(`Country "${formattedCountryName}" not found or has no states.`);
                    setIsLoading(false);
                    return;
                }
    
                const stateKey = Object.keys(country.states).find(
                    (key) => key.toLowerCase() === formattedStateName.toLowerCase()
                );
    
                if (!stateKey) {
                    console.error('State not found:', formattedStateName);
                    console.error('Available states:', Object.keys(country.states));
                    setError(`State "${formattedStateName}" not found. Available states: ${Object.keys(country.states).join(', ')}`);
                    setIsLoading(false);
                    return;
                }
    
                const state = country.states[stateKey];
                console.log('Found state:', stateKey);
                console.log('State data:', state);
    
                if (!state || !state.cities) {
                    console.error('State has no cities data');
                    setError(`No cities data available for state "${formattedStateName}".`);
                    setIsLoading(false);
                    return;
                }
    
                const totalCities = Object.keys(state.cities).length;
    
                // Format cities
                const formattedCities = Object.entries(state.cities).map(([cityName, cityData], index) => {
                    const coordinates = cityData.latitude && cityData.longitude
                        ? { lat: cityData.latitude, lng: cityData.longitude }
                        : generateSpreadCoordinates(state.latitude, state.longitude, index, totalCities);
    
                    return { name: cityName, coordinates };
                });
    
                setCities(formattedCities);
                setMapCenter({ lat: state.latitude, lng: state.longitude });
                setMapZoom(totalCities > 5 ? 7 : 8);
            } catch (err) {
                console.error("Error loading cities:", err);
                setError("Failed to load cities data: " + err.message);
            } finally {
                setIsLoading(false);
            }
        };
    
        loadCitiesData();
    }, [countryName, stateName]);
    

    const handleMarkerClick = (cityName) => {
        const formattedCityName = cityName.toLowerCase().replace(/\s+/g, "-");
        return `/${params.slug}/${params.statename}/${encodeURIComponent(formattedCityName)}`;
    };

    if (isLoading) {
        return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500" />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!mapCenter) {
        return <div className="text-gray-500">No cities found</div>;
    }

    return (
        <div className="relative w-full">
            <div className="h-[400px] w-full relative">
                <MapContainer
                    center={[mapCenter.lat, mapCenter.lng]}
                    zoom={mapZoom}
                    className="h-full w-full rounded-lg shadow-lg"
                    gestureHandling={true}
                    scrollWheelZoom={false}
                    dragging={true}
                    tap={false}
                    style={{ 
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1
                    }}
                >
                    <ChangeMapView center={[mapCenter.lat, mapCenter.lng]} zoom={mapZoom} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {cities && cities.map((city, index) => (
                        <Marker
                            key={`${city.name}-${index}`}
                            position={[city.coordinates.lat, city.coordinates.lng]}
                            icon={defaultIcon}
                        >
                            <Popup>
                                <Link
                                    href={handleMarkerClick(city.name)}
                                    className="block"
                                >
                                    <div className="text-white bg-gray-900 hover:bg-gray-800 font-semibold p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                                    <h3 className="text-white capitalize">{city.name}</h3>
                                    </div>
                                </Link>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default CountryMapCities;