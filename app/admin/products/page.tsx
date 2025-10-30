'use client'
import { useEffect, useState } from 'react'
import { AdminProductForm } from '@/components/AdminProductForm'

type Product = {
  id: string
  name: string
  code: string
  price: number
  offerPrice?: number | null
  stock: number
  images?: string[]
}

export default function AdminProductsPage() {
  const [list, setList] = useState<Product[]>([])
  const [editing, setEditing] = useState<Product|undefined>(undefined)

  const load = async () => {
    const res = await fetch('/api/admin/products')
    const data = await res.json()
    setList(data)
  }

  useEffect(() => { load() }, [])

  const onDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setList(prev => prev.filter(p => p.id !== id))
    } else {
      alert('Delete failed')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl mb-4">Products</h2>
        <div className="space-y-3 max-h-[70vh] overflow-auto pr-2">
          {list.map(p => (
            <div key={p.id} className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <div className="font-medium">{p.name} <span className="text-white/60">({p.code})</span></div>
                <div>৳{p.offerPrice ?? p.price}</div>
                <div className="text-xs text-white/60">{p.stock} in stock</div>
              </div>
              <div className="flex gap-2">
                <button className="btn-glass text-sm" onClick={()=>setEditing(p)}>Edit</button>
                <button className="btn-glass text-sm" onClick={()=>onDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl mb-4">{editing ? 'Edit Product' : 'Add Product'}</h2>
        <AdminProductForm initial={editing} />
      </div>
    </div>
  )
}
