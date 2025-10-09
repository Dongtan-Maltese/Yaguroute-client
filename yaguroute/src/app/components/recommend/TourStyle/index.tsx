"use client"

import React, { useState } from 'react'
import GameStepWrapper from '../Game/GameStepWrapper'
import { useRecommend } from '@/app/contexts/RecommendContext'

const STYLES = [
  { id: 'around', label: '주변에서 시간 보내기' },
  { id: 'near', label: '경기장 바로 근처에서 즐기기' },
  { id: 'from', label: '경기장까지 이어지는 루트' },
]

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function TourStyle({ onNext, onBack }: Props) {
  const { updateData } = useRecommend()
  const [selected, setSelected] = useState<string | null>(null)

  const handleNext = () => {
    if (selected) {
      const routeStyleMap = {
        around: 'STADIUM_NEARBY',
        near: 'DEPARTURE_NEARBY',
        from: 'DEPARTURE_TO_STADIUM',
      } as const

      updateData({
        routeStyle: routeStyleMap[selected as keyof typeof routeStyleMap],
      })
    }
    onNext()
  }

  return (
    <GameStepWrapper
      currentStep={5}
      onNext={handleNext}
      onBack={onBack}
      nextDisabled={!selected}
      heading={'어디를 중심으로\n야구루트를 제조할까요?'}
    >
      <div className="space-y-3">
        {STYLES.map((opt) => (
          <label key={opt.id} className="block">
            <input
              type="radio"
              name="tour-style"
              className="peer hidden"
              onChange={() => setSelected(opt.id)}
            />
            <div className="rounded-2xl border border-[#EFECE7] bg-white px-4 py-3 shadow-sm peer-checked:bg-orange-500 peer-checked:text-white">
              {opt.label}
            </div>
          </label>
        ))}
      </div>
    </GameStepWrapper>
  )
}
