import GuessGame from '@/app/_components/GuessGame'
import NotFound from '@/app/not-found'
import { db } from '@/server/db'
import { format, compareAsc } from 'date-fns'

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

export default async function Page(props: { params: { date: string } }) {
  const now = format(new Date(Date.now()), 'yyyy-MM-dd')
  let hasPassed = false
  switch (compareAsc(now, props.params.date)) {
    case 1:
      hasPassed = true
      break
    default:
      break
  }
  if (!hasPassed) {
    return <NotFound />
  }
  const gameData = await db.game.findFirst({
    where: {
      date: {
        equals: format(props.params.date, 'yyyy-MM-dd'),
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
