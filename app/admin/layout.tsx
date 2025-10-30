export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6">
      <div className="glass rounded-2xl p-4">
        <h1 className="text-2xl">Fenzo Admin</h1>
        <p className="text-white/70">Products, Orders, and Settings</p>
      </div>
      {children}
    </div>
  )
}
