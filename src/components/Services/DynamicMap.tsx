import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Interface para as cidades (marcadores)
interface MarkerData {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    population: string; // Para mostrar no Popup
}

interface MapProps {
  center: [number, number]; 
  zoom?: number;
  // [ALTERADO] Aceitar uma lista de marcadores
  markers?: MarkerData[]; 
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


const DynamicMap: React.FC<MapProps> = ({ center, zoom = 2, markers = [], style }) => {
  const defaultStyle: React.CSSProperties = {
    height: '350px',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid var(--border-light)'
  };
    
  const darkTileLayerUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const attributionText = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <MapContainer 
      center={markers.length > 0 ? [markers[0].latitude, markers[0].longitude] : center} 
      zoom={zoom} 
      style={style || defaultStyle}
      scrollWheelZoom={false}
      minZoom={1}
      maxZoom={14}
    >
      <TileLayer
        attribution={attributionText}
        url={darkTileLayerUrl}
      />
      
      {markers.map(marker => (
          (marker.latitude && marker.longitude) ? ( 
              <Marker 
                  key={marker.id} 
                  position={[marker.latitude, marker.longitude]}
              >
                  <Popup>
                      <div style={{fontWeight: 'bold'}}>{marker.name}</div>
                      <div>População: {Number(marker.population).toLocaleString()}</div>
                      <div style={{fontSize: '10px', color: '#888'}}>Lat: {marker.latitude.toFixed(4)}, Long: {marker.longitude.toFixed(4)}</div>
                  </Popup>
              </Marker>
          ) : null
      ))}
      
    </MapContainer>
  );
};

export default DynamicMap;