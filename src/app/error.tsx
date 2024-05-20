'use client'

import Link from 'next/link'

export default function Error({}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-lg text-gray-600">Something went wrong</h2>
      <Link href="/">Go Back</Link>
    </div>
  )
}
