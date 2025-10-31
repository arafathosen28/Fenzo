import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Providers from '@/components/Providers'
import { MessageCircle, Facebook } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fenzo — Premium Clothing',
  description: 'Fenzo — premium glassy fashion storefront.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col relative">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
              {children}
            </main>
            <Footer />
            
            {/* Floating Social Icons */}
            <div className="floating-social">
              <a 
                href="https://wa.me/your-number" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon group"
                aria-label="WhatsApp"
              >
                <MessageCircle 
                  className="w-6 h-6 text-white transition-transform group-hover:scale-110" 
                />
              </a>
              <a 
                href="https://facebook.com/your-page" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon group"
                aria-label="Facebook"
              >
                <Facebook 
                  className="w-6 h-6 text-white transition-transform group-hover:scale-110" 
                />
              </a>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
