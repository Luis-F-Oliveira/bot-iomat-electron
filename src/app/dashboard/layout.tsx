"use client"

import { UserProvider } from "@/context/user"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}