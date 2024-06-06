'use client'

import { api } from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useAbilities } from '@/context/abilities'
import { useCreateUser } from '@/context/createuser'

export const SaveButton = () => {
  const { user } = useCreateUser()
  const { abilities } = useAbilities()

  const saveData = () => {
    try {
      if (user && abilities) {
        abilities.forEach((items) => {
          api.post('abilitiesonusers', {
            'userId': user.id,
            'abilitiesId': items.id
          })
        })
      }
    } catch {
      toast({
        title: "Aviso",
        description: "Houve algum erro na atribuição de permissões."
      })
    } finally {
      toast({
        title: "Aviso",
        description: "Permissões atribuidas com successo."
      })
    }
  }

  return <Button onClick={saveData}>Atribuir</Button>
}