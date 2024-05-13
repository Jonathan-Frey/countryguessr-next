'use client'

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { usePathname, useRouter } from 'next/navigation'

function getDefaultDate(pathName: string) {
  const uris = pathName.split('/')
  const date = uris[uris.length - 1]
  const validFormatRegex = /^\d{4}-\d{2}-\d{2}$/
  if (date && validFormatRegex.test(date)) {
    return new Date(date)
  } else {
    return new Date()
  }
}

export default function DateSelector() {
  const pathName = usePathname()
  const [date, setDate] = useState(getDefaultDate(pathName))
  const [formattedDate, setFormattedDate] = useState('')
  const today = format(new Date(Date.now()), 'yyyy-MM-dd')
  console.log('date:', new Date('2024-02-02'))
  const router = useRouter()

  const handlePrevDay = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)))
  }

  const handleNextDay = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)))
  }

  useEffect(() => {
    setFormattedDate(format(date, 'yyyy-MM-dd'))
  }, [date])

  useEffect(() => {
    formattedDate === today
      ? router.push('/dishes')
      : router.push(`/dishes/${formattedDate}`)
  }, [formattedDate, router, today])

  return (
    <div className="relative flex gap-2 self-center">
      <button type="button" onClick={handlePrevDay}>
        &lt;
      </button>
      <h2 className="w-28 text-center">
        {formattedDate === today ? 'today' : formattedDate}
      </h2>
      <button
        type="button"
        onClick={handleNextDay}
        disabled={formattedDate === today}
        className={formattedDate === today ? 'text-gray-400' : undefined}
      >
        &gt;
      </button>
    </div>
  )
}
