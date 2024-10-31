import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext
} from 'react'
import { RouteStopCount } from './types/TripEvent'
import { extractRoutesAndStopCounts } from './utils'

// Define context and type for data
const DataContext = createContext<RouteStopCount[] | undefined>(undefined)

// Custom hook to use data in child components
export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

// Define the DataProvider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<RouteStopCount[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/tripdata')
        const rawData = await response.json()
        const processedData = extractRoutesAndStopCounts(rawData) // Process data
        setData(processedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}
