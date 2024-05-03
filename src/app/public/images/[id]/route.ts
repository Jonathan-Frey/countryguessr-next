import { db } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const image = await db.image.findFirst({
    where: {
      id: Number.parseInt(params.id),
    },
  })
  if (image) {
    return new Response(image.data, {
      headers: { 'content-type': image.contentType },
    })
  } else {
    return new NextResponse(null, { status: 404 })
  }
}
