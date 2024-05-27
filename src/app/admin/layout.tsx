"use client"

import { UserProvider } from "@/context/user"
import { Navbar } from "./navbar"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react"
import { UpButton } from "./upbutton"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(part => part !== '')
  return (
    <UserProvider>
      <header>
        <Navbar />
        <div className="container mt-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>System</BreadcrumbPage>
              </BreadcrumbItem>
              {parts.map((part, index) => {
                const breadcrumbPath = '/' + parts.slice(0, index + 1).join('/')
                return (
                  <Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === parts.length - 1 ? (
                        <BreadcrumbPage>{part.charAt(0).toUpperCase() + part.slice(1)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumbPath}>{part.charAt(0).toUpperCase() + part.slice(1)}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="container mt-5">
        {children}
      </main>
      <UpButton />
    </UserProvider>
  )
}