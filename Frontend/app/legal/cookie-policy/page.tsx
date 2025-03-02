'use client'

import { LayoutWrapper } from '../../components/layout-wrapper'

export default function CookiePolicyPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: March 2024</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are placed on your device when you visit our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Understand how you use our website</li>
                  <li>Improve your experience</li>
                  <li>Provide personalized content</li>
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