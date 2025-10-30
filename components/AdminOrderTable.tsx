'use client'
export function AdminOrderTable({ orders }: { orders: any[] }) {
  return (
    <div className="overflow-auto max-h-[70vh] pr-2">
      <table className="w-full text-sm">
        <thead className="text-left sticky top-0 bg-black/40 backdrop-blur">
          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Status</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-white/10">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.customer?.name} ({o.customer?.contact1})</td>
              <td className="p-2 uppercase">{o.paymentMethod}</td>
              <td className="p-2 capitalize">{o.status}</td>
              <td className="p-2">৳{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
