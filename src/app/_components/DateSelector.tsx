'use client'

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

export default function DateSelector() {
  const [date, setDate] = useState(new Date())
  const [formattedDate, setFormattedDate] = useState('')
  const today = format(new Date(Date.now()), 'yyyy-MM-dd')

  const handlePrevDay = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)))
  }

  const router = useRouter()

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
      <button type="button" onClick={handleNextDay}>
        &gt;
      </button>
    </div>
  )
}
