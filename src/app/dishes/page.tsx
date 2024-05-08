import GuessGame from '@/app/_components/GuessGame'
import { db } from '@/server/db'
import { type Country, type Hint, type Game } from '@prisma/client'
import { format } from 'date-fns'

export type GameData = {
  hints: Hint[]
} & {
  correctCountry: Country
} & Game

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
      correctCountry: true,
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
