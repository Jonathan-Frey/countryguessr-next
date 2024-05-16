import '@/styles/globals.css'
import Script from 'next/script'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import CategoryList from '@/app/_components/CategoryList'

const categories = [
  { altText: 'svg of a hamburger', pathName: 'dishes' },
  { altText: 'svg of the leaning tower of pisa', pathName: 'landmarks' },
]

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
      {process.env.NODE_ENV === 'production' && (
        <Script
          src="https://eu.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        ></Script>
      )}

      <body
        className={`font-sans ${poppins.variable} flex min-h-screen flex-col bg-primary text-text`}
      >
        <Nav />
        <div className="flex w-full max-w-screen-md justify-center self-center">
          <CategoryList categories={categories} />
        </div>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  )
}

function Nav() {
  return (
    <header className="flex w-full justify-center">
      <nav className="w-full max-w-screen-md border-b-2 border-tertiary sm:px-16 md:px-0">
        <ul className="flex w-full items-center justify-between px-4 py-2">
          <li>
            <Link href="./">
              <Image
                alt="placeholder icon"
                src="/placeholder.svg"
                width={24}
                height={24}
              ></Image>
            </Link>
          </li>
          <li>
            <Link href="/" className="text-xl">
              <h1>CountryGuessr</h1>
            </Link>
          </li>
          <li>
            <Link href="./report">
              <Image
                alt="bug report icon"
                src="/bug-report.svg"
                width={24}
                height={24}
              ></Image>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
