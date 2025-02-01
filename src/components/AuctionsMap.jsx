'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import the map component
const DynamicMap = dynamic(() => import('./MapComponent'), { ssr: false });

export default function AuctionsMap() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <DynamicMap />
    </div>
  );
}
