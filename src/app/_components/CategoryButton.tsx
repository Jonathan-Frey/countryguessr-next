import Link from 'next/link'
import Image from 'next/image'

export default function CategoryButton(props: {
  displayName: string
  pathName: string
}) {
  return (
    <li
      className=" w-full rounded-md border-b-2 border-tertiary text-5xl hover:scale-105 hover:bg-secondary hover:transition-all"
      data-testid="category-button"
    >
      <Link href={`./${props.pathName}`} className="flex gap-8 p-2">
        <Image
          alt="placeholder icon"
          src="/placeholder.svg"
          width={48}
          height={48}
        />
        <p>{props.displayName}</p>
      </Link>
    </li>
  )
}
