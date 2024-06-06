import Details from "./details"
import { NavBar } from "./navbar"
import Overview from "./overview"

interface PageProps {
  params: { page: string }
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      <NavBar />
      {params.page === 'details' && <Details />}
      {params.page === 'overview' && <Overview />}
    </div>
  )
}

export async function generateStaticParams() {
  const pages = ['overview', 'details']
  return pages.map(page => ({
    page
  }))
}
