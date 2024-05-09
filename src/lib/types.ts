import { type Game, type Country } from '@prisma/client'
import { z } from 'zod'

const hintSchema = z.object({
  content: z.string().min(1, 'Hint content must be at least 1 character long'),
  unlock: z.number().int().nonnegative(),
})

export const gameSchema = z.object({
  date: z.string().refine(
    (date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/
      return regex.test(date)
    },
    {
      message: 'Date must be in the format yyyy-mm-dd',
    },
  ),
  imageFile: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size > 0 && ['image/jpeg', 'image/png'].includes(file.type),
      {
        message:
          "File must be non-empty and of type 'image/jpeg' or 'image/png'",
      },
    ),
  hints: z.array(hintSchema),
  category: z.string(),
  countryName: z.string(),
  product: z.string().min(1, 'Product must be at least 1 character long'),
})

export type GameFormData = {
  date: string
  imageFile: File
  hints: Array<{ content: string; unlock: number }>
  category: string
  countryName: string
  product: string
  [key: string]:
    | string
    | number
    | File
    | Array<{ content: string; unlock: number }>
}

export type GameData = {
  hints: Hint[]
} & {
  correctCountry: Country
} & Game

export type Hint = {
  id: number
  unlock: number
  content: string
  gameId: number | null
}

export type Guess = {
  country: string
  distance: string
  bearing: number
  correct: boolean
  flag: string
}

export type LocalGameData = {
  date: string
  category: string
  guesses: Guess[]
}
