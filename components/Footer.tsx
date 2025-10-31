import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-10">
      <div className="container mx-auto px-4">
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="font-semibold text-lg">Fenzo</div>
              <p className="text-white/70">Premium Clothing</p>
            </div>
            <div>
              <div className="font-semibold mb-2">Legal</div>
              <p className="text-white/60 text-sm">© {new Date().getFullYear()} Fenzo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
