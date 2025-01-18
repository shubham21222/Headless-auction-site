import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import countryData from "../../public/Countries_codinats.json"; // Assuming your JSON data is saved here.

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
        console.log("Map view updated:", center, zoom); // Debugging map view updates
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const CountryMap = ({ countryName }) => {
    const [states, setStates] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapZoom, setMapZoom] = useState(6);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showStreetView, setShowStreetView] = useState(false);

    const toTitleCase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    

    useEffect(() => {
        console.log("Received countryName:", countryName); // Log the original countryName
    
        // Remove " auction" or "-auction" from the countryName
        const cleanedCountryName = countryName.replace(/[\s-]?auction$/, "");
        const formattedCountryName = toTitleCase(cleanedCountryName);
        console.log("Formatted countryName:", formattedCountryName); // Log the formatted countryName
    
        if (formattedCountryName && countryData[formattedCountryName]) {
            const country = countryData[formattedCountryName];
            console.log("Matched country data:", country); // Log matched country data
    
            // Set the map center to the country's coordinates
            setMapCenter({
                lat: country.latitude,
                lng: country.longitude,
            });
    
            // Extract states with coordinates and cities
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
    
            console.log("Formatted states:", formattedStates); // Log formatted states
            setStates(formattedStates);
        } else {
            console.warn("Country data not found for:", formattedCountryName); // Warn if no match found
        }
    }, [countryName]);
    
    

    const handleMarkerClick = (state) => {
        console.log("Marker clicked:", state); // Log marker click event
        setSelectedLocation(state);
        setShowStreetView(true);
    };

    if (!mapCenter) {
        console.log("Map center not set, displaying loading..."); // Log loading state
        return <div className="text-gray-500">Loading...</div>;
    }

    return (
        <div className="relative">
            <div className="h-[400px] w-full">
                <MapContainer
                    center={[mapCenter.lat, mapCenter.lng]}
                    zoom={mapZoom}
                    className="h-full w-full rounded-lg shadow-lg"
                >
                    <ChangeMapView center={[mapCenter.lat, mapCenter.lng]} zoom={mapZoom} />
                    <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
                        maxZoom={20}
                    />
                    {states.map((state, index) => (
                        <Marker
                            key={index}
                            position={[state.coordinates.lat, state.coordinates.lng]}
                            icon={defaultIcon}
                            eventHandlers={{
                                click: () => handleMarkerClick(state),
                            }}
                        >
                            <Popup>
                                <div className="font-semibold">{state.name}</div>
                                {/* <div className="text-sm mt-1">
                                    Cities: {state.cities.join(", ")}
                                </div> */}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* {showStreetView && selectedLocation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-4xl">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                {selectedLocation.name} - Street View
                            </h3>
                            <button
                                onClick={() => setShowStreetView(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="h-[500px] w-full">
                            <iframe
                                className="w-full h-full"
                                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=false&zoomwheel=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}#16/${selectedLocation.coordinates.lat}/${selectedLocation.coordinates.lng}`}
                                title="Street View"
                            />
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default CountryMap;
