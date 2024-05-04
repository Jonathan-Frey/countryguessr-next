import { z } from 'zod'

const hintSchema = z.object({
  content: z.string().min(1),
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
})

export type GameData = {
  date: string
  imageFile: File
  hints: Array<{ content: string; unlock: number }>
  category: string
  countryName: string
  [key: string]:
    | string
    | number
    | File
    | Array<{ content: string; unlock: number }>
}
