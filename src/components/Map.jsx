"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useRouter } from "next/navigation";

const Map = ({ coordinates }) => {
  const router = useRouter(); // Initialize the router
  const center = [20, 0]; // Default center of the map
  const zoom = 2; // Default zoom level

  const handleMarkerClick = (country) => {
    const href = `/Country/${country.toLowerCase().replace(/\s+/g, "-")}`;
    router.push(href); // Redirect to the desired route
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "400px" }}
    >
      {/* OpenStreetMap tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Add markers for each country */}
      {Object.entries(coordinates).map(([country, coord], index) => (
        <Marker
          key={index}
          position={[coord.lat, coord.lng]}
          eventHandlers={{
            click: () => handleMarkerClick(country),
          }}
        >
          <Popup>
            <button
              onClick={() => handleMarkerClick(country)}
              className="text-blue-500 underline"
            >
              {country}
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
