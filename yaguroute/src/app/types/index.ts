export interface Game {
    id: string
    time: string
    home: string
    homeTeam: string
    awayTeam: string
    selected?: boolean
    date: string
    stadium: string
  }
  
  export interface StepProps {
    onNext: () => void
    onBack: () => void
  }
  
  export interface HeaderProps {
    onBack: () => void
    subtitle?: string
  }
  
  export interface StepIndicatorProps {
    currentStep: number
  }
  
  export type RecommendStep = 1 | 2 | 3 | 4 | 5 | 6 | 7
  
  export interface GameSelectionData {
    selectedGame?: Game
    selectedDate?: string
    selectedYear?: number
    selectedMonth?: number
  }