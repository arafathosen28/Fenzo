'use client'
import Link from 'next/link'
import { useCartStore } from '@/lib/cartStore'

export default function CartPage() {
  const { items, removeItem, total } = useCartStore()

  return (
    <div className="glass rounded-2xl p-6">
      <h1 className="text-2xl mb-4">কার্ট</h1>
      {items.length === 0 ? (
        <p>কার্ট খালি। <Link className="link" href="/">পণ্য দেখুন</Link></p>
      ) : (
        <div className="space-y-4">
          {items.map((it, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <div className="font-medium">{it.product.name}</div>
                <div className="text-white/70 text-sm">Code: {it.product.code} | Size: {it.size} | Color: {it.color}</div>
              </div>
              <div className="flex items-center gap-4">
                <div>৳{(it.product.offerPrice ?? it.product.price) * it.qty}</div>
                <button className="text-white/60 hover:text-white" onClick={() => removeItem(idx)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-4">
            <div className="font-semibold">মোট</div>
            <div className="font-bold">৳{total()}</div>
          </div>
          <div className="flex justify-end">
            <Link href="/checkout" className="btn-glass">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
