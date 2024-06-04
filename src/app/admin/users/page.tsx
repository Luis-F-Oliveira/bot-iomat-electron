import { api } from "@/lib/axios"
import { IUser, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<IUser[]> {
  const response = await api.get('users')
  return response.data.users
}

export default async function Page() {
  const data = await getData()
  return <DataTable columns={columns} data={data} />
}
