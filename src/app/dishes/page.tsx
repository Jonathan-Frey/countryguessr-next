import GuessGame from '@/app/_components/GuessGame'
import { getGame } from '@/app/_actions/guesses'
import { db } from '@/server/db'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export type GameData = {
  hints: {
    id: number
    unlock: number
    content: string
    gameId: number | null
  }[]
} & {
  id: number
  date: string
  image: string
  category: string
  countryId: number
}

export type Hint = {
  id: number
  unlock: number
  content: string
  gameId: number | null
}

export default async function Page() {
  const gameData = await getGame('dish')
  const countryDataWithNames = await db.country.findMany({
    select: {
      name: true,
    },
  })
  const countryNames = countryDataWithNames.map(
    (countryData) => countryData.name,
  )
  return gameData ? (
    <>
      <GuessGame gameData={gameData} countryNames={countryNames} />
    </>
  ) : (
    <h1>No Game Data Found</h1>
  )
}
