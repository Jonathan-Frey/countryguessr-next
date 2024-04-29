import Video from 'next-video'
import getStarted from '/videos/get-started.mp4'
import GuessGame from '@/app/_components/GuessGame'

export default function Page() {
  return (
    <GuessGame>
      <Video src={getStarted} className="overflow-hidden rounded-xl"></Video>
    </GuessGame>
  )
}
