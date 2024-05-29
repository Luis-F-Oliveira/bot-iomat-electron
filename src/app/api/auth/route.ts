import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()

  const auth = await prisma.$queryRaw`SELECT* FROM Users WHERE entry_code = ${data.entry_code}`
  return Response.json({ auth: auth })
}