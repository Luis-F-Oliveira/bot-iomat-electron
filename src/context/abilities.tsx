'use client'
import React from "react"
import type { IAbilities } from "@/partials/create-users/abilities/abilities"
import { toast } from "@/components/ui/use-toast"

interface AbilitiesContextProps {
  abilities: IAbilities[] | null
  store: (abilityData: IAbilities) => void
  remove: (id: number) => void
}

interface AbilitiesProviderProps {
  children: React.ReactNode
}

const AbilitiesContext = React.createContext({} as AbilitiesContextProps)

export function useAbilities() {
  const context = React.useContext(AbilitiesContext)
  if (!context) {
    throw new Error('useAbilities deve ser usado dentro de um AbilitiesProvider')
  }
  return context
}

export function AbilitiesProvider({ children }: AbilitiesProviderProps) {
  const [abilities, setAbilities] = React.useState<IAbilities[]>([])

  function store(abilityData: IAbilities) {
    const isDuplicate = abilities.some((ability) => ability.id === abilityData.id)
    if (isDuplicate) {
      toast({
        title: "Aviso",
        description: "Essa permissão já foi atribuida, escolha outra."
      })
      return
    }
    setAbilities((prev) => [...prev, abilityData])
  }

  function remove(id: number) {
    const updatedAbilities = abilities.filter((ability) => ability.id !== id)
    setAbilities(updatedAbilities)
  }

  return (
    <AbilitiesContext.Provider
      value={{ abilities, store, remove }}
    >
      {children}
    </AbilitiesContext.Provider>
  )
}