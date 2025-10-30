'use client'
import { useState } from 'react'
import { login } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { getAuth } from 'firebase/auth'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    try {
      await login(email, password)
      const idToken = await getAuth().currentUser?.getIdToken()
      await fetch('/api/auth/sessionLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })
      router.push('/admin/products')
    } catch (e) {
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass max-w-sm mx-auto p-6 rounded-2xl">
      <h2 className="text-xl mb-4">Admin Login</h2>
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
