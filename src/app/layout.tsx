import '@/styles/globals.css'

import { Poppins } from 'next/font/google'
import { TRPCReactProvider } from '@/trpc/react'
import Link from 'next/link'
import Image from 'next/image'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
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
      <body
        className={`font-sans ${poppins.variable} flex h-screen flex-col bg-neutral-100`}
      >
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
    <header className="flex w-full justify-center">
      <nav className="w-full max-w-2xl">
        <ul className="flex w-full items-center justify-between px-4 py-2">
          <li>
            <Link href="./">
              <Image
                alt="bug report icon"
                src="/bug-report.svg"
                width={32}
                height={32}
              ></Image>
            </Link>
          </li>
          <li>
            <Link href="/" className="text-5xl">
              <h1>CountryGuessr</h1>
            </Link>
          </li>
          <li>
            <Link href="./report">
              <Image
                alt="bug report icon"
                src="/bug-report.svg"
                width={32}
                height={32}
              ></Image>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
