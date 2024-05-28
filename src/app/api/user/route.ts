import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.url
  const id = url.split('?')[1]?.split('=')[1]

  if (id) {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
    return Response.json({ user: user })
  } else {
    const users = await prisma.user.findMany()
    return Response.json({ users: users })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const user = await prisma.user.create({ data: data })
  return Response.json({ user: user })
}

export async function PUT(req: NextRequest) {
  const url = req.url
  const id = url.split('?')[1]?.split('=')[1]
  const data = await req.json()

  const user = await prisma.user.update({ 
    where: { 
      id: parseInt(id) }, 
      data: data 
  })
  
  return Response.json({ user: user })
}

export async function DELETE(req: NextRequest) {
  const url = req.url
  const id = url.split('?')[1]?.split('=')[1]

  await prisma.user.delete({ where: { id: parseInt(id) } })
  return Response.json({ message: "user deleted" })
}
