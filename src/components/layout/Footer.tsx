import { Link } from 'react-router-dom'
import { STUDIO_CONFIG } from '@/data/studioInfo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-[#E9E5DC] bg-[#EFECE3] text-[#53554D] mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        {/* Col 1: Studio info (2 cols wide on desktop) */}
        <div className="space-y-4 lg:col-span-2">
          <Link
            to="/"
            className="font-serif text-2xl tracking-tight text-[#20211E] flex items-baseline gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E] rounded-sm"
          >
            <span className="font-normal">{STUDIO_CONFIG.studioName.split(' ')[0]}</span>
            <span className="font-sans text-[11px] tracking-[0.22em] uppercase text-[#797C72] font-medium">
              {STUDIO_CONFIG.studioName.split(' ')[1] || 'Studio'}
            </span>
          </Link>
          <p className="font-sans text-sm leading-relaxed text-[#53554D] max-w-sm font-light">
            An architectural practice and digital design archive grounded in warm ivory, raw stone, tectonic timber framing, and curated 3D scene files.
          </p>
          <div className="pt-2 text-xs text-[#797C72] font-sans">
            <span className="block font-medium text-[#20211E]">Inquiries &amp; Commissions</span>
            <a
              href={`mailto:${STUDIO_CONFIG.inquiriesEmail}`}
              className="text-[#53554D] hover:text-[#20211E] transition-colors underline underline-offset-4"
            >
              {STUDIO_CONFIG.inquiriesEmail}
            </a>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#20211E]">
            Navigation
          </p>
          <ul className="space-y-2 text-sm font-sans">
            <li>
              <Link to="/" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                Studio
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                Digital Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Digital Marketplace */}
        <div className="space-y-3">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#20211E]">
            Digital Assets
          </p>
          <ul className="space-y-2 text-sm font-sans">
            <li>
              <Link to="/shop" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                3D Scene Files
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                PBR Material Packs
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                HDRI Sky Presets
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                Cart &amp; Licensing
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Studios & Social */}
        <div className="space-y-4 text-sm font-sans">
          <div className="space-y-2">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#20211E]">
              Studio Locations
            </p>
            <p className="text-xs text-[#53554D] leading-relaxed">
              {STUDIO_CONFIG.address.city}, {STUDIO_CONFIG.address.country}
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#20211E]">
              Archive &amp; Social
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#53554D] hover:text-[#20211E] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#53554D] hover:text-[#20211E] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#53554D] hover:text-[#20211E] transition-colors"
                >
                  Behance
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar with legal placeholders & copyright */}
      <div className="border-t border-[#E9E5DC] py-6 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#797C72] font-sans">
        <p>&copy; {currentYear} Tangent Studio Architecture &amp; Spatial Systems. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#20211E] cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-[#20211E] cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-[#20211E] cursor-pointer transition-colors">Commercial License</span>
        </div>
      </div>
    </footer>
  )
}
