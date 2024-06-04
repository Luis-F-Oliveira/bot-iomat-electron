import { prisma } from '@/lib/prisma'

async function generateUniqueEntryCode(existingCodes: Set<string>) {
  let newCode: string
  do {
    newCode = Math.floor(100000 + Math.random() * 900000).toString()
  } while (existingCodes.has(newCode))
  return newCode
}

export async function GET() {
  const users = await prisma.users.findMany()
  const existingCodes = new Set(users.map(user => user.entry_code))
  
  const entry_code = await generateUniqueEntryCode(existingCodes)

  return Response.json({ entry_code })
}
