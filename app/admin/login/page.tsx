'use client'
import { useState } from 'react'
import { login } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    try {
      await login(email, password)
      router.push('/admin/products')
    } catch (e: any) {
      alert('Login failed: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass rounded-2xl p-6 max-w-sm mx-auto mt-10 text-center">
      <h1 className="text-2xl mb-4 font-semibold">Admin Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="glass w-full p-3 mb-3 rounded-xl"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="glass w-full p-3 mb-3 rounded-xl"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading} className="btn-glass w-full">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  )
}