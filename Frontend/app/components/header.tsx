'use client'

import { useState } from 'react'
import { 
  StoreIcon as Stock, 
  UserCircle, 
  LogOut, 
  Menu, 
  X,
  Search
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useAuth } from '../contexts/auth-context'
import StockSearch from './stock-search'

export function Header() {
  const { isAuthenticated, username, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center justify-center">
            <Stock className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">StockPro</span>
          </Link>

          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <StockSearch />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{username}</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden py-2 px-2 border-t">
            <StockSearch />
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col py-2">
              <Link href="/dashboard" className="px-4 py-2 text-gray-700 hover:bg-gray-50">
                Dashboard
              </Link>
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-2 text-gray-700">
                    <UserCircle className="h-5 w-5" />
                    <span>{username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Log in
                  </Link>
                  <Link href="/signup" className="px-4 py-2 text-green-600 hover:bg-gray-50">
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 