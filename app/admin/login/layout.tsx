'use client'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/admin/login')
      else {
        setUser(u)
        setLoading(false)
      }
    })
    return () => unsub()
  }, [router])

  if (loading) return <div className="p-6 text-center">Checking authentication...</div>

  return (
    <div className="grid gap-6">
      <div className="glass rounded-2xl p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Fenzo Admin</h1>
          <p className="text-white/70">Products, Orders, and Settings</p>
        </div>
        <button onClick={() => auth.signOut()} className="btn-glass text-sm">Logout</button>
      </div>
      {children}
    </div>
  )
}