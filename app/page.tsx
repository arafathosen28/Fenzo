'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getFeaturedProducts } from '@/lib/utils'
import { ProductCard } from '@/components/ProductCard'

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured'],
    queryFn: getFeaturedProducts
  })

  return (
    <div>
      <section className="glass rounded-2xl p-6 mb-8">
        <h1 className="text-3xl font-semibold">Fenzo — প্রিমিয়াম কালেকশন</h1>
        <p className="text-white/70 mt-2">গ্লাসি লুক, এ্যালিগ্যান্ট স্টাইল।</p>
        <div className="mt-4 flex gap-3">
          <Link href="#catalog" className="btn-glass">Browse Now</Link>
          <Link href="/cart" className="btn-glass">কার্ট দেখুন</Link>
        </div>
      </section>

      <section id="catalog">
        <h2 className="text-2xl mb-4">Featured Products</h2>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
