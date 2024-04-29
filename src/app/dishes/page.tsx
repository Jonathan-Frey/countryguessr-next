import Image from 'next/image'
import GuessGame from '@/app/_components/GuessGame'

export default function Page() {
  return (
    <GuessGame>
      <Image
        src="/bolognese.jpg"
        alt="A food dish"
        height={512}
        width={512}
        className="w-full rounded-xl"
      ></Image>
    </GuessGame>
  )
}
