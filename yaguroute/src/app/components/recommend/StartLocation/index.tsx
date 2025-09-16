"use client"

import React, { useMemo, useState } from 'react'
import GameStepWrapper from '../Game/GameStepWrapper'
import { MapPin, Search, ChevronRight, X } from 'lucide-react'

const SEOUL_RESULTS = [
  { id: 'seoul-1', name: '서울역', address: '중구 한강대로 405' },
  { id: 'seoul-2', name: '서울역 1호선', address: '지하철 노선' },
  { id: 'seoul-3', name: '서울역 버스환승센터', address: '용산구 한강대로' },
  { id: 'seoul-4', name: '서울역 주차장', address: '중구 소월로' },
]

const DAEJEON_RESULTS = [
  { id: 'daejeon-1', name: '대전역', address: '동구 중앙로 215' },
  { id: 'daejeon-2', name: '대전역 KTX', address: '동구 중앙로 215' },
  { id: 'daejeon-3', name: '대전역 버스환승센터', address: '동구 대전로' },
  { id: 'daejeon-4', name: '대전역 주차장', address: '동구 중앙로' },
]

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function StartLocation({ onNext, onBack }: Props) {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    if (q.includes('서울')) return SEOUL_RESULTS
    if (q.includes('대전')) return DAEJEON_RESULTS
    // 키워드 일부만 입력해도 대응
    if (/^seoul|^서울/i.test(q)) return SEOUL_RESULTS
    if (/^dae|^대전/i.test(q)) return DAEJEON_RESULTS
    return []
  }, [query])

  const hasStartedTyping = query.trim().length > 0

  return (
    <GameStepWrapper currentStep={2} onNext={onNext} onBack={onBack} nextDisabled={selectedId === null}>
      <p className="text-sm text-neutral-600 mb-2">
        타 지역에서 오는 경우,
        <br />
        도착하는 기차역이나 버스터미널을 입력해주세요
      </p>

      {/* 검색 입력 */}
      <div className="w-full rounded-2xl bg-white border border-[#EFECE7] px-3 py-2 flex items-center gap-2 shadow-sm">
        <Search className="w-4 h-4 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedId(null)
          }}
          placeholder="ex) 서울역, 대전역"
          className="flex-1 bg-transparent outline-none placeholder:text-neutral-400 text-neutral-800"
        />
        {query && (
          <button onClick={() => { setQuery(''); setSelectedId(null) }} className="rounded-full bg-neutral-100 p-1">
            <X className="w-3 h-3 text-neutral-500" />
          </button>
        )}
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
          <ChevronRight className="w-4 h-4 text-neutral-500" />
        </span>
      </div>

      {/* 검색 결과 리스트: 입력이 시작된 이후에만 노출 */}
      {hasStartedTyping && (
        <div className="mt-4 rounded-2xl overflow-hidden border border-[#EFECE7] bg-white">
          <div className="px-4 py-3 text-sm font-semibold text-neutral-700 border-b border-[#EFECE7]">
            경기장으로 가는 길, 어디서 시작하나요?
          </div>
          <div className="max-h-[50vh] overflow-y-auto divide-y divide-[#EFECE7]">
            {results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-neutral-500">검색 결과가 없습니다.</div>
            )}
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={
                  'w-full px-4 py-4 text-left flex items-start gap-3 transition-colors ' +
                  (selectedId === p.id ? 'bg-orange-50' : 'bg-white hover:bg-neutral-50')
                }
              >
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                </span>
                <span className="flex-1">
                  <div className="font-semibold text-neutral-900">{p.name}</div>
                  <div className="text-sm text-neutral-500">{p.address}</div>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </GameStepWrapper>
  )
}
