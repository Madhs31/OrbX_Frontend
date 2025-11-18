import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  center: [number, number]; 
  zoom?: number;
  markerText?: string;
  style?: React.CSSProperties;
}

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34] 
});
L.Marker.prototype.options.icon = DefaultIcon;


const DynamicMap: React.FC<MapProps> = ({ center, zoom = 10, markerText, style }) => {
  const defaultStyle: React.CSSProperties = {
    height: '350px',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid var(--border-light)'
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={style || defaultStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        {markerText && (
          <Popup>
            {markerText}
          </Popup>
        )}
      </Marker>
    </MapContainer>
  );
};

export default DynamicMap;