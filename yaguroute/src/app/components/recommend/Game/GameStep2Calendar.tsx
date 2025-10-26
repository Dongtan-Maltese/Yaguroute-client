'use client'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { ko } from 'react-day-picker/locale'

type Props = {
  onSelectDate: (date: Date) => void
}

export default function GameStep2Calendar({ onSelectDate }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 오늘 날짜 기준

  return (
    <div className="flex flex-col items-center bg-[#F4F1EC]">
      <div className="mt-2">
        <DayPicker
          lang='ko'
          mode="single"
          onSelect={(day) => day && onSelectDate(day)}
          locale={ko}
          disabled={{ before: today }} // 오늘 이전 날짜 선택 불가
        />
      </div>
    </div>
  )
}