'use client'
import { Badge } from "@/components/ui/badge"
import { useAbilities } from "@/context/abilities"

export const Badges = () => {
  const { abilities, remove } = useAbilities()
  return (
    <section className="space-x-1">
      {abilities?.map((item) => (
        <Badge
          key={item.id}
          className="cursor-pointer hover:bg-red-600 dark:hover:text-white"
          onClick={() => remove(item.id)}
        >
          {item.name}
        </Badge>
      ))}
    </section>
  )
}