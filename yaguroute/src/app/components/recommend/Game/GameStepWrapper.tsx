import React, { ReactNode } from 'react'
import StepIndicator from '../StepIndicator'
import { ChevronLeft } from 'lucide-react'

type Props = {
  children: ReactNode
  onNext: () => void
  onBack: () => void
  currentStep: number
  nextDisabled?: boolean
  heading?: string
}

export default function GameStepWrapper({ children, onNext, onBack, currentStep, nextDisabled, heading }: Props) {
  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <div className="mx-auto max-w-md min-h-screen">
        
        <div className="p-4">
          <button
            onClick={onBack}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E8E4DC] text-neutral-600"
            aria-label="뒤로"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
        
        <StepIndicator currentStep={currentStep} />

        <div className="px-4 mt-4">
          <h1 className="text-2xl font-extrabold leading-snug text-neutral-900 whitespace-pre-line">
            {heading ?? (
              <>
                언제,
                <br />
                어떤 경기를 직관하실건가요?
              </>
            )}
          </h1>
        </div>

        <div className="px-4 mt-4 pb-40">
          {children}
        </div>

        {/* Fixed footer CTA constrained to content width */}
        <div className="fixed left-1/2 bottom-0 z-50 w-full max-w-md -translate-x-1/2 bg-[#F4F1EC] px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0)+12px)] shadow-[0_-6px_12px_rgba(0,0,0,0.04)]">
          <button
            onClick={onNext}
            disabled={Boolean(nextDisabled)}
            className={
              'w-full rounded-2xl py-4 font-semibold transition-colors ' +
              (nextDisabled
                ? 'bg-neutral-200 text-neutral-500'
                : 'bg-orange-500 text-white')
            }
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  )
}
