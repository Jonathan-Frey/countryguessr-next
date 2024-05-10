import { db } from '@/server/db'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import CreateGameForm from '@/app/_components/CreateGameForm'
import DeleteGameButton from '@/app/_components/DeleteGameButton'

export default async function Page() {
  const session = await getServerAuthSession()
  if (!session || session.user.role !== 'admin') {
    redirect('/api/auth/signin')
  }
  const countries = await db.country.findMany({
    select: {
      name: true,
      id: true,
    },
  })

  const games = await db.game.findMany({
    include: {
      hints: true,
      correctCountry: true,
    },
  })
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-1/2">
        <CreateGameForm countries={countries}></CreateGameForm>
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        <h2 className="text-xl font-bold">Created Games</h2>
        {games.map((game) => (
          <div
            key={game.id}
            className="rounded-sm border-2 border-tertiary p-2"
          >
            <div className="flex gap-2">
              <Image
                src={game.image}
                height={128}
                width={128}
                alt="game image"
              />
              <div className="flex flex-col">
                <span>date: {game.date}</span>
                <span>correct country: {game.correctCountry.name}</span>
                <span>category: {game.category}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Information</h3>
              <p>{game.ProductInformation}</p>
              {game.hints.map((hint, index) => (
                <div key={hint.id} className="flex flex-col font-semibold">
                  <h3>Hint {index + 1}</h3>
                  <span>unlocks in {hint.unlock} guesses</span>
                  <h4>content:</h4>
                  <p>{hint.content}</p>
                </div>
              ))}
            </div>
            <DeleteGameButton gameId={game.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
