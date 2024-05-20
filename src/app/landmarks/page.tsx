import GuessGame from '@/app/_components/GuessGame'
import { db } from '@/server/db'
import { format } from 'date-fns'
import NoGameDataFound from '@/app/_components/NoGameDataFound'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const gameData = await db.game.findFirst({
    where: {
      date: {
        equals: format(new Date(Date.now()), 'yyyy-MM-dd'),
      },
      category: {
        equals: 'landmark',
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
