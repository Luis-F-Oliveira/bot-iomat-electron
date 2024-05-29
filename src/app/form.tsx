"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/axios"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  entry_code: z.string().min(6, {
    message: "Código de acesso deve conter 6 caracteres."
  })
})

export function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      entry_code: ""
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const pin = JSON.stringify(data, null, 2)

    const response = await api.post('auth', pin)
    const { auth } = response.data

    if (auth.length !== 0) {
      localStorage.setItem('user', JSON.stringify(auth[0]))
      router.push('/dashboard')
    } else {
      toast({
        title: "Erro ao cadastrar",
        description: "Usuário não encontrado!"
      })
    }
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.entry_code && value.entry_code.length === 6) {
        form.handleSubmit(onSubmit)()
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="entry_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de entrada</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot
                      index={5}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement
                        field.onChange(e)
                        const value = target.value
                        if (value.length === 1) {
                          const pinValue = form.getValues("entry_code")
                          if (pinValue.length === 6) {
                            form.handleSubmit(onSubmit)()
                          }
                        }
                      }}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
