'use client'

import React, { JSX, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RecommendStep } from '@/app/types'
import GameSelection from '../components/recommend/Game'
import StartLocation from '../components/recommend/StartLocation'
import TimeSelection from '../components/recommend/TimeSelection'
import ArrivalTime from '../components/recommend/ArrivalTime'
import TourStyle from '../components/recommend/TourStyle'
import LocationType from '../components/recommend/LocationType'
import Result from '../components/recommend/Result'
import { RecommendProvider } from '../contexts/RecommendContext'

const SAMPLE: any = {
  routeId: 'route_1758124338680_e9fcl5m08',
  routeName: '경기장까지 이어지는 코스',
  routeSteps: [
    {
      type: 'PLACE',
      place: { name: '대전역', photo: '', category: '출발점', address: '대전역', latitude: 36.3315, longitude: 127.4342 },
      order: 1,
      stayDuration: 5,
    },
    { type: 'TRANSPORT', transport: { distance: 2.5, duration: 15, transportMode: '지하철' }, order: 2 },
    {
      type: 'PLACE',
      place: { name: '대전ART마임페스티벌', photo: 'http://tong.visitkorea.or.kr/cms/resource/17/3349617_image2_1.jpg', category: 'TOUR', address: '', latitude: 36.3267634148, longitude: 127.4209793431 },
      order: 3,
      stayDuration: 30,
    },
    { type: 'TRANSPORT', transport: { distance: 2.5, duration: 15, transportMode: '지하철' }, order: 4 },
    {
      type: 'PLACE',
      place: { name: '신도칼국수 본점', photo: 'http://tong.visitkorea.or.kr/cms/resource/08/1914208_image2_1.jpg', category: 'MEAL', address: '', latitude: 36.3325490422, longitude: 127.4310144 },
      order: 5,
      stayDuration: 30,
    },
    { type: 'TRANSPORT', transport: { distance: 2.5, duration: 15, transportMode: '지하철' }, order: 6 },
    {
      type: 'PLACE',
      place: { name: '바이닐042', photo: 'http://tong.visitkorea.or.kr/cms/resource/97/3505397_image2_1.jpg', category: 'CAFE', address: '', latitude: 36.327519009, longitude: 127.4280231371 },
      order: 7,
      stayDuration: 30,
    },
    { type: 'TRANSPORT', transport: { distance: 2.5, duration: 15, transportMode: '지하철' }, order: 8 },
    {
      type: 'PLACE',
      place: { name: '한화생명 이글스파크', photo: '', category: '경기장', address: '대전광역시 중구 대종로373번길 21', latitude: 36.3367, longitude: 127.4344 },
      order: 9,
      stayDuration: 0,
    },
  ],
  totalDuration: 175,
  totalDistance: 10,
  createdAt: '2025-09-17T15:52:18.680Z',
  status: 'COMPLETED',
}

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
