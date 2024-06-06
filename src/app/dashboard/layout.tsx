import { BreadcrumbDinamic } from "@/components/breadcrumb"
import { MenuRadial } from "@/components/menu"
import { UserProvider } from "@/context/user"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <main className="container pt-5">
        {children}
        <MenuRadial />
        <BreadcrumbDinamic />
      </main>
    </UserProvider>
  )
}
