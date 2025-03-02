'use client'

import { LayoutWrapper } from '../../components/layout-wrapper'

export default function DisclaimerPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Disclaimer</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: March 2024</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Investment Risks</h2>
                <p className="text-gray-600 mb-4">
                  All investment strategies and investments involve risk of loss. Nothing contained in this website should be construed as investment advice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. No Financial Advice</h2>
                <p className="text-gray-600 mb-4">
                  The information provided on StockPro is for general informational purposes only. It should not be considered as financial advice.
                </p>
              </section>

              {/* Add more sections as needed */}
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
} 