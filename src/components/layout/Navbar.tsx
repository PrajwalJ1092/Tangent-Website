import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/context'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Studio', path: '/about' },
  { name: 'Digital Shop', path: '/shop' },
  { name: 'Contact', path: '/contact' },
]

export function Navbar() {
  const { summary } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Close mobile menu on location change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Handle escape key, focus trapping, and focus restoration for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = Array.from(
          menuRef.current.querySelectorAll<HTMLAnchorElement>('a[href]')
        )
        if (focusableElements.length === 0) return

        const firstEl = focusableElements[0]
        const lastEl = focusableElements[focusableElements.length - 1]
        if (!firstEl || !lastEl) return

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault()
            menuButtonRef.current?.focus()
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault()
            menuButtonRef.current?.focus()
          } else if (document.activeElement === menuButtonRef.current) {
            e.preventDefault()
            firstEl.focus()
          }
        }
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      // Focus first link on drawer opening
      requestAnimationFrame(() => {
        const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>('a[href]')
        firstLink?.focus()
      })
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E9E5DC]/80 bg-[#F6F4EF]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Editable studio logo / wordmark */}
        <Link
          to="/"
          className="font-serif text-2xl tracking-tight text-[#20211E] hover:text-[#777B60] transition-colors flex items-baseline gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E] rounded-sm py-1"
          aria-label="Tangent Studio Home"
        >
          <span className="font-normal">Tangent</span>
          <span className="font-sans text-[11px] tracking-[0.22em] uppercase text-[#797C72] font-medium">
            Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                cn(
                  'font-sans text-xs uppercase tracking-[0.16em] transition-colors py-1 border-b border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E] rounded-sm',
                  isActive
                    ? 'text-[#20211E] border-[#20211E] font-medium'
                    : 'text-[#53554D] hover:text-[#20211E]',
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right actions: Cart & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            aria-label={`Shopping bag with ${summary.itemCount} items`}
            className="relative p-2.5 text-[#20211E] hover:text-[#777B60] transition-colors rounded-md hover:bg-[#E9E5DC]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
          >
            <ShoppingBag className="w-5 h-5" />
            {summary.itemCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#20211E] px-1 text-[10px] font-bold text-[#F6F4EF] font-mono">
                {summary.itemCount}
              </span>
            )}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden p-2.5 text-[#20211E] hover:text-[#777B60] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Keyboard-accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden border-b border-[#E9E5DC] bg-[#F6F4EF] px-6 py-8 flex flex-col gap-5 shadow-editorial animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'font-sans text-sm uppercase tracking-[0.18em] py-2.5 transition-colors border-b border-[#E9E5DC]/60 flex items-center justify-between',
                  isActive ? 'text-[#20211E] font-semibold pl-2 border-l-2 border-l-[#20211E]' : 'text-[#53554D]',
                )
              }
            >
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
