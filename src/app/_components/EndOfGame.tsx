import { useStats } from '@/lib/hooks'
import Image from 'next/image'
import { type GameData, type Guess } from '@/lib/types'

export default function EndOfGame(props: {
  gameState: {
    gameOver: boolean
    won: boolean
  }
  gameData: GameData
  guesses: Guess[]
}) {
  const [stats, totalGames] = useStats()
  return (
    <div className="flex flex-col">
      <h2 className="my-4 w-fit self-center text-xl font-semibold">
        {props.gameState.won
          ? `Congratulations, you guessed ${props.gameData.correctCountry.name} correctly in ${props.guesses.length} guesses!`
          : `Sorry, better luck next time! The correct country was ${props.gameData.correctCountry.name}`}
      </h2>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 self-start md:w-1/2">
          <Image
            src={props.gameData.image}
            width={512}
            height={512}
            alt="a food dish"
            className="w-full rounded-xl"
          ></Image>
          <div className="flex w-full flex-col rounded-lg border-2 border-tertiary p-6 text-base">
            <h2 className="mb-4 self-center text-lg font-bold">Stats</h2>
            <ul>
              {stats.map((stat, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <span className="mr-2 w-4 text-right">
                    {index === 6 ? 'X' : index + 1}
                  </span>
                  <div className="flex h-4 flex-grow rounded-full bg-gray-200">
                    <div
                      className={`relative flex h-full items-center rounded-full ${index === 6 ? 'bg-red-400' : 'bg-blue-400'}`}
                      style={{ width: `${(stat / totalGames) * 100}%` }}
                    >
                      <p className="absolute left-full ml-2 text-xs">{stat}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-lg font-semibold">{props.gameData.product}</h1>
          <p className="py-4 text-base">{props.gameData.ProductInformation}</p>
          <h4 className="text-base font-semibold">Hints</h4>
          <ul className="flex flex-col gap-4">
            {props.gameData.hints.map((hint) => (
              <li key={hint.content}>
                <p className="text-base">{hint.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
