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
    <div className={`${consentFlag ? 'hidden' : ''}`}>
      <h1>We Value Your Privacy</h1>
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
      >
        OK
      </button>
    </div>
  )
}
