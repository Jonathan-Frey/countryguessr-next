import HintItem from './HintItem'
import { type Guess } from './GuessGame'
import { type Hint } from '../dishes/page'

export default function HintList(props: { guesses: Guess[]; hints: Hint[] }) {
  return (
    <ul className="flex">
      {props.hints.map((hint) => {
        return <HintItem key={hint.id} data={hint} guesses={props.guesses} />
      })}
    </ul>
  )
}
