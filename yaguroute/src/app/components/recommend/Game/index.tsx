'use client'

import React, { useState } from 'react'
import GameStepWrapper from './GameStepWrapper'
import GameStep1Empty from './GameStep1Empty'
import GameStep2Calendar from './GameStep2Calendar'
import GameStep3List from './GameStep3List'
import GameStep4Selected from './GameStep4Selected'
import { useRecommend } from '@/app/contexts/RecommendContext'

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function GameSelection({ onNext, onBack }: Props) {
  const { updateData } = useRecommend()
  const [subStep, setSubStep] = useState(1) // 1~4
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedGame, setSelectedGame] = useState<any | null>(null)

  const goNext = () => {
    if (subStep < 4) setSubStep(subStep + 1)
    else {
      // Save game info when completing step 4
      if (selectedGame && selectedDate) {
        updateData({
          gameInfo: {
            homeTeam: selectedGame.homeTeam, 
            gameTime: selectedDate.toISOString(),
          }
        })
      }
      onNext()
    }
  }

  const goBack = () => {
    if (subStep > 1) setSubStep(subStep - 1)
    else onBack()
  }

  const nextDisabled = subStep === 3 ? !selectedGame : false

  return (
    <GameStepWrapper onNext={goNext} onBack={goBack} currentStep={1} nextDisabled={nextDisabled}>
      {subStep === 1 && (
        <GameStep1Empty onSelect={() => setSubStep(2)} />
      )}
      {subStep === 2 && (
        <GameStep2Calendar
          onSelectDate={(d) => {
            setSelectedDate(d)
            setSubStep(3)
          }}
        />
      )}
      {subStep === 3 && (
        <GameStep3List
          date={selectedDate}
          onSelectGame={(g) => setSelectedGame(g)}
        />
      )}
      {subStep === 4 && (
        <GameStep4Selected
          date={selectedDate}
          game={selectedGame}
        />
      )}
    </GameStepWrapper>
  )
}
