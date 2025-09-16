'use client'

import React, { JSX } from 'react'
import { StepIndicatorProps } from '@/app/types'

export default function StepIndicator({ currentStep }: StepIndicatorProps): JSX.Element {
  const clamped = Math.min(Math.max(currentStep, 1), 7)

  return (
    <div className="w-full bg-[#F4F1EC]">
      <div className="mx-auto max-w-md p-4">
        <div className="flex items-center gap-4">
          {[...Array(7)].map((_, idx) => {
            const stepIndex = idx + 1
            const isActive = stepIndex === clamped
            return (
              <div
                key={stepIndex}
                className={
                  'h-1 rounded-full flex-1 ' +
                  (isActive ? 'bg-neutral-900' : 'bg-[#DDD7CE]')
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}