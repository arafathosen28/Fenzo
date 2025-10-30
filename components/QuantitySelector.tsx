'use client'
import { useState } from 'react'

export function QuantitySelector() {
  const [qty, setQty] = useState(1)
  return (
    <div className="flex items-center gap-2">
      <button className="btn-glass" onClick={()=>setQty(Math.max(1, qty-1))}>-</button>
      <div className="px-4">{qty}</div>
      <button className="btn-glass" onClick={()=>setQty(qty+1)}>+</button>
    </div>
  )
}
