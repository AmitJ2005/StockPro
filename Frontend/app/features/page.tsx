'use client'

import { LayoutWrapper } from '../components/layout-wrapper'
import { TrendingUp, PieChart, Zap, BarChart2, LineChart, Share2 } from 'lucide-react'

export default function FeaturesPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Smart Investing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the tools and features that make StockPro the perfect platform for your investment journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <h3 className="ml-3 text-xl font-semibold">Real-time Analytics</h3>
              </div>
              <p className="text-gray-600">
                Get instant access to real-time market data, price movements, and trading volumes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <PieChart className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-xl font-semibold">Portfolio Management</h3>
              </div>
              <p className="text-gray-600">
                Track and manage your investments with advanced portfolio tools and analytics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-yellow-600" />
                <h3 className="ml-3 text-xl font-semibold">AI Predictions</h3>
              </div>
              <p className="text-gray-600">
                Leverage machine learning algorithms for stock performance forecasting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <BarChart2 className="h-8 w-8 text-purple-600" />
                <h3 className="ml-3 text-xl font-semibold">Technical Analysis</h3>
              </div>
              <p className="text-gray-600">
                Access comprehensive technical indicators and chart patterns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <LineChart className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-xl font-semibold">Market Insights</h3>
              </div>
              <p className="text-gray-600">
                Get detailed market analysis and expert insights for informed decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Share2 className="h-8 w-8 text-red-600" />
                <h3 className="ml-3 text-xl font-semibold">Social Trading</h3>
              </div>
              <p className="text-gray-600">
                Connect with other investors and share trading strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
} 