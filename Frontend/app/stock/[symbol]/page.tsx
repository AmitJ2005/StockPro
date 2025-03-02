'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Star, AlertCircle, TrendingUp, IndianRupee, BarChart2 } from 'lucide-react'
import { useAuth } from '../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { LayoutWrapper } from '../../components/layout-wrapper'
import axiosInstance from '../../lib/axios'

interface StockData {
  symbol: string
  name: string
  last_price: number
  ebitda: number
  net_income: number
  revenue: number
  profit_margin: number
  book_value: number
  debt_to_equity: number
  dividend_rate: number
  trailing_pe: number
  forward_pe: number
  beta: number
  employees: number
  sector: string
  industry: string
  market_cap: number
  enterprise_value: number
}

// Function to format numbers in Indian currency format with proper comma placements
const formatIndianNumber = (num: number): string => {
  if (!num) return '0'
  
  const value = Math.abs(num)
  
  // For crores (≥ 1,00,000)
  if (value >= 10000000) {
    const crores = value / 10000000
    const formattedCrores = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(crores)
    return `${formattedCrores} Cr`
  }
  
  // For lakhs (≥ 1,00,000)
  if (value >= 100000) {
    const lakhs = value / 100000
    const formattedLakhs = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(lakhs)
    return `${formattedLakhs} L`
  }
  
  // For thousands and smaller numbers
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(value)
}

export default function StockDetailsPage() {
  const { symbol } = useParams()
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const fetchStockDetails = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/stock-details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol })
      })
      if (response.ok) {
        const data = await response.json()
        setStockData(data)
      }
    } catch {
      console.error('Failed to fetch stock details')
    } finally {
      setLoading(false)
    }
  }, [symbol])

  const checkWatchlistStatus = useCallback(async () => {
    if (!isAuthenticated) return

    try {
      const response = await axiosInstance.get('/api/watchlist/')
      if (response.data) {
        setIsInWatchlist(response.data.some((item: { stock_symbol: string }) => item.stock_symbol === symbol))
      }
    } catch {
      console.error('Failed to check watchlist status')
    }
  }, [isAuthenticated, symbol])

  useEffect(() => {
    fetchStockDetails()
    if (isAuthenticated) {
      checkWatchlistStatus()
    }
  }, [symbol, isAuthenticated, checkWatchlistStatus, fetchStockDetails])

  const toggleWatchlist = async () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    try {
      if (isInWatchlist) {
        await axiosInstance.delete('/api/watchlist/', {
          data: { symbol }
        })
      } else {
        await axiosInstance.post('/api/watchlist/', {
          symbol
        })
      }
      setIsInWatchlist(!isInWatchlist)
    } catch {
      console.error('Failed to update watchlist')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!stockData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900">Stock not found</h2>
        </div>
      </div>
    )
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 break-words">{stockData.name}</h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                  <p className="text-base sm:text-lg text-gray-600">{stockData.symbol}</p>
                  <span className="hidden sm:inline text-gray-400">|</span>
                  <p className="text-sm sm:text-base text-gray-600">{stockData.sector}</p>
                  <span className="hidden sm:inline text-gray-400">|</span>
                  <p className="text-sm sm:text-base text-gray-600">{stockData.industry}</p>
                </div>
              </div>
              {isAuthenticated && (
                <Button
                  onClick={toggleWatchlist}
                  variant={isInWatchlist ? "outline" : "default"}
                  className={`w-full sm:w-auto ${isInWatchlist ? "text-yellow-600" : ""}`}
                >
                  <Star className="h-5 w-5 mr-2" />
                  {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <IndianRupee className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium">Current Price</h3>
                </div>
                <p className="text-xl sm:text-2xl font-bold">
                  ₹{stockData.last_price?.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <BarChart2 className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">Market Cap</h3>
                </div>
                <p className="text-xl sm:text-2xl font-bold">
                  ₹{formatIndianNumber(stockData.market_cap)}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-medium">Enterprise Value</h3>
                </div>
                <p className="text-xl sm:text-2xl font-bold">
                  ₹{formatIndianNumber(stockData.enterprise_value)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Profitability</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Revenue</span>
                    <span className="font-medium text-sm sm:text-base">₹{formatIndianNumber(stockData.revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">EBITDA</span>
                    <span className="font-medium text-sm sm:text-base">₹{formatIndianNumber(stockData.ebitda)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Net Income</span>
                    <span className="font-medium text-sm sm:text-base">₹{formatIndianNumber(stockData.net_income)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Profit Margin</span>
                    <span className="font-medium text-sm sm:text-base">{(stockData.profit_margin * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Valuation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Book Value</span>
                    <span className="font-medium text-sm sm:text-base">₹{stockData.book_value?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Trailing P/E</span>
                    <span className="font-medium text-sm sm:text-base">{stockData.trailing_pe?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Forward P/E</span>
                    <span className="font-medium text-sm sm:text-base">{stockData.forward_pe?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Beta</span>
                    <span className="font-medium text-sm sm:text-base">{stockData.beta?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Financial Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Debt to Equity</span>
                    <span className="font-medium text-sm sm:text-base">{stockData.debt_to_equity?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Dividend Rate</span>
                    <span className="font-medium text-sm sm:text-base">{stockData.dividend_rate || 0}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Company Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Employees</span>
                    <span className="font-medium text-sm sm:text-base">{stockData.employees?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}