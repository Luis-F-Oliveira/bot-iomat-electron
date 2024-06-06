'use client'

import { Abilities, Email, Singin } from '@/partials/create-users'
import { CreateUserProvider } from '@/context/createuser'
import { Tutorial } from './tutorial'

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <section className="space-y-5">
        <CreateUserProvider>
          <Singin />
          <Abilities />
          <Email />
        </CreateUserProvider>
      </section>
      <Tutorial />
    </div>
  )
}
