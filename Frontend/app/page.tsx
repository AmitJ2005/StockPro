'use client'

import { 
  StoreIcon as Stock, 
  UserCircle, 
  LogOut,
  TrendingUp,
  PieChart,
  Zap,
  BarChart,
  DollarSign,
  Users,
  Menu,
  X
} from 'lucide-react'
import StockSearch from './components/stock-search'
import { BackgroundElements } from './components/background-elements'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from './contexts/auth-context'
import { Footer } from './components/footer'
import { useState } from 'react'

export default function Home() {
  const { isAuthenticated, username, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center justify-center">
              <Stock className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">StockPro</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/features" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">{username}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2"
                    onClick={logout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-green-600 transition-colors mr-4">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden border-t">
              <nav className="flex flex-col py-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Dashboard
                    </Link>
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
      <main className="flex-1 pt-16"> {/* Add padding-top to account for fixed header */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-50 to-white relative overflow-visible">
          <BackgroundElements />
          <div className="container px-4 md:px-6 relative">
            <div className="space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                Empower Your Investment Decisions
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                Analyze stocks, track performance, and make informed decisions with our powerful tools.
              </p>
              <div className="relative z-30">
                <StockSearch />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 bg-white flex flex-col items-center">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-16">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="flex flex-col items-center space-y-4">
                <TrendingUp className="h-20 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Real-time Analytics</h3>
                <p className="text-gray-600">Get up-to-the-minute data and insights on your favorite stocks.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <PieChart className="h-20 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Portfolio Management</h3>
                <p className="text-gray-600">Track and manage your investments in one place.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Zap className="h-20 w-12 text-yellow-600" />
                <h3 className="text-xl font-bold">AI-Powered Predictions</h3>
                <p className="text-gray-600">Leverage machine learning for stock performance forecasts.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 bg-gray-50 flex flex-col items-center">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">Why Choose StockPro?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-8">
              <div className="flex flex-col items-center space-y-6">
                <BarChart className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Advanced Charting</h3>
                <p className="text-gray-600">Visualize stock data with our state-of-the-art charting tools.</p>
              </div>
              <div className="flex flex-col items-center space-y-6">
                <DollarSign className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Financial News</h3>
                <p className="text-gray-600">Stay informed with the latest financial news and market updates.</p>
              </div>
              <div className="flex flex-col items-center space-y-6">
                <Users className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Community Insights</h3>
                <p className="text-gray-600">Connect with other investors and share valuable insights.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-600 to-blue-600 text-white flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Investing Smarter?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Join thousands of investors who trust StockPro for their financial decisions.
              </p>
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <Button className="w-full bg-white text-green-600 hover:bg-gray-100">
                    Get Started Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}