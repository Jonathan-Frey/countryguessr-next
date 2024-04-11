import Link from 'next/link'
import Image from 'next/image'

export default function CategoryButton(props: {
  displayName: string
  pathName: string
}) {
  return (
    <li className="w-full border-b-2 bg-neutral-100 text-5xl hover:scale-105 hover:bg-neutral-200">
      <Link href={`./${props.pathName}`} className="flex gap-8 p-2">
        <Image alt="torii gate icon" src="/torii.svg" width={48} height={48} />
        <p>{props.displayName}</p>
      </Link>
    </li>
  )
}
