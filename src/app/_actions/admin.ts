'use server'

import { db } from '@/server/db'
import { gameSchema, type GameFormData } from '@/lib/types'
import { getErrorMessage, isErrorWithCode } from '@/lib/typeValidators'
import { revalidatePath } from 'next/cache'

export async function createImage(file: File) {
  let savedImage
  try {
    if (file && file.size > 0) {
      const imageData = Buffer.from(await file.arrayBuffer())
      savedImage = await db.image.create({
        data: {
          data: imageData,
          contentType: file.type,
        },
      })
      return savedImage.id
    }
  } catch (error) {
    console.log(error)
  }
}

export async function createGame(formData: FormData) {
  try {
    const gameData: Partial<GameFormData> = Object.fromEntries(formData)
    gameData.hints = []

    for (let i = 0; ; i++) {
      const contentKey = `hints[${i}].content`
      const unlockKey = `hints[${i}].unlock`

      if (
        !gameData.hasOwnProperty(contentKey) ||
        !gameData.hasOwnProperty(unlockKey)
      ) {
        break
      }

      const hint = {
        content: gameData[contentKey] as string,
        unlock: Number(gameData[unlockKey]),
      }

      gameData.hints.push(hint)
    }

    const result = gameSchema.parse(gameData)
    const imageId = await createImage(result.imageFile)
    if (imageId) {
      try {
        await db.game.create({
          data: {
            date: result.date,
            image: `/public/images/${imageId}`,
            hints: {
              createMany: {
                data: result.hints,
              },
            },
            category: result.category,
            correctCountry: {
              connect: { name: result.countryName },
            },
            product: result.product,
          },
        })
      } catch (error) {
        await db.image.delete({
          where: {
            id: imageId,
          },
        })

        let err

        isErrorWithCode(error) && error.code === 'P2002'
          ? (err = 'Game already exists for this data and category')
          : (err = error)

        throw err
      }
    } else {
      throw new Error('Image id not found')
    }
    revalidatePath('/admin')
    return {
      success: true,
      message: 'Game was created successfully',
    }
  } catch (error) {
    console.log(error)
    revalidatePath('/admin')
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}

export async function deleteGame(gameId: number) {
  try {
    const data = await db.game.findFirst({
      where: {
        id: gameId,
      },
      select: {
        image: true,
      },
    })
    if (data?.image) {
      const fragmentArray = data.image.split('/')
      const imageId = Number(fragmentArray[fragmentArray.length - 1])
      await db.image.delete({
        where: {
          id: imageId,
        },
      })
    }
    await db.game.delete({
      where: {
        id: gameId,
      },
    })
    revalidatePath('/admin')
    return {
      success: true,
      message: 'Game deleted successfully',
    }
  } catch (error) {
    console.log(error)
    revalidatePath('/admin')
    return {
      success: false,
      error: getErrorMessage(error),
    }
  }
}
