import { Link } from 'react-router-dom'
import { STUDIO_CONFIG } from '@/data/studioInfo'
import { ScrollReveal, StaggerGroup, StaggerItem, HoverUnderline } from '@/components/motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-[#E9E5DC] bg-[#EFECE3] text-[#53554D] mt-auto">
      <ScrollReveal variant="fade-in" duration={0.4}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
          <StaggerGroup stagger={0.05} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 text-left">
            {/* Col 1: Studio info (2 cols wide on desktop) */}
            <StaggerItem className="space-y-4 lg:col-span-2">
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
            </StaggerItem>

            {/* Col 2: Navigation */}
            <StaggerItem className="space-y-3">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#20211E]">
                Navigation
              </p>
              <ul className="space-y-2 text-sm font-sans">
                <li>
                  <Link to="/" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">Home</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">Projects</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">Studio</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">Services &amp; Disciplines</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/journal" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">Journal</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">Digital Shop</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">FAQ</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">Contact</HoverUnderline>
                  </Link>
                </li>
              </ul>
            </StaggerItem>

            {/* Col 3: Digital Marketplace */}
            <StaggerItem className="space-y-3">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#20211E]">
                Digital Assets
              </p>
              <ul className="space-y-2 text-sm font-sans">
                <li>
                  <Link to="/shop" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">3D Scene Files</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">PBR Material Packs</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">HDRI Sky Presets</HoverUnderline>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-[#53554D] hover:text-[#20211E] transition-colors">
                    <HoverUnderline lineColor="bg-[#20211E]">Cart &amp; Licensing</HoverUnderline>
                  </Link>
                </li>
              </ul>
            </StaggerItem>

            {/* Col 4: Studios & Social */}
            <StaggerItem className="space-y-4 text-sm font-sans lg:col-span-1">
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
            </StaggerItem>
          </StaggerGroup>
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
      </ScrollReveal>
    </footer>
  )
}
