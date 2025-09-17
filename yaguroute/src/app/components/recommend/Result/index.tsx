"use client"

import React, { useMemo, useState } from 'react'
import GameStepWrapper from '../Game/GameStepWrapper'
import { MapPin, Flag, Clock, Route as RouteIcon, Image as ImageIcon, Map as MapIcon, List as ListIcon } from 'lucide-react'
import RouteMap, { MapPoint } from './RouteMap'

type PlaceStep = {
  type: 'PLACE'
  order: number
  stayDuration: number
  place: {
    name: string
    photo: string
    category: string
    address: string
    latitude: number
    longitude: number
  }
}

type TransportStep = {
  type: 'TRANSPORT'
  order: number
  transport: {
    distance: number
    duration: number
    transportMode: string
  }
}

type RouteData = {
  routeId: string
  routeName: string
  routeSteps: Array<PlaceStep | TransportStep>
  totalDuration: number
  totalDistance: number
  createdAt: string
  status: string
}

type Props = {
  onNext: () => void
  onBack: () => void
  data: RouteData
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-900 text-white text-xs font-bold">
      {n}
    </span>
  )
}

export default function Result({ onNext, onBack, data }: Props) {
  const heading = `${data.routeName}`
  const [mode, setMode] = useState<'list' | 'map'>('list')

  const points: MapPoint[] = useMemo(
    () =>
      data.routeSteps
        .filter((s): s is PlaceStep => s.type === 'PLACE')
        .map((s) => ({ lat: s.place.latitude, lng: s.place.longitude, title: s.place.name })),
    [data.routeSteps]
  )

  const getAddress = (s: PlaceStep) => {
    if (s.place.address && s.place.address.trim().length > 0) return s.place.address
    // 임의 도로명 주소 fallback
    return `${s.place.name} 인근`
  }

  return (
    <GameStepWrapper currentStep={7} onNext={onNext} onBack={onBack} nextDisabled heading={heading} footerHidden>
      {/* Top banner */}
      <div className="mb-3">
        <div className="inline-flex items-center gap-2 rounded-r-2xl bg-orange-500 px-3 py-2 text-white shadow">
          <span className="text-xs bg-white/20 rounded px-1.5 py-0.5">{new Date(data.createdAt).toLocaleDateString()}</span>
          <span className="text-sm font-semibold">한화생명 이글스파크 근처 3시간 코스</span>
          <span className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/20">✔</span>
        </div>
      </div>

      {/* Meta + view toggle */}
      <div className="mb-4 flex items-center justify-between text-sm text-neutral-600">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1"><RouteIcon className="w-4 h-4" /> {data.totalDistance}km</span>
          <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {data.totalDuration}분</span>
        </div>
        <button
          onClick={() => setMode(mode === 'list' ? 'map' : 'list')}
          className="inline-flex items-center gap-1 rounded-full bg-neutral-900 text-white px-3 py-1.5 text-xs"
        >
          {mode === 'list' ? (<><MapIcon className="w-4 h-4" /> 지도보기</>) : (<><ListIcon className="w-4 h-4" /> 목록보기</>)}
        </button>
      </div>

      {mode === 'map' ? (
        <RouteMap points={points} />
      ) : (
        <div className="space-y-3">
          {data.routeSteps.map((s) => {
            if (s.type === 'PLACE') {
              return (
                <div key={`p-${s.order}`} className="flex items-start gap-3 rounded-2xl border border-[#EFECE7] bg-white px-4 py-3 shadow-sm">
                  <div className="mt-0.5">
                    <StepBadge n={s.order} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-neutral-900 font-semibold">
                      {s.order === 1 ? <Flag className="w-4 h-4 text-orange-500" /> : <MapPin className="w-4 h-4 text-neutral-400" />}
                      <span>{s.place.name}</span>
                      <span className="text-xs text-neutral-400">{s.place.category}</span>
                    </div>
                    <div className="mt-1 text-sm text-neutral-500">
                      {getAddress(s)}
                    </div>
                    {s.stayDuration ? (
                      <div className="mt-1 text-xs text-neutral-500">머무는 시간 {s.stayDuration}분</div>
                    ) : null}
                  </div>
                  <div className="overflow-hidden rounded-xl bg-neutral-100 w-14 h-14 flex items-center justify-center">
                    {s.place.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.place.photo} alt={s.place.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                </div>
              )
            }
            return (
              <div key={`t-${s.order}`} className="flex items-center gap-3 rounded-2xl border border-dashed border-[#EFECE7] bg-white/60 px-4 py-3">
                <div className="mt-0.5">
                  <StepBadge n={s.order} />
                </div>
                <div className="flex-1 text-sm text-neutral-700">
                  {s.transport.transportMode} · 약 {s.transport.distance}km · {s.transport.duration}분
                </div>
              </div>
            )
          })}
        </div>
      )}
    </GameStepWrapper>
  )
}
