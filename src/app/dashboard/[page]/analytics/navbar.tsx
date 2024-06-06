"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export const NavBar = () => {
  return (
    <nav className="mb-5 flex justify-end items-center">
      <Link href='/dashboard/overview/analytics'>
        <Button variant='link'>
          Visão Geral
        </Button>
      </Link>
      <Link href='/dashboard/details/analytics'>
        <Button variant='link'>
          Detalhes
        </Button>
      </Link>
    </nav>
  )
}