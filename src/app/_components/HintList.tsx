import HintItem from './HintItem'
import { type Guess } from './GuessGame'

const hints = [
  {
    id: 1,
    unlock: 1,
    content: 'Hello, World!',
  },
  {
    id: 2,
    unlock: 2,
    content:
      'loremLorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid eveniet, facilis temporibus voluptatum debitis architecto exercitationem natus earum ratione laborum ut. Fugit unde odio, saepe eligendi inventore numquam aliquam modi?',
  },
  {
    id: 3,
    unlock: 3,
    content: 'Hello, Worlddd!',
  },
]

export default function HintList(props: { guesses: Guess[] }) {
  return (
    <ul className="flex">
      {hints.map((hint) => {
        return <HintItem key={hint.id} data={hint} guesses={props.guesses} />
      })}
    </ul>
  )
}
