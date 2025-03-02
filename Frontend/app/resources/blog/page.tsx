'use client'

import { LayoutWrapper } from '../../components/layout-wrapper'
import { CalendarDays, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Market Trends: A Beginner's Guide",
    excerpt: "Learn the basics of market trend analysis and how to identify key patterns in stock movements.",
    date: "2024-03-15",
    category: "Education"
  },
  {
    id: 2,
    title: "Technical Analysis vs Fundamental Analysis",
    excerpt: "A comprehensive comparison of two major investment analysis approaches.",
    date: "2024-03-12",
    category: "Analysis"
  },
  {
    id: 3,
    title: "Top 5 Investment Strategies for 2024",
    excerpt: "Discover the most effective investment strategies that are trending this year.",
    date: "2024-03-10",
    category: "Strategy"
  },
  // Add more blog posts as needed
]

export default function BlogPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              StockPro Blog
            </h1>
            <p className="text-lg text-gray-600">
              Insights and analysis from our investment experts
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center ml-4">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/resources/blog/${post.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Read more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
} 