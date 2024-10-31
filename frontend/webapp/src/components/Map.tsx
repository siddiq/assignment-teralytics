import React, { useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip
} from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { useData } from '../DataProvider'
import { ManageableRoute, TripEvent } from '../types'

interface MapProps {
  routes: ManageableRoute[]
}

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

const Map: React.FC<MapProps> = ({ routes }) => {
  const data = useData()
  const position: LatLngExpression = [48.1351, 11.582] // Center on Munich

  const [routeCoordinates, setRouteCoordinates] = useState<{
    [key: string]: [number, number][]
  }>({})
  const [routeColorMap, setRouteColorMap] = useState<{ [key: string]: string }>(
    {}
  )
  const [dotPosition, setDotPosition] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const colorMap: { [key: string]: string } = {}
    routes.forEach((route, index) => {
      const { route_short_name: routeName } = route
      if (!colorMap[routeName]) {
        colorMap[routeName] = colors[index % colors.length]
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

      // Initialize dot positions at the first stop of each route
      const initialDotPositions: { [key: string]: number } = {}
      Object.keys(newRouteCoordinates).forEach((route) => {
        initialDotPositions[route] = 0
      })
      setDotPosition(initialDotPositions)
    }
  }, [data, routes])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotPosition((prevPositions) => {
        const newPositions = { ...prevPositions }

        Object.keys(newPositions).forEach((route) => {
          const routeCoords = routeCoordinates[route]
          if (routeCoords) {
            newPositions[route] =
              (prevPositions[route] + 1) % routeCoords.length
          }
        })

        return newPositions
      })
    }, 2000)

    return () => clearInterval(intervalId)
  }, [routeCoordinates])

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
        const routeColor = routeColorMap[routeName] || 'black'
        const routeCoords = routeCoordinates[routeName]

        return (
          <React.Fragment key={index}>
            {routeCoords && (
              <Polyline positions={routeCoords} color={routeColor} />
            )}
            {routeCoords && routeCoords[dotPosition[routeName]] && (
              <CircleMarker
                center={routeCoords[dotPosition[routeName]]}
                radius={6}
                color={routeColor}
                fillColor={routeColor}
                fillOpacity={1}
              >
                <Tooltip>
                  {`Load: ${
                    data.find(
                      (event) =>
                        event.route_short_name === routeName &&
                        event.stop_lat ===
                          routeCoords[dotPosition[routeName]][0] &&
                        event.stop_lon ===
                          routeCoords[dotPosition[routeName]][1]
                    )?.load || 0
                  }`}
                </Tooltip>
              </CircleMarker>
            )}
          </React.Fragment>
        )
      })}
    </MapContainer>
  )
}

export default Map
