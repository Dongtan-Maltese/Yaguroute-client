import { TEAM_CODE_MAP } from '@/app/constants/teams'

const dummyGames = [
  { id: 1, time: '18:30', home: '삼성', away: 'LG', stadium: '잠실 야구장' },
  { id: 2, time: '18:30', home: '한화', away: 'SSG', stadium: '한화생명 이글스파크' },
  { id: 3, time: '10:00', home: '키움', away: '롯데', stadium: '사직 야구장' },
]

export default function GameStep3List({
  date,
  onSelectGame,
}: {
  date: Date | null
  onSelectGame: (game: any) => void
}) {
  return (
    <div className="flex flex-col min-h-[70vh]">
      {/* 날짜 선택 필드 */}
      <button className="mb-4 w-full rounded-2xl bg-white border border-[#EFECE7] px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="text-neutral-600">🗓️ {date?.toLocaleDateString() ?? '날짜 선택'}</span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">›</span>
      </button>

      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3">
        {dummyGames.map((g) => (
          <label key={g.id} className="block">
            <input
              type="radio"
              name="game"
              className="peer hidden"
              onChange={() =>
                onSelectGame({
                  ...g,
                  homeTeam: TEAM_CODE_MAP[g.home], 
                })
              }
            />
            <div className="rounded-2xl border border-[#EFECE7] bg-white px-4 py-3 shadow-sm peer-checked:bg-orange-500 peer-checked:text-white">
              <div className="flex items-center gap-3">
                <span className="inline-flex min-w-14 justify-center rounded-full px-3 py-1 text-sm font-semibold bg-neutral-100 text-neutral-700 peer-checked:bg-white/20 peer-checked:text-white">
                  {g.time}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-semibold peer-checked:bg-white/20 peer-checked:text-white">{g.home}</span>
                    <span className="rounded-full bg-rose-100 text-rose-700 px-2 py-0.5 text-xs font-semibold peer-checked:bg-white/20 peer-checked:text-white">{g.away}</span>
                  </div>
                  <div className="text-sm text-neutral-600 mt-1 peer-checked:text-white/90">{g.stadium}</div>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
