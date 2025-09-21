"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface GameInfo {
  homeTeam: string
  gameTime: string
}

export interface DepartureInfo {
  location: string
  latitude: number
  longitude: number
  departureTime: string
}

export interface RecommendData {
  gameInfo?: GameInfo
  routeStyle?: 'DEPARTURE_TO_STADIUM' | 'AROUND_STADIUM' | 'STADIUM_TO_DEPARTURE'
  visitCategories?: string[]
  stadiumArrivalTime?: string
  departureInfo?: DepartureInfo
}

interface RecommendContextType {
  data: RecommendData
  updateData: (updates: Partial<RecommendData>) => void
  resetData: () => void
}

const RecommendContext = createContext<RecommendContextType | undefined>(undefined)

export function RecommendProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<RecommendData>({})

  const updateData = (updates: Partial<RecommendData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const resetData = () => {
    setData({})
  }

  return (
    <RecommendContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </RecommendContext.Provider>
  )
}

export function useRecommend() {
  const context = useContext(RecommendContext)
  if (context === undefined) {
    throw new Error('useRecommend must be used within a RecommendProvider')
  }
  return context
}
