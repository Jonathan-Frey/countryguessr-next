'use server'

import { distanceFormatter } from '@/lib/formatters'
import { getDistance, getRhumbLineBearing } from 'geolib'
import { db } from '@/server/db'

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
      correctCountry: {
        include: {
          borders: {
            select: {
              borderCountry: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
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

    const borderingArray = correctCountry.borders.filter((border) => {
      return border.borderCountry.name === guessedCountry.name
    })

    let isBordering = false

    if (borderingArray.length > 0) {
      isBordering = true
    }

    const data = {
      country: guessedCountry.name,
      distance,
      bearing,
      correct: guessedCountry.name === correctCountry.name ? true : false,
      flag: guessedCountry.smallFlag,
      isBordering,
    }

    return data
  }
}

export async function incrementTimesPlayed(gameId: number) {
  const result = await db.game.update({
    where: {
      id: gameId,
    },
    data: {
      timesPlayed: {
        increment: 1,
      },
    },
  })
  return result
}
