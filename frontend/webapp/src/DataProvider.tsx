import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext
} from 'react'
import { TripEvent } from './types'

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000/api/v1/tripdata'

const DataContext = createContext<TripEvent[] | null>(null)

export const useData = () => {
  const context = useContext(DataContext)
  if (context === null) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<TripEvent[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT)
        const rawData = await response.json()
        setData(rawData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <DataContext.Provider value={data}>
      {data ? children : <div>Loading...</div>}
    </DataContext.Provider>
  )
}
