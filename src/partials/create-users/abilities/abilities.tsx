import { api } from '@/lib/axios'
import { Forms } from './forms'
import { AbilitiesProvider } from '@/context/abilities'
import { Badges } from './badge'
import { SaveButton } from './save'

export type IAbilities = {
  id: number
  name: string
  description: string
}

async function getAbilities(): Promise<IAbilities[]> {
  const response = await api.get('abilities')
  return response.data.abilities
}

export default async function Abilities() {
  const abilities = await getAbilities()

  return (
    <AbilitiesProvider>
      <section className='space-y-3'>
        <h1 className='text-2xl mb-2'>
          Adicionar Permissões
        </h1>
        <Forms abilities={abilities} />
        <Badges />
        <SaveButton />
      </section>
    </AbilitiesProvider>
  )
}
