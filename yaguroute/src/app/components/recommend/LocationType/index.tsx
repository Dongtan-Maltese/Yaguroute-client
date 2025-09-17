"use client"

import React, { useState } from 'react'
import GameStepWrapper from '../Game/GameStepWrapper'
import { Plus, GripVertical, X } from 'lucide-react'

const CANDIDATES = [
  { id: 'tour', label: '관광' },
  { id: 'food', label: '맛집' },
  { id: 'cafe', label: '카페' },
]

type Item = { id: string; label: string }

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function LocationType({ onNext, onBack }: Props) {
  const [items, setItems] = useState<Item[]>([
    { id: 'tour-1', label: '관광' },
    { id: 'food-1', label: '맛집' },
    { id: 'cafe-1', label: '카페' },
  ])
  const [sheetOpen, setSheetOpen] = useState(false)

  const canAdd = items.length < 5
  const nextDisabled = items.length === 0

  const handleRemove = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id))

  const handleAdd = (typeId: string) => {
    if (!canAdd) return
    const base = CANDIDATES.find((c) => c.id === typeId)
    if (!base) return
    const sameCount = items.filter((i) => i.label === base.label).length
    setItems((prev) => [...prev, { id: `${typeId}-${sameCount + 1}`, label: base.label }])
    setSheetOpen(false)
  }

  return (
    <GameStepWrapper
      currentStep={6}
      onNext={onNext}
      onBack={onBack}
      nextDisabled={nextDisabled}
      heading={'경기 전, 가고 싶은 장소를\n순서대로 추가해주세요'}
      footerHidden={sheetOpen}
    >
      <p className="text-xs text-red-500 mb-2">*최대 5개 선택 가능</p>

      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex items-center justify-between rounded-2xl border border-[#EFECE7] bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3 text-neutral-800">
              <GripVertical className="w-4 h-4 text-neutral-400" />
              {it.label}
            </div>
            <button onClick={() => handleRemove(it.id)} className="rounded-full bg-neutral-100 p-1">
              <X className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => canAdd && setSheetOpen(true)}
        disabled={!canAdd}
        className={
          'mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 border shadow-sm ' +
          (canAdd ? 'bg-white border-[#EFECE7] text-neutral-700' : 'bg-neutral-100 border-neutral-100 text-neutral-400')
        }
      >
        <Plus className="w-4 h-4" /> 장소 추가
      </button>

      {sheetOpen && (
        <div className="fixed inset-0 z-[60]">
          <button className="absolute inset-0 bg-black/30" onClick={() => setSheetOpen(false)} />
          <div className="absolute left-1/2 bottom-0 w-full max-w-md -translate-x-1/2 rounded-t-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-neutral-200" />
            <p className="mb-4 text-center font-semibold">장소 유형을 추가하세요</p>
            <div className="grid grid-cols-3 gap-3">
              {CANDIDATES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleAdd(c.id)}
                  className="rounded-2xl border border-[#EFECE7] bg-neutral-50 px-4 py-6 text-center hover:bg-neutral-100"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </GameStepWrapper>
  )
}
