import React, { useEffect, useState } from 'react'
import { ManageableRoute, TripEvent } from './types'
import { DataProvider, useData } from './DataProvider'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import './App.css'

const AppContent: React.FC = () => {
  const data = useData()
  const [routes, setRoutes] = useState<ManageableRoute[]>([])
  const [allVisible, setAllVisible] = useState(true) // Default to true

  const uniqueRouteNames = (data: TripEvent[]): string[] => {
    const routeNames = data.map((event) => event.route_short_name)
    return Array.from(new Set(routeNames))
  }

  useEffect(() => {
    if (data) {
      const initializedRoutes = uniqueRouteNames(data).map((routeName) => ({
        route_short_name: routeName,
        stop_count: 0,
        visible: true // Default visibility set to true
      }))
      setRoutes(initializedRoutes)
    }
  }, [data])

  const toggleRouteVisibility = (routeName: string) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.route_short_name === routeName
          ? { ...route, visible: !route.visible }
          : route
      )
    )
  }

  const toggleAllRoutes = () => {
    const newVisibility = !allVisible
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) => ({ ...route, visible: newVisibility }))
    )
    setAllVisible(newVisibility)
  }

  return (
    <div className="App">
      <aside className="App-sidebar">
        <h1>Teralytics</h1>
        <Sidebar
          routes={routes.map((route) => ({
            route_short_name: route.route_short_name,
            stop_count: route.stop_count,
            visible: route.visible
          }))}
          toggleRouteVisibility={toggleRouteVisibility}
          toggleAllRoutes={toggleAllRoutes}
          allVisible={allVisible}
        />
      </aside>
      <main className="App-content">
        <Map routes={routes.filter((route) => route.visible)} />
      </main>
    </div>
  )
}

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  )
}

export default App
