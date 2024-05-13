'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

function isActivePath(search: string, path: string) {
  if (path.length === 0 && path === search) {
    return true
  }
  const uri = path.split('/')[1]
  if (uri) {
    return uri.includes(search)
  } else {
    return false
  }
}

export default function CategoryButton(props: {
  altText: string
  pathName: string
}) {
  const fullPathName = usePathname()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (isActivePath(props.pathName, fullPathName)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [selected, fullPathName, props.pathName])
  return (
    <li
      className={`flex aspect-square w-12 rounded-lg border-2 border-tertiary ${selected && 'bg-secondary'}`}
      data-testid="category-button"
    >
      <Link href={`/${props.pathName}`} className="relative h-full w-full">
        <Image
          src={`/${props.pathName}.svg`}
          alt={props.altText}
          fill
          objectFit="cover"
        ></Image>
      </Link>
    </li>
  )
}
