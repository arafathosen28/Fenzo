'use client'
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-semibold">Fenzo</Link>
      <nav className="flex items-center gap-4">
        <Link href="/" className="hover:opacity-80">Home</Link>
        <Link href="/cart" className="hover:opacity-80">Cart</Link>
        <Link href="/admin" className="hover:opacity-80">Admin</Link>
      </nav>
    </header>
  )
}
