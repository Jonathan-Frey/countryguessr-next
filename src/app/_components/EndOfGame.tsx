import { useStats } from '@/lib/hooks'
import Image from 'next/image'
import { type GameData, type Guess } from '@/lib/types'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

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
      <div
        className={`my-4 flex items-center text-xl font-semibold ${props.gameState.won ? 'text-green-600' : 'text-red-600'}`}
      >
        {props.gameState.won ? (
          <FaCheckCircle className="mr-2" />
        ) : (
          <FaTimesCircle className="mr-2" />
        )}
        <h2 className="w-fit">
          {props.gameState.won
            ? `Congratulations! You guessed ${props.gameData.correctCountry.name} correctly in ${props.guesses.length} guesses!`
            : `Sorry, better luck next time! The correct country was ${props.gameData.correctCountry.name}.`}
        </h2>
      </div>
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <div className="flex w-full flex-col items-center gap-4 self-start md:w-1/2">
          <Image
            src={props.gameData.image}
            width={512}
            height={512}
            alt="The item to guess"
            className="w-full rounded-lg"
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
          <h1 className="border-b-2 border-tertiary text-lg font-semibold">
            {props.gameData.product}
          </h1>
          <p className="p-4 text-base">{props.gameData.ProductInformation}</p>
          <h4 className="border-b-2 border-tertiary text-base font-semibold">
            Hints
          </h4>
          <ul className="flex flex-col gap-4 p-4">
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
