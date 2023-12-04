import { Inter } from 'next/font/google'
import './globals.css'

import { getServerSession } from 'next-auth'
// import AuthPovider from '@/util/SessionProvider'
import SessionProvider from '@/util/SessionProvider'

import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth.JS',
  description: 'Authentication system with NextAuth.JS',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
