import { BreadcrumbDinamic } from "@/components/breadcrumb"
import { MenuRadial } from "@/components/menu"
import { Navbar } from "./navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container pt-5">
      <Navbar />
      {children}
      <MenuRadial />
      <BreadcrumbDinamic />
    </main>
  )
}