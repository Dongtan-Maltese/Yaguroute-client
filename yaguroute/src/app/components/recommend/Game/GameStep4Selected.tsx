export default function GameStep4Selected({
  date,
  game,
}: {
  date: Date | null
  game: any
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-orange-500 text-white px-4 py-4">
        <div className="text-sm opacity-90">선택한 경기</div>
        <p className="mt-1 text-lg font-bold">{game?.time} · {game?.home} vs {game?.away}</p>
        <p className="text-sm opacity-90">{game?.stadium}</p>
      </div>
    </div>
  )
}
