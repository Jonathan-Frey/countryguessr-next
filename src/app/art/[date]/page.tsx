import GuessGame from '@/app/_components/GuessGame'
import NoGameDataFound from '@/app/_components/NoGameDataFound'
import NotFound from '@/app/not-found'
import { db } from '@/server/db'
import { format, compareAsc } from 'date-fns'

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
        equals: 'art',
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
    <NoGameDataFound />
  )
}
