import { Outlet } from 'react-router-dom'
import { CartProvider } from '@/context'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { PageTransition } from '@/components/motion'

export function RootLayout() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F4EF] text-[#20211E] selection:bg-[#20211E] selection:text-[#F6F4EF]">
        {/* WCAG 2.1 Bypass Block: Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#20211E] focus:text-[#F6F4EF] focus:outline-none focus:ring-2 focus:ring-[#777B60] focus:shadow-lg font-mono text-xs uppercase tracking-wider transition-all"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
