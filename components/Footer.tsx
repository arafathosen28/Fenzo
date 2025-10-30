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
              <div className="font-semibold mb-2">Contact</div>
              <ul className="space-y-1">
                <li><a className="link" href="https://wa.me/8801983268976" target="_blank">WhatsApp: +8801983268976</a></li>
                <li><a className="link" href="https://wa.me/880718585937" target="_blank">WhatsApp: +880718585937</a></li>
                <li><a className="link" href="https://facebook.com/fenzo5" target="_blank">Facebook: fenzo5</a></li>
              </ul>
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
