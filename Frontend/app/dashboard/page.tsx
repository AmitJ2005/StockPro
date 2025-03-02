'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Star, Trash2, AlertCircle } from 'lucide-react'
import { LayoutWrapper } from '../components/layout-wrapper'
import axiosInstance from '../lib/axios'

interface WatchlistItem {
  id: number
  stock_symbol: string
}

export default function DashboardPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { checkAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const initializePage = async () => {
      const isAuthed = await checkAuth()
      if (!isAuthed) {
        router.push('/login')
        return
      }
      fetchWatchlist()
    }

    initializePage()
  }, [checkAuth, router])

  const fetchWatchlist = async () => {
    try {
      const response = await axiosInstance.get('/api/watchlist/')
      setWatchlist(response.data)
    } catch {
      setError('Failed to fetch watchlist')
    } finally {
      setLoading(false)
    }
  }

  const removeFromWatchlist = async (symbol: string) => {
    try {
      await axiosInstance.delete('/api/watchlist/', {
        data: { symbol }
      })
      setWatchlist(prev => prev.filter(item => item.stock_symbol !== symbol))
    } catch {
      setError('Failed to remove stock from watchlist')
    }
  }

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Your Watchlist</h1>
            <Link href="/" className="self-start sm:self-auto">
            </Link>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm sm:text-base">{error}</span>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md divide-y">
            {watchlist.map((item) => (
              <div 
                key={item.id} 
                className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
              >
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span className="font-medium text-base sm:text-lg">{item.stock_symbol}</span>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-4">
                  <Link 
                    href={`/stock/${item.stock_symbol}`}
                    className="flex-1 sm:flex-none"
                  >
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWatchlist(item.stock_symbol)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {watchlist.length === 0 && (
              <div className="p-6 sm:p-8 text-center">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No stocks in watchlist</h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Start by adding some stocks to your watchlist
                </p>
                <Link href="/" className="mt-6 inline-block">
                  <Button variant="outline" className="text-green-600 hover:text-green-700">
                    Browse Stocks
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}