import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/context'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { HoverUnderline } from '@/components/motion'

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

  const [isScrolled, setIsScrolled] = useState(false)

  // Track window scroll for transparent-to-solid navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // On homepage at the top, blend with the cinematic dark hero
  const isOverDarkHero = location.pathname === '/' && !isScrolled

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isOverDarkHero
          ? 'bg-[#151614]/85 text-white border-b border-white/10 backdrop-blur-md shadow-lg'
          : 'bg-[#F6F4EF]/95 text-[#20211E] border-b border-[#E9E5DC]/80 backdrop-blur-md shadow-editorial',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Editable studio logo / wordmark */}
        <Link
          to="/"
          className={cn(
            'font-serif text-2xl tracking-tight transition-colors flex items-baseline gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E] rounded-sm py-1',
            isOverDarkHero ? 'text-white hover:text-[#D3CDC0]' : 'text-[#20211E] hover:text-[#777B60]',
          )}
          aria-label="Tangent Studio Home"
        >
          <span className="font-normal">Tangent</span>
          <span
            className={cn(
              'font-sans text-[11px] tracking-[0.22em] uppercase font-medium',
              isOverDarkHero ? 'text-[#D3CDC0]' : 'text-[#797C72]',
            )}
          >
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
                  'font-sans text-xs uppercase tracking-[0.16em] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current rounded-sm',
                  isOverDarkHero
                    ? isActive
                      ? 'text-white font-medium'
                      : 'text-[#D3CDC0]/80 hover:text-white'
                    : isActive
                      ? 'text-[#20211E] font-medium'
                      : 'text-[#53554D] hover:text-[#20211E]',
                )
              }
            >
              {({ isActive }) => (
                <HoverUnderline
                  active={isActive}
                  lineColor={isOverDarkHero ? 'bg-white' : 'bg-[#20211E]'}
                >
                  {link.name}
                </HoverUnderline>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right actions: Cart & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            aria-label={`Shopping bag with ${summary.itemCount} items`}
            className={cn(
              'relative p-2.5 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2',
              isOverDarkHero
                ? 'text-white hover:bg-white/10 focus-visible:ring-white'
                : 'text-[#20211E] hover:text-[#777B60] hover:bg-[#E9E5DC]/50 focus-visible:ring-[#20211E]',
            )}
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence mode="wait">
              {summary.itemCount > 0 && (
                <motion.span
                  key={summary.itemCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className={cn(
                    'absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold font-mono',
                    isOverDarkHero
                      ? 'bg-white text-[#20211E]'
                      : 'bg-[#20211E] text-[#F6F4EF]',
                  )}
                >
                  {summary.itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              'md:hidden p-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2',
              isOverDarkHero
                ? 'text-white hover:bg-white/10 focus-visible:ring-white'
                : 'text-[#20211E] hover:text-[#777B60] focus-visible:ring-[#20211E]',
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Keyboard-accessible Mobile Menu Drawer with Smooth Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-b border-[#E9E5DC] bg-[#F6F4EF] px-6 py-8 flex flex-col gap-5 shadow-editorial overflow-hidden"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
