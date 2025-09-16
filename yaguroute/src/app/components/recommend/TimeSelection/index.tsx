"use client"

import React, { useMemo, useState } from 'react'
import GameStepWrapper from '../Game/GameStepWrapper'
import { Clock, ChevronRight } from 'lucide-react'

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function TimeSelection({ onNext, onBack }: Props) {
  const [hour, setHour] = useState<number | null>(null)
  const [minute, setMinute] = useState<number | null>(null)
  const [ampm, setAmpm] = useState<'오전' | '오후' | null>(null)

  const nextDisabled = hour === null || minute === null || ampm === null

  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), [])
  const minutes = useMemo(() => Array.from({ length: 12 }, (_, i) => i * 5), []) // 0,5,...55

  return (
    <GameStepWrapper
      currentStep={3}
      onNext={onNext}
      onBack={onBack}
      nextDisabled={nextDisabled}
      heading={'대전역에\n몇시에 도착하나요?'}
    >
      {/* 입력형 버튼 */}
      <div className="w-full rounded-2xl bg-white border border-[#EFECE7] px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="inline-flex items-center gap-2 text-neutral-600">
          <Clock className="w-5 h-5 text-neutral-400" />
          {nextDisabled ? '도착 시간을 선택하세요' : `${ampm} ${hour}:${String(minute).padStart(2, '0')}`}
        </span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
          <ChevronRight className="w-4 h-4 text-neutral-500" />
        </span>
      </div>

      {/* Wheel-like picker */}
      <div className="mt-6 rounded-2xl bg-white border border-[#EFECE7] p-4">
        <div className="grid grid-cols-3 gap-4">
          {/* AM/PM */}
          <div className="flex flex-col items-center">
            <div className="text-sm text-neutral-500 mb-2">오전/오후</div>
            <div className="inline-grid grid-cols-2 gap-2">
              {(['오전', '오후'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setAmpm(v)}
                  className={'rounded-lg px-3 py-2 min-w-14 ' + (ampm === v ? 'bg-orange-500 text-white' : 'bg-neutral-100 text-neutral-700')}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Hours scroll */}
          <div className="text-center">
            <div className="text-sm text-neutral-500 mb-2">시간</div>
            <div className="relative h-40 overflow-y-auto snap-y snap-mandatory rounded-lg bg-neutral-50">
              {hours.map((h) => (
                <button
                  key={h}
                  onClick={() => setHour(h)}
                  className={
                    'block w-full py-2 snap-center transition-colors ' +
                    (hour === h ? 'bg-orange-500 text-white font-semibold' : 'text-neutral-700 hover:bg-neutral-100')
                  }
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Minutes scroll */}
          <div className="text-center">
            <div className="text-sm text-neutral-500 mb-2">분</div>
            <div className="relative h-40 overflow-y-auto snap-y snap-mandatory rounded-lg bg-neutral-50">
              {minutes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMinute(m)}
                  className={
                    'block w-full py-2 snap-center transition-colors ' +
                    (minute === m ? 'bg-orange-500 text-white font-semibold' : 'text-neutral-700 hover:bg-neutral-100')
                  }
                >
                  {String(m).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GameStepWrapper>
  )
}
