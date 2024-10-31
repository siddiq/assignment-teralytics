import { RouteStopCount, TripEvent } from '../types/TripEvent'

// Function to extract routes and their stop counts
const extractRoutesAndStopCounts = (data: TripEvent[]): RouteStopCount[] => {
  const routeStopCounts: Record<string, Set<string>> = {}

  data.forEach((entry) => {
    const route = entry.route_short_name

    // Initialize route if it doesn't exist in the dictionary
    if (!routeStopCounts[route]) {
      routeStopCounts[route] = new Set<string>()
    }

    // Add the stop_id to the set for unique stops per route
    routeStopCounts[route].add(entry.stop_id)
  })

  // Convert the result into an array with route names and stop counts
  const result: RouteStopCount[] = Object.keys(routeStopCounts).map(
    (route) => ({
      route_short_name: route,
      stop_count: routeStopCounts[route].size
    })
  )

  return result
}

export { extractRoutesAndStopCounts }
