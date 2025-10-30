'use client'
import { useEffect, useState } from 'react'

export default function AdminHome() {
  const [stats, setStats] = useState<{products: number, orders: number}>({ products: 0, orders: 0 })

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, oRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/orders')
        ])
        const [p, o] = await Promise.all([pRes.json(), oRes.json()])
        setStats({ products: p.length || 0, orders: o.length || 0 })
      } catch {
        console.warn('Failed to load dashboard stats')
      }
    }
    load()
  }, [])

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xl mb-4 font-semibold">Admin Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-xl text-center">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>
      </div>
    </div>
  )
}
