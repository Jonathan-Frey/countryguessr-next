'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState('food')
  return (
    <>
      <label htmlFor="content-type-select"></label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        name="content-type"
        id="content-type-select"
      >
        <option value="food">Dishes</option>
        <option value="dances">Dances</option>
        <option value="landmarks">Historic Landmarks</option>
        <option value="clothing">Traditional Clothing</option>
        <option value="festival">Famous Festivals</option>
      </select>
      <Link href={`./${selectedCategory}`}>Play</Link>
    </>
  )
}
