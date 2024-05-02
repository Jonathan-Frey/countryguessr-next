'use server'

import { distanceFormatter } from '@/lib/formatters'
import { getDistance, getRhumbLineBearing } from 'geolib'
import { db } from '@/server/db'
import { format } from 'date-fns'

export async function getGame(category: string, targetDate?: string) {
  if (!targetDate) {
    targetDate = format(new Date(Date.now()), 'yyyy-MM-dd')
  }
  console.log('date', targetDate)
  const game = await db.game.findFirst({
    where: {
      date: {
        equals: targetDate,
      },
      category: {
        equals: category,
      },
    },
    include: {
      hints: true, // Include related hints
    },
  })
  return game
}

export async function checkAnswer(
  countryName: string,
  category: string,
  date: string,
) {
  const game = await db.game.findFirst({
    where: {
      date: {
        equals: date,
      },
      category: {
        equals: category,
      },
    },
    select: {
      correctCountry: true, // Include related hints
    },
  })

  const correctCountry = game?.correctCountry

  const guessedCountry = await db.country.findFirst({
    where: {
      name: {
        equals: countryName,
      },
    },
  })

  if (guessedCountry && correctCountry) {
    const distance = distanceFormatter(
      getDistance(
        {
          latitude: correctCountry.latitude,
          longitude: correctCountry.longitude,
        },
        {
          latitude: guessedCountry.latitude,
          longitude: guessedCountry.longitude,
        },
        1000,
      ),
    )
    const bearing = getRhumbLineBearing(
      {
        latitude: guessedCountry.latitude,
        longitude: guessedCountry.longitude,
      },
      {
        latitude: correctCountry.latitude,
        longitude: correctCountry.longitude,
      },
    )

    const data = {
      country: guessedCountry.name,
      distance,
      bearing,
      correct: guessedCountry.name === correctCountry.name ? true : false,
      flag: guessedCountry.smallFlag,
    }

    return data
  }
}
