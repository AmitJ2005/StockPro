'use client'

import { LayoutWrapper } from '../components/layout-wrapper'

export default function AboutPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              About StockPro
            </h1>
            <p className="text-lg text-gray-600">
              Empowering investors with cutting-edge technology and data-driven insights.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="mb-6">
                At StockPro, we believe that everyone should have access to professional-grade investment tools and analytics. 
                Our mission is to democratize financial markets by providing retail investors with the same powerful tools 
                and insights that were traditionally available only to institutional investors.
              </p>

              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="mb-6">
                Founded in 2023, StockPro emerged from a simple observation: retail investors needed better tools to make 
                informed investment decisions. What started as a simple stock tracking tool has evolved into a comprehensive 
                platform that serves thousands of investors across India.
              </p>

              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Transparency in everything we do</li>
                <li className="mb-2">Continuous innovation and improvement</li>
                <li className="mb-2">User-centric approach to product development</li>
                <li className="mb-2">Commitment to data security and privacy</li>
                <li>Educational empowerment of our users</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
} 