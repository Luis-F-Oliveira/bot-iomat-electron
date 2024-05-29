import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  const abilityId = url.searchParams.get('abilityId')

  if (userId && abilityId) {
    const userIdNumber = parseInt(userId)
    const abilityIdNumber = parseInt(abilityId)

    if (isNaN(userIdNumber) || isNaN(abilityIdNumber)) {
      return new Response(JSON.stringify({ error: "Invalid userId or abilityId" }), { status: 400 })
    }

    try {
      const abilityOnUser = await prisma.abilitiesOnUsers.findUnique({
        where: {
          userId_abilitiesId: {
            userId: userIdNumber,
            abilitiesId: abilityIdNumber
          }
        }
      })
      return new Response(JSON.stringify({ abilityOnUser }), { status: 200 })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 })
    }
  }

  try {
    const abilitiesOnUsers = await prisma.abilitiesOnUsers.findMany()
    return new Response(JSON.stringify({ abilitiesOnUsers }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { userId, abilitiesId } = data
    if (!userId || !abilitiesId) {
      return new Response(JSON.stringify({ error: 'userId and abilitiesId are required' }), { status: 400 })
    }

    const abilityOnUser = await prisma.abilitiesOnUsers.create({ data })
    return new Response(JSON.stringify({ abilityOnUser }), { status: 201 })
  } catch (error) {
    let errorMessage = 'Failed to create data'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 })
  }

  const userIdNumber = parseInt(userId)
  if (isNaN(userIdNumber)) {
    return new Response(JSON.stringify({ error: 'Invalid user ID' }), { status: 400 })
  }

  try {
    const body = await req.json()
    const { abilitiesId, ...updateData } = body

    if (!abilitiesId) {
      return new Response(JSON.stringify({ error: 'Abilities ID is required' }), { status: 400 })
    }

    const updatedAbility = await prisma.abilitiesOnUsers.update({
      where: {
        userId_abilitiesId: {
          userId: userIdNumber,
          abilitiesId: abilitiesId
        }
      },
      data: updateData
    })

    return new Response(JSON.stringify({ updatedAbility }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update data' }), { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 })
  }

  const idNumber = parseInt(id)
  if (isNaN(idNumber)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 })
  }

  try {
    await prisma.abilities.delete({ where: { id: idNumber } })
    return new Response(JSON.stringify({ message: "Ability deleted" }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete data' }), { status: 500 })
  }
}
