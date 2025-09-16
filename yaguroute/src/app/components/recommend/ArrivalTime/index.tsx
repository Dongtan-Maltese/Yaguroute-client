"use client"

import React, { useState } from 'react'
import GameStepWrapper from '../Game/GameStepWrapper'

const OPTIONS = [
  { id: 'h1', label: '1시간 전에 도착' },
  { id: 'h2', label: '2시간 전에 도착' },
  { id: 'h3', label: '3시간 전에 도착' },
]

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function ArrivalTime({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <GameStepWrapper
      currentStep={4}
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!selected}
      heading={'경기 시작 몇 시간 전에\n경기장에 도착하시겠어요?'}
    >
      <div className="space-y-3">
        {OPTIONS.map((opt) => (
          <label key={opt.id} className="block">
            <input
              type="radio"
              name="arrive"
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
