'use server'

import { distanceFormatter } from '@/lib/formatters'
import { getDistance, getRhumbLineBearing } from 'geolib'
import { db } from '@/server/db'

export async function checkAnswer(countryName: string) {
  const correctCountry = {
    name: 'Sweden',
    latitude: 62,
    longitude: 15,
  }
  const guessedCountry = await db.country.findFirst({
    where: {
      name: {
        equals: countryName,
      },
    },
  })

  if (guessedCountry) {
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
