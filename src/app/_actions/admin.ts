'use server'

import { db } from '@/server/db'
import { z } from 'zod'

const ImageFile = z.object({
  size: z.number().min(1), // size should not be zero
  type: z.enum(['image/png', 'image/jpeg']), // type should be an image, either png or jpeg
})

const Game = z.object({
  date: z.string(),
  imageFile: ImageFile,
  hints: z.array(
    z.object({
      content: z.string(),
      unlock: z.number(),
    }),
  ),
  category: z.string(),
  countryName: z.string(),
})

export async function createImage(file: File) {
  try {
    if (file && file.size > 0) {
      const imageData = Buffer.from(await file.arrayBuffer())
      const savedImage = await db.image.create({
        data: {
          data: imageData,
          contentType: file.type,
        },
      })
      return savedImage.id
    }
  } catch (error) {
    return
  }
}

export async function createGame(formData: FormData) {
  try {
    const gameData = {
      date: formData.get('date') as string,
      imageFile: formData.get('image') as File,
      hints: [
        {
          content: formData.get('hints[0].content') as string,
          unlock: formData.get('hints[0].unlock')
            ? parseInt(formData.get('hints[0].unlock') as string)
            : 0,
        },
        {
          content: formData.get('hints[1].content') as string,
          unlock: formData.get('hints[1].unlock')
            ? parseInt(formData.get('hints[1].unlock') as string)
            : 0,
        },
        {
          content: formData.get('hints[2].content') as string,
          unlock: formData.get('hints[2].unlock')
            ? parseInt(formData.get('hints[2].unlock') as string)
            : 0,
        },
      ],
      category: formData.get('category') as string,
      countryName: formData.get('correctCountry') as string,
    }
    Game.parse(gameData)
    const imageId = await createImage(gameData.imageFile)
    if (imageId) {
      await db.game.create({
        data: {
          date: gameData.date,
          image: `/public/images/${imageId}`,
          hints: {
            createMany: {
              data: gameData.hints,
            },
          },
          category: gameData.category,
          correctCountry: {
            connect: { name: gameData.countryName },
          },
        },
      })
    }
  } catch (error) {
    console.log(error)
  }
}
