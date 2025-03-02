'use client'

import { LayoutWrapper } from './components/layout-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL or return to the homepage.
          </p>
          <Link href="/">
            <Button className="inline-flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </LayoutWrapper>
  )
}