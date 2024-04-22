'use client'

import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(
  () => import('react-player'),
  { ssr: false }, // This line is important. It's what prevents server-side rendering.
)

export default function VideoPlayer(props: { url: string; className: string }) {
  return (
    <div className={props.className}>
      <ReactPlayer url={props.url} height="100%" width="100%" playing />
    </div>
  )
}
