import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import Link from "next/link";
import { useParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import countryData from "../../public/Countries_codinats.json";

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
        // Force a refresh for mobile
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [center, zoom, map]);
    return null;
};

const CountryMap = ({ countryName }) => {
    const [states, setStates] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapZoom, setMapZoom] = useState(6);
    const params = useParams();

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    
    useEffect(() => {
        // Remove suffix like "auction" and trim any extra spaces
        const cleanedCountryName = countryName
            .replace(/[\s-]?auction$/, "") // Remove "auction" suffix
            .trim(); // Remove extra spaces
    
        // Format the cleaned country name to match the JSON format
        const formattedCountryName = toTitleCase(cleanedCountryName);
    
        if (formattedCountryName && countryData[formattedCountryName]) {
            const country = countryData[formattedCountryName];
    
            setMapCenter({
                lat: country.latitude,
                lng: country.longitude,
            });
    
            const formattedStates = Object.keys(country.states).map((stateName) => {
                const state = country.states[stateName];
                return {
                    name: stateName,
                    coordinates: {
                        lat: state.latitude,
                        lng: state.longitude,
                    },
                    cities: Object.keys(state.cities),
                };
            });
    
            setStates(formattedStates);
        } else {
            console.warn(`Country "${formattedCountryName}" not found in data.`);
        }
    }, [countryName]);
    

    if (!mapCenter) {
        return <div className="text-gray-500">Loading...</div>;
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
                    {states.map((state, index) => (
                        <Marker
                            key={index}
                            position={[state.coordinates.lat, state.coordinates.lng]}
                            icon={defaultIcon}
                        >
                            <Popup>
                                <Link
                                    href={`/${params.slug}/${state.name.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                    <div className="bg-gray-900 hover:bg-gray-800 font-semibold text-white p-3 rounded-lg shadow-md transition-colors cursor-pointer">
                                        {state.name}
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

export default CountryMap;