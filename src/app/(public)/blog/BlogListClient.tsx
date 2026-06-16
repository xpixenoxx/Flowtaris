'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Link } from '@/components/ui/PageTransition'
import { Search } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  image: string
}

export function BlogListClient({ initialPosts }: { initialPosts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 6 // 6 regular posts per page

  const categories = ['All', 'Engineering', 'Architecture', 'Strategy', 'Security & Compliance']

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0]
  const regularPosts = filteredPosts.slice(1)

  // Paginate regular posts
  const totalPages = Math.ceil(regularPosts.length / limit)
  const paginatedRegularPosts = useMemo(() => {
    const from = (currentPage - 1) * limit
    const to = from + limit
    return regularPosts.slice(from, to)
  }, [regularPosts, currentPage, limit])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  return (
    <>
      {/* Hero & Featured Post */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-32 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              Stay updated with our latest insights
            </h1>
          </div>

          {/* Featured Post (Horizontal 2-Column) */}
          {featuredPost ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-8 bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm">
              <Link href={`/blog/${featuredPost.id}`} className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 block">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500" 
                />
              </Link>
              <div className="p-6 lg:pr-12">
                <span className="inline-block bg-slate-100 text-[#0A1628] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                  {featuredPost.category}
                </span>
                <Link href={`/blog/${featuredPost.id}`}>
                  <h2 className="text-3xl font-bold text-[#0A1628] leading-snug mb-4 hover:text-[#E8A020] transition-colors" style={{ fontFamily: 'var(--font-sora)' }}>
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="text-slate-600 text-lg mb-8 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <Link href={`/blog/${featuredPost.id}`} className="inline-flex items-center text-[#0A1628] font-bold hover:text-[#E8A020] transition-colors group">
                  <span className="border-b-2 border-[#0A1628] group-hover:border-[#E8A020] pb-1 transition-colors">Learn More</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-500">No blog posts found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories & Search */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 gap-6 pb-0">
          {/* Tabs */}
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`pb-4 text-sm font-bold whitespace-nowrap transition-colors border-b-[3px] ${
                  activeCategory === cat 
                    ? 'text-[#0A1628] border-[#0A1628]' 
                    : 'text-slate-500 hover:text-[#0A1628] border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative mb-3 w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Topic" 
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-11 pr-4 py-2.5 w-full md:w-72 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-32">
        {paginatedRegularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedRegularPosts.map((post) => (
              <Link 
                href={`/blog/${post.id}`} 
                key={post.id} 
                className="group flex flex-col bg-[#fafafa] rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 pb-0">
                  <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden bg-slate-200">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#0A1628] mb-3 leading-snug group-hover:text-[#E8A020] transition-colors" style={{ fontFamily: 'var(--font-sora)' }}>
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-slate-600 text-sm line-clamp-2 mt-auto leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          featuredPost && (
            <div className="text-center py-12">
              <p className="text-slate-500">No additional posts found in this category.</p>
            </div>
          )
        )}
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            {currentPage > 1 ? (
              <button 
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-slate-100 text-sm font-semibold text-slate-300 cursor-not-allowed">
                Previous
              </span>
            )}
            
            <span className="text-sm font-semibold text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            
            {currentPage < totalPages ? (
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-slate-100 text-sm font-semibold text-slate-300 cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        )}
      </section>
    </>
  )
}
