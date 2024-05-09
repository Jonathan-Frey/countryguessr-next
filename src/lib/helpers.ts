import { isValidLocalGameData } from '@/lib/typeValidators'
import { type LocalGameData, type Guess } from '@/lib/types'

export function setLocalGuesses(
  guesses: Guess[],
  date: string,
  category: string,
) {
  let allLocalGameData = getAllLocalGameData()
  let foundMatch = false
  !allLocalGameData && (allLocalGameData = [])
  const updatedGameData = allLocalGameData.map((data) => {
    if (data.date === date && data.category === category) {
      data.guesses = guesses
      foundMatch = true
    }
    return data
  })
  !foundMatch && updatedGameData.push({ date, category, guesses })
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

export function getLocalGameData(
  date: string,
  category: string,
): LocalGameData | null {
  const allLocalGameData = getAllLocalGameData()
  const localGameData = allLocalGameData
    ? allLocalGameData.find(
        (LocalGameData) =>
          LocalGameData.category === category && LocalGameData.date === date,
      )
    : null
  return localGameData ? localGameData : null
}
