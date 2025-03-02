'use client'

import { LayoutWrapper } from '../../components/layout-wrapper'

export default function DocumentationPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Documentation
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Everything you need to know about using StockPro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Getting Started */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h2>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Quick Start Guide</a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Account Setup</a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Basic Navigation</a>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Stock Analysis Tools</a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Portfolio Management</a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Watchlists</a>
                </li>
              </ul>
            </div>

            {/* API Documentation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">API Documentation</h2>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">API Overview</a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Authentication</a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Endpoints</a>
                </li>
              </ul>
            </div>

            {/* Troubleshooting */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Common Issues</a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">FAQs</a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:text-green-700">Error Messages</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
} 