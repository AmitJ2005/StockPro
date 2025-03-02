'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import debounce from 'lodash/debounce'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface StockResult {
  name: string
  symbol: string
}

export default function StockSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<StockResult[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const searchStocks = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/api/search/?query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error searching stocks:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)
      debounce(() => searchStocks(value), 300)()
    },
    []
  )

  const handleStockClick = (stock: StockResult) => {
    router.push(`/stock/${stock.symbol}`)
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto relative z-20" ref={searchRef}>
      <div className="flex gap-2 w-full">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search stocks..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            className="flex-1 h-12 text-lg px-4 w-full"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 py-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[200px] overflow-y-auto"
          >
            <ul className="divide-y divide-gray-100">
              {results.map((stock) => (
                <li key={stock.symbol}>
                  <button
                    onClick={() => handleStockClick(stock)}
                    className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="font-medium text-gray-900 text-sm truncate">{stock.name}</h3>
                      <span className="inline-block text-xs text-gray-500 mt-0.5">
                        {stock.symbol}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="ml-2 whitespace-nowrap text-green-600 hover:text-green-700 hover:border-green-600 text-xs py-1 hidden sm:inline-flex"
                    >
                      View Details
                    </Button>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && query && results.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 p-4 text-center text-gray-500 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            No stocks found matching &quot;{query}&quot;
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}