'use client'

import { useEffect, useState } from 'react'
import { useConsentFlag } from '@/lib/hooks'

export function Banner() {
  const [isMounted, setIsMounted] = useState(false)
  const [consentFlag, setConsentFlag] = useConsentFlag()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 flex flex-col gap-4 border-2 border-tertiary bg-primary p-4 ${consentFlag ? 'hidden' : ''}`}
    >
      <h1 className="border-b-2 border-slate-300 text-lg font-semibold">
        We Value Your Privacy
      </h1>
      <p>
        Our website uses cookies and similar technologies to enhance your
        browsing experience and ensure the application works correctly. All the
        data collected is anonymous. By continuing to use this site, you
        acknowledge that you have read and understood this notice and consent to
        our use of data collection practices as described.
      </p>
      <button
        type="button"
        onClick={() => {
          setConsentFlag(true)
        }}
        className="bg-secondary px-2 py-1 hover:bg-tertiary"
      >
        OK
      </button>
    </div>
  )
}
