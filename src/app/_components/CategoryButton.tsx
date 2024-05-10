import Link from 'next/link'
import Image from 'next/image'

export default function CategoryButton(props: {
  displayName: string
  pathName: string
}) {
  return (
    <li
      className="aspect-square w-full p-4 text-5xl sm:w-1/2"
      data-testid="category-button"
    >
      <Link
        href={`./${props.pathName}`}
        className="relative flex h-full w-full items-center justify-center rounded-md border-2 border-tertiary hover:scale-105 hover:bg-secondary hover:transition-all"
      >
        <p>{props.displayName}</p>
        <Image
          alt="placeholder icon"
          src="/dish-card-bg.jpg"
          width={512}
          height={512}
          className="absolute inset-0 -z-10 h-full w-full rounded-md"
        />
      </Link>
    </li>
  )
}
