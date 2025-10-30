'use client'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/lib/utils'
import { AdminProductForm } from '@/components/AdminProductForm'

export default function AdminProductsPage() {
  const { data } = useQuery({ queryKey: ['admin-products'], queryFn: getAllProducts })

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl mb-4">Products</h2>
        <div className="space-y-3 max-h-[70vh] overflow-auto pr-2">
          {data?.map(p => (
            <div key={p.id} className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-white/60 text-sm">Code: {p.code}</div>
              </div>
              <div className="text-right">
                <div>৳{p.offerPrice ?? p.price}</div>
                <div className="text-xs text-white/60">{p.stock} in stock</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl mb-4">Add / Edit</h2>
        <AdminProductForm />
      </div>
    </div>
  )
}
