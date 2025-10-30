'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'

export function ProductCard({ product }: { product: Product }) {
  const price = product.offerPrice ?? product.price
  return (
    <Link href={`/product/${product.code}`} className="glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
      <div className="relative aspect-[4/5]">
        <Image src={product.images?.[0] || '/placeholder.webp'} alt={product.name} fill className="object-cover" />
        {product.offerPrice && (
          <span className="absolute top-2 left-2 bg-accent/30 text-accent text-xs px-2 py-1 rounded-full">Offer</span>
        )}
      </div>
      <div className="p-3">
        <div className="font-semibold">{product.name}</div>
        <div className="text-white/60 text-sm">Code: {product.code}</div>
        <div className="mt-1">
          {product.offerPrice ? (
            <>
              <span className="font-bold">৳{price}</span>
              <span className="text-white/60 line-through ml-2">৳{product.price}</span>
            </>
          ) : <span className="font-bold">৳{price}</span>}
        </div>
      </div>
    </Link>
  )
}
