import { CalendarIcon, ChevronRight } from 'lucide-react'

export default function GameStep1Empty({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="pb-10">
      <button
        onClick={onSelect}
        className="mt-2 w-full rounded-2xl bg-white shadow-sm border border-[#EFECE7] px-4 py-3 flex items-center justify-between"
      >
        <span className="inline-flex items-center gap-2 text-neutral-500">
          <CalendarIcon className="w-5 h-5 text-neutral-400" />
          경기 일정을 선택해세요
        </span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
          <ChevronRight className="w-4 h-4 text-neutral-500" />
        </span>
      </button>
    </div>
  )
}
