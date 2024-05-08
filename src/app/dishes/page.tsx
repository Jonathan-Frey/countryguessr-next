import GuessGame from '@/app/_components/GuessGame'
import { db } from '@/server/db'
import { format } from 'date-fns'

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

export const dynamic = 'force-dynamic'

export default async function Page() {
  const gameData = await db.game.findFirst({
    where: {
      date: {
        equals: format(new Date(Date.now()), 'yyyy-MM-dd'),
      },
      category: {
        equals: 'Dish',
      },
    },
    include: {
      hints: true, // Include related hints
    },
  })
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
