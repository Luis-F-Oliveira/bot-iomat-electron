import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
  const url = req.url
  const id = url.split('?')[1]?.split('=')[1]

  if (id) {
    const ability = await prisma.ability.findUnique({ where: { id: parseInt(id) } })
    return Response.json({ ability: ability })
  } else {
    const abilities = await prisma.ability.findMany()
    return Response.json({ abilities: abilities })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const ability = await prisma.ability.create({ data: data })

  return Response.json({ ability: ability })
}

export async function PUT(req: NextRequest) {
  const url = req.url
  const id = url.split('?')[1]?.split('=')[1]
  const data = await req.json()

  const ability = await prisma.ability.update({
    where: { id: parseInt(id) },
    data: data
  })

  return Response.json({ ability: ability })
}

export async function DELETE(req: NextRequest) {
  const url = req.url
  const id = url.split('?')[1]?.split('=')[1]

  await prisma.ability.delete({ where: { id: parseInt(id) } })
  return Response.json({ message: "ability deleted" })
}
