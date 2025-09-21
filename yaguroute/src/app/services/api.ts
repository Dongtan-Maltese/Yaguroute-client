import { RouteStyle } from "@/app/contexts/RecommendContext"

export interface RouteRequest {
  gameInfo: {
    homeTeam: string
    gameTime: string
  }
  routeStyle: RouteStyle
  visitCategories: string[]
  stadiumArrivalTime: string
  departureInfo: {
    location: string
    latitude: number
    longitude: number
    departureTime: string
  }
}

export interface RouteResponse {
  routeId: string
  routeName: string
  routeSteps: Array<{
    type: 'PLACE' | 'TRANSPORT'
    order: number
    place?: {
      name: string
      photo: string
      category: string
      address: string
      latitude: number
      longitude: number
    }
    transport?: {
      distance: number
      duration: number
      transportMode: string
    }
    stayDuration?: number
  }>
  totalDuration: number
  totalDistance: number
  createdAt: string
  status: string
}

// TODO. .env 파일로 분리
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
const  API_BASE_URL = "https://144.24.68.253.nip.io:1220"

export async function createRoute(data: RouteRequest): Promise<RouteResponse> {
  const response = await fetch(`${API_BASE_URL}/yagu-routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
