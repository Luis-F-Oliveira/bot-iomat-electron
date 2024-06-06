import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className="flex justify-end items-center mb-5">
      <Link href={'/admin/users'}>
        <Button variant='link'>
          Usuários
        </Button>
      </Link>
      <Link href={'/admin/teste'}>
        <Button variant='link'>
          Permissões
        </Button>
      </Link>
      <Link href={''}>
        <Button variant='link'>
          Coleta de dados
        </Button>
      </Link>
    </nav>
  )
}