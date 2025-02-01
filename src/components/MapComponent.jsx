'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function MapComponent() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>Auction happening here!</Popup>
      </Marker>
    </MapContainer>
  );
}
