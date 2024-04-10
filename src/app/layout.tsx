import '@/styles/globals.css'

import { Inter } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],

  variable: '--font-sans',
})

export const metadata = {
  title: 'GountryGuessr',

  description: 'Guess country based on multiple themes',

  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-blue-600`}>
        <TRPCReactProvider>
          <Nav />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  )
}

export function Nav() {
  return (
    <header className="flex w-full justify-center bg-green-500">
      <nav className="w-full max-w-2xl">
        <ul className="flex w-full justify-between bg-red-500">
          <li>
            <Link href="./login">Login</Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="./contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
