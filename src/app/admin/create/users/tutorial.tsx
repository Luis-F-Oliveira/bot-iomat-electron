'use client'
import React from 'react'
import { Minus, Plus } from 'lucide-react'

export const Tutorial = () => {
  const [tutorial, setTutorial] = React.useState(false)

  return (
    <section>
      <h1
        onClick={() => setTutorial(!tutorial)}
        className="text-2xl mb-2 cursor-pointer flex items-center gap-1"
      >
        Como Cadastrar {tutorial ? <Plus /> : <Minus />}
      </h1>
    </section>
  )
}
