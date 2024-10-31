// src/Map.tsx
import React from 'react'
import { useData } from '../DataProvider'

const Map: React.FC = () => {
  const data = useData() // Access data from context

  return (
    <div
      style={{
        width: '600px',
        height: '400px',
        backgroundColor: '#e0e0e0',
        margin: '20px auto'
      }}
    >
      <h3>Map Placeholder</h3>
      <p>Data from Context:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Map
