import React from 'react'
import './App.css'
import { DataProvider } from './DataProvider'
import Map from './components/Map'

function AppContent() {
  return (
    <div className="App">
      <aside className="App-sidebar">
        <h1>Teralytics</h1>
      </aside>
      <main className="App-content">
        <Map />
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
