'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendHorizontal } from 'lucide-react'
import { useCreateUser } from '@/context/createuser'

export const Email = () => {
  const { user } = useCreateUser()

  return (
    <section>
      <h1 className="text-2xl mb-2">
        Enviar Acesso
      </h1>
      <div className="flex items-center gap-1">
        <Input disabled value={user?.email} />
        <Button>
          <SendHorizontal />
        </Button>
      </div>
    </section>
  )
}