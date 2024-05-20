import { isValidLocalGameData } from '@/lib/typeValidators'
import { type LocalGameData, type Guess } from '@/lib/types'

export function setLocalGameData(gameId: number, guesses: Guess[]) {
  let allLocalGameData = getAllLocalGameData()
  let foundMatch = false
  !allLocalGameData && (allLocalGameData = [])
  const updatedGameData = allLocalGameData.map((data) => {
    if (data.gameId === gameId) {
      data.guesses = guesses
      foundMatch = true
    }
    return data
  })
  !foundMatch && updatedGameData.push({ gameId, guesses, incremented: false })
  localStorage.setItem('countryguessr-guesses', JSON.stringify(updatedGameData))
}

export function getAllLocalGameData() {
  if (typeof window === 'undefined') {
    // We're in a Node.js environment, so return null
    return null
  }

  const localGuessDataAsJSON = localStorage.getItem('countryguessr-guesses')
  if (localGuessDataAsJSON && localGuessDataAsJSON.length > 0) {
    try {
      const allLocalGameData = JSON.parse(localGuessDataAsJSON) as unknown
      if (
        Array.isArray(allLocalGameData) &&
        allLocalGameData.every(isValidLocalGameData)
      ) {
        return allLocalGameData
      }
    } catch (error) {
      console.error(
        "Failed to parse 'countryguessr-guesses' from localStorage:",
        error,
      )
      return null
    }
  }
  return null
}

export function getLocalGameData(gameId: number): LocalGameData | null {
  const allLocalGameData = getAllLocalGameData()
  const localGameData = allLocalGameData
    ? allLocalGameData.find((LocalGameData) => LocalGameData.gameId === gameId)
    : null
  return localGameData ? localGameData : null
}

export function getLocalIncrementFlag(gameId: number) {
  const localGameData = getLocalGameData(gameId)
  if (localGameData) {
    return localGameData.incremented
  } else {
    return null
  }
}

export function setLocalIncrementFlag(gameId: number, value: boolean) {
  let allLocalGameData = getAllLocalGameData()
  !allLocalGameData && (allLocalGameData = [])
  const updatedGameData = allLocalGameData.map((data) => {
    if (data.gameId === gameId) {
      data.incremented = value
    }
    return data
  })
  localStorage.setItem('countryguessr-guesses', JSON.stringify(updatedGameData))
}

export function getStatsArray() {
  const allLocalGameData = getAllLocalGameData()
  const statsArray = [0, 0, 0, 0, 0, 0, 0]
  if (allLocalGameData) {
    allLocalGameData?.forEach((data) => {
      statsArray[data.guesses.length - 1] += 1
    })
  }
  return statsArray
}
