'use client'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { ko } from 'react-day-picker/locale'

type Props = {
  onSelectDate: (date: Date) => void
}

export default function GameStep2Calendar({ onSelectDate }: Props) {
  return (
    <div className="flex flex-col items-center bg-[#F4F1EC]">
      <div className="mt-2">
        <DayPicker
          mode="single"
          onSelect={(day) => day && onSelectDate(day)}
          locale={ko}
        />
      </div>
    </div>
  )
}
