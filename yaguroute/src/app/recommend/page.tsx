'use client'

import React, { JSX, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RecommendStep } from '@/app/types'
import GameSelection from '@/app/components/recommend/Game'
import StartLocation from '@/app/components/recommend/StartLocation'
import TimeSelection from '@/app/components/recommend/TimeSelection'
import ArrivalTime from '@/app/components/recommend/ArrivalTime'
import TourStyle from '@/app/components/recommend/TourStyle'
import LocationType from '@/app/components/recommend/LocationType'
import Result from '@/app/components/recommend/Result'
import { RecommendProvider } from '@/app/contexts/RecommendContext'

export default function RecommendPage(): JSX.Element {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<RecommendStep>(1)
  
  const handleNext = (): void => {
    if (currentStep < 7) {
      setCurrentStep((prev) => (prev + 1) as RecommendStep)
    } else {
      alert('야구루트 제조 완료!')
    }
  }
  
  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as RecommendStep)
    } else {
      router.push('/')
    }
  }
  
  const renderStep = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return <GameSelection onNext={() => setCurrentStep(2)} onBack={handleBack} />
      case 2:
        return <StartLocation onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />
      case 3:
        return <TimeSelection onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />
      case 4:
        return <ArrivalTime onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />
      case 5:
        return <TourStyle onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)} />
      case 6:
        return <LocationType onNext={() => setCurrentStep(7)} onBack={() => setCurrentStep(5)} />
      case 7:
        return <Result onNext={() => {}} onBack={() => setCurrentStep(6)} />
      default:
        return <GameSelection onNext={() => setCurrentStep(2)} onBack={handleBack} />
    }
  }
  
  return (
    <RecommendProvider>
      <div className="bg-[#F4F1EC]">
        {renderStep()}
      </div>
    </RecommendProvider>
  )
}
