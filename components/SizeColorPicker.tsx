'use client'
import { useState } from 'react'

export function SizeColorPicker({ sizes = [], colors = [] as string[] }) {
  const [size, setSize] = useState(sizes[0])
  const [color, setColor] = useState(colors[0])

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm mb-1 text-white/80">Size</div>
        <div className="flex gap-2 flex-wrap">
          {sizes.map(s => (
            <button key={s} onClick={()=>setSize(s)} className={`btn-glass text-sm ${size===s?'ring-2 ring-accent':''}`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm mb-1 text-white/80">Color</div>
        <div className="flex gap-2 flex-wrap">
          {colors.map(c => (
            <button key={c} onClick={()=>setColor(c)} className={`btn-glass text-sm ${color===c?'ring-2 ring-accent':''}`}>
              <span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{ backgroundColor: c }} />
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
