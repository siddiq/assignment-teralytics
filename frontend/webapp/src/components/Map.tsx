import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

const Map: React.FC = () => {
  const position: LatLngExpression = [48.1351, 11.582] // Munich, Germany

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Default Location</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
