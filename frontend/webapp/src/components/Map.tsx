import React from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { useData } from '../DataProvider'
import { ManageableRoute } from '../types'

interface MapProps {
  routes: ManageableRoute[]
}

const Map: React.FC<MapProps> = ({ routes }) => {
  const data = useData()
  const position: LatLngExpression = [48.1351, 11.582] // Center on Munich

  const routeCoordinates: { [key: string]: [number, number][] } = {}

  if (data) {
    const routes = Array.from(
      new Set(data.map((event) => event.route_short_name))
    )

    routes.forEach((routeName) => {
      const routeStops = data.filter(
        (event) => event.route_short_name === routeName
      )
      // .sort((a, b) => a.stop_sequence - b.stop_sequence)

      const uniqueStops = new Set<string>()
      routeCoordinates[routeName] = []

      routeStops.forEach((event) => {
        const stopId = event.stop_id
        if (!uniqueStops.has(stopId)) {
          routeCoordinates[routeName].push([event.stop_lat, event.stop_lon])
          uniqueStops.add(stopId)
        }
      })
    })
  }

  return (
    <MapContainer
      center={position}
      zoom={8}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routes.map((routeName, index) =>
        routeCoordinates[routeName.route_short_name] ? (
          <Polyline
            key={index}
            positions={routeCoordinates[routeName.route_short_name]}
            color="blue"
          />
        ) : null
      )}
    </MapContainer>
  )
}

export default Map
