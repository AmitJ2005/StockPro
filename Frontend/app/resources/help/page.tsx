'use client'

import { LayoutWrapper } from '../../components/layout-wrapper'
import { HelpCircle, MessageCircle, Book, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HelpCenterPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              How can we help you today?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold ml-2">FAQs</h2>
              </div>
              <p className="text-gray-600 mb-4">Find quick answers to common questions</p>
              <Button variant="outline" className="w-full">View FAQs</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold ml-2">Live Chat</h2>
              </div>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Book className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold ml-2">Guides</h2>
              </div>
              <p className="text-gray-600 mb-4">Step-by-step tutorials and guides</p>
              <Button variant="outline" className="w-full">View Guides</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold ml-2">Email Support</h2>
              </div>
              <p className="text-gray-600 mb-4">Get help via email</p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">Account Setup</h3>
                <p className="text-sm text-gray-600">How to set up and configure your account</p>
              </a>
              <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">Trading Basics</h3>
                <p className="text-sm text-gray-600">Learn the fundamentals of trading</p>
              </a>
              <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">Security</h3>
                <p className="text-sm text-gray-600">Keep your account safe and secure</p>
              </a>
              <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">Billing</h3>
                <p className="text-sm text-gray-600">Manage your subscription and payments</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}