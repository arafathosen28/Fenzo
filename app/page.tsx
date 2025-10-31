'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getFeaturedProducts } from '@/lib/utils'
import { ProductCard } from '@/components/ProductCard'
import { ShoppingBag, Sparkles, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured'],
    queryFn: getFeaturedProducts
  })

  return (
    <div className="space-y-12 animate-fadeInUp">
      {/* Hero Section */}
      <section className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 font-medium">প্রিমিয়াম কালেকশন</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Fenzo
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
            গ্লাসি লুক, এ্যালিগ্যান্ট স্টাইল। অনন্য ডিজাইন এবং সেরা মানের পোশাক।
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="#catalog" className="btn-glass flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Browse Collection</span>
            </Link>
            <Link href="/cart" className="btn-glass flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>কার্ট দেখুন</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="catalog" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
            <p className="text-white/60">আমাদের বাছাই করা সংগ্রহ</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="glass rounded-3xl h-80 shimmer"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((p, index) => (
              <div 
                key={p.id} 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && data && data.length === 0 && (
          <div className="glass rounded-3xl p-12 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <p className="text-xl text-white/60">কোন পণ্য পাওয়া যায়নি</p>
          </div>
        )}
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-3xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">প্রিমিয়াম কোয়ালিটি</h3>
          <p className="text-white/60">সেরা মানের উপকরণ দিয়ে তৈরি</p>
        </div>

        <div className="glass rounded-3xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">ট্রেন্ডি ডিজাইন</h3>
          <p className="text-white/60">সর্বশেষ ফ্যাশন ট্রেন্ড</p>
        </div>

        <div className="glass rounded-3xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <ShoppingBag className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">দ্রুত ডেলিভারি</h3>
          <p className="text-white/60">দ্রুত এবং নিরাপদ পৌঁছানো</p>
        </div>
      </section>
    </div>
  )
}
