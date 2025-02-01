import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';

// Create custom icon
const customIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Function to get state coordinates from state name
const fetchStateCoordinates = async (stateName, countryName) => {
  try {
    // Add a delay to respect API rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        stateName
      )}+${encodeURIComponent(countryName)}&format=json&addressdetails=1`
    );
    
    if (!response.ok) throw new Error('Failed to fetch coordinates');
    
    const data = await response.json();
    if (data && data[0]) {
      return {
        name: stateName,
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching coordinates for ${stateName}:`, error);
    return null;
  }
};

const StateMap = ({ states, country, countryCoordinates }) => {
  const [stateMarkers, setStateMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStateMarkers = async () => {
      setIsLoading(true);
      const markers = [];
      
      // Process states in batches to avoid overwhelming the API
      for (let i = 0; i < states.length; i++) {
        const coords = await fetchStateCoordinates(
          states[i],
          country.replace(/-auction/g, '').replace(/-/g, ' ')
        );
        if (coords) {
          markers.push(coords);
        }
      }
      
      setStateMarkers(markers);
      setIsLoading(false);
    };

    if (states.length > 0) {
      getStateMarkers();
    }
  }, [states, country]);

  if (isLoading) {
    return <div>Loading map markers...</div>;
  }

  return (
    <div className="h-[400px] w-full relative">
      <MapContainer
        center={[countryCoordinates.lat, countryCoordinates.lng]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Country marker */}
        <Marker
          position={[countryCoordinates.lat, countryCoordinates.lng]}
          icon={customIcon}
        >
          <Popup>
            {country.replace(/-auction/i, '').replace(/-/g, ' ')}
          </Popup>
        </Marker>

        {/* State markers */}
        {stateMarkers.map((state, index) => (
          <Marker
            key={index}
            position={[state.lat, state.lng]}
            icon={customIcon}
          >
            <Popup>
              <Link 
                href={`/${country}/${state.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {state.name}
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default StateMap;