import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { useData } from '../DataProvider'
import { ManageableRoute, TripEvent } from '../types'

interface MapProps {
  routes: ManageableRoute[]
}

const Map: React.FC<MapProps> = ({ routes }) => {
  const data = useData()
  const position: LatLngExpression = [48.1351, 11.582] // Center on Munich

  const [routeCoordinates, setRouteCoordinates] = useState<{
    [key: string]: [number, number][]
  }>({})
  const [routeColorMap, setRouteColorMap] = useState<{ [key: string]: string }>(
    {}
  )

  useEffect(() => {
    const colors = [
      'blue',
      'red',
      'green',
      'purple',
      'orange',
      'yellow',
      'cyan',
      'magenta',
      'lime',
      'teal',
      'pink',
      'brown',
      'navy',
      'olive',
      'maroon',
      'aqua',
      'gold',
      'coral',
      'indigo'
    ]

    // Initialize color map for each unique route only once
    const colorMap: { [key: string]: string } = {}
    routes.forEach((route, index) => {
      const { route_short_name: routeName } = route
      if (!colorMap[routeName]) {
        colorMap[routeName] = colors[index % colors.length] // Cycle colors if more routes than colors
      }
    })
    setRouteColorMap(colorMap)
  }, [routes])

  useEffect(() => {
    if (data) {
      const newRouteCoordinates: { [key: string]: [number, number][] } = {}

      routes.forEach((route) => {
        const { route_short_name: routeName } = route
        newRouteCoordinates[routeName] = []

        const routeEvents = data.filter(
          (event) => event.route_short_name === routeName
        )

        const tripsInRoutes: { [key: string]: number } = {}
        routeEvents.forEach((event: TripEvent) => {
          tripsInRoutes[event.trip_id] = (tripsInRoutes[event.trip_id] || 0) + 1
        })

        const maxTripId = Object.keys(tripsInRoutes).reduce((a, b) =>
          tripsInRoutes[a] > tripsInRoutes[b] ? a : b
        )

        const maxTripEvents = routeEvents.filter(
          (event) => event.trip_id === maxTripId
        )

        maxTripEvents.forEach((event) => {
          newRouteCoordinates[routeName].push([event.stop_lat, event.stop_lon])
        })
      })

      setRouteCoordinates(newRouteCoordinates)
    }
  }, [data, routes])

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
      {routes.map((route, index) => {
        const { route_short_name: routeName } = route
        console.log(routeName, routeColorMap[routeName] || 'black')

        return routeCoordinates[routeName] ? (
          <Polyline
            key={index}
            positions={routeCoordinates[routeName]}
            color={routeColorMap[routeName] || 'black'}
          />
        ) : null
      })}
    </MapContainer>
  )
}

export default Map
