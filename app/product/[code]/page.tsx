'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { getProductByCode } from '@/lib/utils'
import { SizeColorPicker } from '@/components/SizeColorPicker'
import { QuantitySelector } from '@/components/QuantitySelector'
import { useCartStore } from '@/lib/cartStore'
import Link from 'next/link'

export default function ProductDetailPage() {
  const { code } = useParams<{ code: string }>()
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', code],
    queryFn: () => getProductByCode(code)
  })
  const addItem = useCartStore(s => s.addItem)

  if (isLoading || !product) return <div className="glass rounded-2xl p-6">Loading...</div>

  const [first] = product.images ?? []
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-4">
        <div className="aspect-square relative overflow-hidden rounded-xl">
          <Image src={first || '/placeholder.webp'} alt={product.name} fill className="object-cover" />
        </div>
        {/* Simple carousel thumbnails */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {product.images?.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={src} alt={product.name + i} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-white/70">Code: {product.code}</p>

        <div className="mt-3 flex items-center gap-3">
          {product.offerPrice ? (
            <>
              <span className="text-3xl font-bold">৳{product.offerPrice}</span>
              <span className="line-through text-white/60">৳{product.price}</span>
              <span className="ml-2 text-xs bg-accent/30 text-accent px-2 py-1 rounded-full">Offer</span>
            </>
          ) : (
            <span className="text-3xl font-bold">৳{product.price}</span>
          )}
        </div>

        <div className="mt-4 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: product.description || '' }} />

        <div className="mt-4">
          <SizeColorPicker sizes={product.sizes} colors={product.colors} />
        </div>

        <div className="mt-4">
          <QuantitySelector />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            className="btn-glass"
            onClick={() => addItem({ product, size: product.sizes?.[0], color: product.colors?.[0], qty: 1 })}>
            Add to Cart
          </button>
          <Link className="btn-glass" href="/checkout?buyNow=1&code={product.code}">Order Now</Link>
        </div>
      </div>
    </div>
  )
}
