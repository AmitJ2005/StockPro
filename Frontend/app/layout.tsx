import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './contexts/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StockPro - Empower Your Investment Decisions',
  description: 'Analyze stocks, track performance, and make informed decisions with our powerful tools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

