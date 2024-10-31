export interface TripEvent {
  route_short_name: string
  route_id: string
  trip_id: string
  stop_id: string
  stop_sequence: number
  stop_lat: number
  stop_lon: number
  departure_time: string
  date: string
  boarding: number
  alighting: number
  load: number
}

export interface RouteStopCount {
  route_short_name: string
  stop_count: number
}
