'use client'
import { useState } from 'react'
import { addOrUpdateProduct } from '@/lib/utils'

export function AdminProductForm() {
  const [form, setForm] = useState<any>({ name:'', code:'', price:0, offerPrice:null, sizes:'S,M,L', colors:'#ffffff,#000000', stock:10, images:'' })
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    try {
      const payload = {
        ...form,
        sizes: String(form.sizes).split(',').map((s:string)=>s.trim()),
        colors: String(form.colors).split(',').map((c:string)=>c.trim()),
        images: String(form.images).split(',').map((u:string)=>u.trim())
      }
      await addOrUpdateProduct(payload)
      alert('Saved')
    } catch (e:any) {
      alert(e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-3">
      <input className="glass rounded-xl p-3 w-full" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
      <input className="glass rounded-xl p-3 w-full" placeholder="Code (unique)" value={form.code} onChange={e=>setForm({...form, code:e.target.value})} />
      <div className="grid grid-cols-2 gap-3">
        <input className="glass rounded-xl p-3 w-full" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} />
        <input className="glass rounded-xl p-3 w-full" placeholder="Offer Price (optional)" type="number" value={form.offerPrice||''} onChange={e=>setForm({...form, offerPrice:e.target.value?Number(e.target.value):null})} />
      </div>
      <input className="glass rounded-xl p-3 w-full" placeholder="Sizes (comma separated)" value={form.sizes} onChange={e=>setForm({...form, sizes:e.target.value})} />
      <input className="glass rounded-xl p-3 w-full" placeholder="Colors (comma separated CSS colors)" value={form.colors} onChange={e=>setForm({...form, colors:e.target.value})} />
      <input className="glass rounded-xl p-3 w-full" placeholder="Image URLs (comma separated)" value={form.images} onChange={e=>setForm({...form, images:e.target.value})} />
      <input className="glass rounded-xl p-3 w-full" placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:Number(e.target.value)})} />
      <textarea className="glass rounded-xl p-3 w-full" placeholder="Description (HTML allowed)" value={form.description||''} onChange={e=>setForm({...form, description:e.target.value})} />
      <button className="btn-glass" onClick={submit} disabled={loading}>{loading?'Saving...':'Save'}</button>
    </div>
  )
}
