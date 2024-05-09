import HintItem from './HintItem'
import { type Guess, type Hint } from '@/lib/types'

export default function HintList(props: { guesses: Guess[]; hints: Hint[] }) {
  return (
    <ul className="flex">
      {props.hints.map((hint) => {
        return <HintItem key={hint.id} data={hint} guesses={props.guesses} />
      })}
    </ul>
  )
}
