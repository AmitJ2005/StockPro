'use client'

import { LayoutWrapper } from '../../components/layout-wrapper'

export default function PrivacyPolicyPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: March 2024</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Account information (username, password)</li>
                  <li>Financial information (investment preferences, portfolio data)</li>
                  <li>Usage data (how you interact with our services)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Personalize your experience</li>
                  <li>Improve our platform</li>
                  <li>Communicate with you</li>
                  <li>Ensure platform security</li>
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