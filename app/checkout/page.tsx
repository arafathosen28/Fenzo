'use client'
import { useCartStore } from '@/lib/cartStore'
import { useState } from 'react'
import { createOrder } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, clear } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<'bkash'|'nagad'|'cod'>('cod')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', contact1: '', contact2: '',
    city: '', upazilla: '', postOffice: '', postCode: ''
  })

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const res = await createOrder({ items, paymentMethod, customer: form })
      // Redirect to WhatsApp
      window.location.href = res.waUrl
      clear()
    } catch (e:any) {
      alert(e.message || 'Order failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 glass rounded-2xl p-6">
        <h1 className="text-2xl mb-4">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="glass rounded-xl p-3" placeholder="Customer Name*" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <input className="glass rounded-xl p-3" placeholder="Contact 1*" value={form.contact1} onChange={e=>setForm({...form, contact1:e.target.value})}/>
          <input className="glass rounded-xl p-3" placeholder="Contact 2 (optional)" value={form.contact2} onChange={e=>setForm({...form, contact2:e.target.value})}/>
          <input className="glass rounded-xl p-3" placeholder="City*" value={form.city} onChange={e=>setForm({...form, city:e.target.value})}/>
          <input className="glass rounded-xl p-3" placeholder="Upazilla*" value={form.upazilla} onChange={e=>setForm({...form, upazilla:e.target.value})}/>
          <input className="glass rounded-xl p-3" placeholder="Post Office*" value={form.postOffice} onChange={e=>setForm({...form, postOffice:e.target.value})}/>
          <input className="glass rounded-xl p-3" placeholder="Post Code*" value={form.postCode} onChange={e=>setForm({...form, postCode:e.target.value})}/>
        </div>

        <div className="mt-6">
          <div className="font-semibold mb-2">Payment Method</div>
          <div className="flex gap-3">
            <button onClick={()=>setPaymentMethod('cod')} className={`btn-glass ${paymentMethod==='cod'?'ring-2 ring-accent':''}`}>Cash on Delivery</button>
            <button onClick={()=>setPaymentMethod('bkash')} className={`btn-glass ${paymentMethod==='bkash'?'ring-2 ring-accent':''}`}>bKash</button>
            <button onClick={()=>setPaymentMethod('nagad')} className={`btn-glass ${paymentMethod==='nagad'?'ring-2 ring-accent':''}`}>Nagad</button>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl mb-3">Order Summary</h2>
        <div className="space-y-2">
          {items.map((it, idx) => (
            <div key={idx} className="flex justify-between">
              <div>{it.product.name} ({it.size}/{it.color}) x {it.qty}</div>
              <div>৳{(it.product.offerPrice ?? it.product.price) * it.qty}</div>
            </div>
          ))}
        </div>
        <button className="btn-glass w-full mt-4" disabled={loading || items.length===0} onClick={handlePlaceOrder}>
          {loading?'Placing...':'Place Order (WhatsApp)'}
        </button>
        <p className="text-xs text-white/60 mt-2">আপনার অর্ডার ডিটেইলস WhatsApp-এ পাঠানো হবে।</p>
      </div>
    </div>
  )
}
