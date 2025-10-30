// app/admin/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { AdminOrderTable } from '@/components/AdminOrderTable'
import { getRecentOrders } from '@/lib/utils'

export default function AdminPage() {
  const [ok, setOk] = useState(false)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return setOk(false)
      const t = await getIdTokenResult(u)
      const isAdmin = !!t.claims.admin
      setOk(isAdmin)
      if (isAdmin) setOrders(await getRecentOrders())
    })
    return () => unsub()
  }, [])

  if (!ok) return <div className="text-center">Admins only</div>
  return (
    <div>
      <h1 className="text-xl mb-4">Orders</h1>
      <AdminOrderTable orders={orders} />
    </div>
  )
}
