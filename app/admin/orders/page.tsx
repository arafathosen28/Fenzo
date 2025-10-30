'use client'
import { useQuery } from '@tanstack/react-query'
import { getRecentOrders } from '@/lib/utils'
import { AdminOrderTable } from '@/components/AdminOrderTable'

export default function AdminOrdersPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-orders'], queryFn: getRecentOrders })
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xl mb-4">Orders</h2>
      {isLoading ? <div>Loading...</div> : <AdminOrderTable orders={data || []} />}
    </div>
  )
}
