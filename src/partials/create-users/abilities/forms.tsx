'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Info, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useCreateUser } from '@/context/createuser'
import { useAbilities } from '@/context/abilities'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IAbilities } from "./abilities"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

interface FormsProps {
  abilities: IAbilities[]
}

const FormSchema = z.object({
  ability: z.string({
    required_error: "Por favor selecione uma permissão."
  })
})

export const Forms: React.FC<FormsProps> = ({ abilities }) => {
  const { user } = useCreateUser()
  const { store } = useAbilities()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selectedAbility = data.ability
    const selectedAbilityObj: IAbilities | undefined = abilities.find((item) => item.name === selectedAbility)
    if (selectedAbilityObj) {
      store(selectedAbilityObj)
    }
  }

  return (
    <div className='space-y-5'>
      <section>
        <Label htmlFor="username">Usuário</Label>
        <Input id="username" disabled value={user?.name} />
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="ability"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-1 items-center">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Permissões" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {abilities.map((items) => (
                        <SelectItem key={items.id} value={`${items.name}`}>{items.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="submit">
                    <Plus />
                  </Button>
                </div>
                <FormDescription className="flex items-center gap-1">
                  Aplicar permissões para o usuário.{" "}
                  <Link className="flex items-center gap-0.5" href="/admin/abilities">
                    <Info size={16} />
                    saiba mais
                  </Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}