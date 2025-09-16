'use client'

import React, { JSX, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RecommendStep } from '@/app/types'
import GameSelection from '../components/recommend/Game'
import StartLocation from '../components/recommend/StartLocation'

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
        return <div>시간 선택 단계 (구현 예정)</div>
      case 4:
        return <div>경기장 도착 시간 선택 단계 (구현 예정)</div>
      case 5:
        return <div>스타일 선택 단계 (구현 예정)</div>
      case 6:
        return <div>장소 유형 선택 단계 (구현 예정)</div>
      case 7:
        return <div>결과 화면 (구현 예정)</div>
      default:
        return <GameSelection onNext={() => setCurrentStep(2)} onBack={handleBack} />
    }
  }
  
  return (
    <div className="bg-[#F4F1EC]">
      {renderStep()}
    </div>
  )
}
