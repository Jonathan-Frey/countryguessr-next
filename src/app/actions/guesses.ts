'use server'

import { distanceFormatter } from '@/lib/formatters'
import { api } from '@/trpc/server'
import { getDistance, getCompassDirection, getRhumbLineBearing } from 'geolib'

export async function checkAnswer(countryName: string) {
  const correctCountry = {
    name: 'sweden',
    latitude: 62,
    longitude: 15,
  }
  const guessedCountry = await api.country.getFirstMatchingCountry({
    name: countryName,
  })

  const response: {
    distance?: string
    correct?: boolean
    direction?: string
    bearing?: number
  } = {}

  if (guessedCountry) {
    response.distance = distanceFormatter(
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
    response.direction = getCompassDirection(
      {
        latitude: guessedCountry.latitude,
        longitude: guessedCountry.longitude,
      },
      {
        latitude: correctCountry.latitude,
        longitude: correctCountry.longitude,
      },
    )
    response.bearing = getRhumbLineBearing(
      {
        latitude: guessedCountry.latitude,
        longitude: guessedCountry.longitude,
      },
      {
        latitude: correctCountry.latitude,
        longitude: correctCountry.longitude,
      },
    )
  }
  if (countryName.toLowerCase() === correctCountry.name.toLowerCase()) {
    response.correct = true
  } else {
    response.correct = false
  }

  return response
}
