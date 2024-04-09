import Link from 'next/link'

import { getServerAuthSession } from '@/server/auth'
// import { api } from '@/trpc/server'

export default async function Home() {
  const session = await getServerAuthSession()

  return (
    <main className="">
      <div className="flex flex-col items-center gap-2">
        {session ? (
          Object.keys(session.user).map((property) => {
            if (property in session.user) {
              const value = session.user[property as keyof typeof session.user]
              return <div key={property}>{value}</div>
            }
            return null
          })
        ) : (
          <p className="text-2xl text-black">Loading tRPC query...</p>
        )}

        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-black">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? '/api/auth/signout' : '/api/auth/signin'}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? 'Sign out' : 'Sign in'}
          </Link>
        </div>
      </div>
    </main>
  )
}
