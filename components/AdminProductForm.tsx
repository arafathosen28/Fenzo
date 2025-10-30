'use client'
import { useEffect, useState } from 'react'

type ProductForm = {
  id?: string
  name: string
  code: string
  price: number
  offerPrice?: number | null
  sizes: string[]
  colors: string[]
  stock: number
  images: string[]
  description: string
}

export function AdminProductForm({ initial }: { initial?: Partial<ProductForm> }) {
  const [form, setForm] = useState<ProductForm>({
    name: '', code: '', price: 0, offerPrice: null,
    sizes: ['S','M','L'], colors: ['#ffffff','#000000'],
    stock: 10, images: [''], description: '',
    ...(initial as any)
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initial) {
      setForm(prev => ({
        ...prev,
        ...initial,
        images: (initial.images && initial.images.length ? initial.images : ['']),
      }) as ProductForm)
    }
  }, [initial])

  const setField = (k: keyof ProductForm, v: any) => setForm({ ...form, [k]: v })

  const submit = async () => {
    setLoading(true)
    try {
      const payload = { ...form, images: form.images.filter(Boolean) }
      const isEdit = Boolean(form.id)
      const url = isEdit ? `/api/admin/products/${form.id}` : '/api/admin/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Save failed')
      alert('Saved!')
    } catch (e:any) {
      alert(e.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  const addImage = () => setForm({ ...form, images: [...form.images, ''] })
  const removeImage = (idx: number) => setForm({ ...form, images: form.images.filter((_,i)=>i!==idx) })
  const updateImage = (idx: number, val: string) => {
    const arr = [...form.images]; arr[idx] = val; setForm({ ...form, images: arr })
  }

  const parseCSV = (s: string) => s.split(',').map(t=>t.trim()).filter(Boolean)

  return (
    <div className="space-y-3">
      <input className="glass rounded-xl p-3 w-full" placeholder="Name" value={form.name}
             onChange={e=>setField('name', e.target.value)} />
      <input className="glass rounded-xl p-3 w-full" placeholder="Code (unique)" value={form.code}
             onChange={e=>setField('code', e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <input className="glass rounded-xl p-3 w-full" placeholder="Price" type="number" value={form.price}
               onChange={e=>setField('price', Number(e.target.value))} />
        <input className="glass rounded-xl p-3 w-full" placeholder="Offer Price (optional)" type="number"
               value={form.offerPrice ?? ''} onChange={e=>setField('offerPrice', e.target.value ? Number(e.target.value) : null)} />
      </div>

      {/* Sizes / Colors as CSV for simplicity */}
      <input className="glass rounded-xl p-3 w-full" placeholder="Sizes (e.g. S,M,L)"
             defaultValue={form.sizes.join(',')} onBlur={e=>setField('sizes', parseCSV(e.target.value))} />
      <input className="glass rounded-xl p-3 w-full" placeholder="Colors HEX (e.g. #ffffff,#000000)"
             defaultValue={form.colors.join(',')} onBlur={e=>setField('colors', parseCSV(e.target.value))} />

      {/* Dynamic image URL inputs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-white/80">Image URLs (postimages.org / imgbb ইত্যাদি থেকে Direct link)</label>
          <button type="button" className="btn-glass px-3 py-1 text-sm" onClick={addImage}>+ Add</button>
        </div>
        {form.images.map((url, idx) => (
          <div key={idx} className="flex gap-2">
            <input className="glass rounded-xl p-3 w-full" placeholder="https://i.postimg.cc/..."
                   value={url} onChange={e=>updateImage(idx, e.target.value)} />
            <button type="button" className="btn-glass px-3" onClick={()=>removeImage(idx)}>-</button>
          </div>
        ))}
      </div>

      <input className="glass rounded-xl p-3 w-full" placeholder="Stock" type="number" value={form.stock}
             onChange={e=>setField('stock', Number(e.target.value))} />
      <textarea className="glass rounded-xl p-3 w-full" placeholder="Description"
                value={form.description} onChange={e=>setField('description', e.target.value)} />

      <button className="btn-glass" onClick={submit} disabled={loading}>
        {loading ? 'Saving...' : (form.id ? 'Update Product' : 'Create Product')}
      </button>
    </div>
  )
}
