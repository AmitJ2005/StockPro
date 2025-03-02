'use client'

import { LayoutWrapper } from '../../components/layout-wrapper'

export default function TermsOfServicePage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: March 2024</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using StockPro, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Responsibilities</h2>
                <p className="text-gray-600 mb-4">
                  As a user of StockPro, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not misuse our services</li>
                </ul>
              </section>

              {/* Add more sections as needed */}
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
} 