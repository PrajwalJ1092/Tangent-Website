import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Check,
  Plus,
} from 'lucide-react'
import { useState } from 'react'
import {
  Container,
  SectionHeading,
  Button,
  Badge,
  TextLink,
} from '@/components/ui'
import { ARCHITECTURAL_ASSETS } from '@/data/assets'
import { DEMO_PROJECTS, DEMO_PRODUCTS } from '@/data/mockData'
import { formatCategoryLabel, formatPaiseToInr } from '@/lib/formatters'
import { useCart } from '@/context'
import { CinematicHero } from '@/components/home/CinematicHero'
import { PinnedStorytelling } from '@/components/home/PinnedStorytelling'
import { InteractiveProjectIndex } from '@/components/home/InteractiveProjectIndex'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { JournalSection } from '@/components/home/JournalSection'
import {
  ScrollReveal,
  MaskedText,
  ImageReveal,
  StaggerGroup,
  StaggerItem,
  ParallaxWrapper,
  SectionTransition,
  CardHover,
  HoverUnderline,
} from '@/components/motion'

export function HomePage() {
  const { addItem } = useCart()
  const [addedProductId, setAddedProductId] = useState<string | null>(null)

  const handleProductAdd = (e: React.MouseEvent, product: typeof DEMO_PRODUCTS[0]) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 'standard')
    setAddedProductId(product.id)
    setTimeout(() => setAddedProductId(null), 1600)
  }

  return (
    <div className="space-y-24 sm:space-y-36 pb-24">
      {/* =========================================================================
          SECTION 1 — CINEMATIC HERO
          Full-viewport architectural canvas, parallax scale drift, masked typography,
          monograph badge, and subtle animated scroll line.
         ========================================================================= */}
      <CinematicHero />

      {/* Subtle architectural hairline divider into Section 2 */}
      <SectionTransition
        variant="hairline"
        label="Section 02 · Studio Monograph Intent"
        coordinate="Latitude 47.3769° N · Zurich Atelier"
        className="-mt-12 sm:-mt-20"
      />

      {/* =========================================================================
          SECTION 2 — STUDIO STATEMENT
          Spacious editorial section with large philosophical statement, generous
          whitespace, architectural annotations, and tactile material specimen.
         ========================================================================= */}
      <section className="py-12 sm:py-20 border-b border-[#E9E5DC]">
        <Container>
          <div className="space-y-12 sm:space-y-16">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Left: Architectural Philosophy Text with Masked Headline & Stagger */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <ScrollReveal variant="fade-up">
                  <Badge variant="accent">Studio Philosophy</Badge>
                </ScrollReveal>

                <MaskedText
                  as="h2"
                  className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#20211E] tracking-tight leading-[1.08] text-balance"
                >
                  We believe architecture is the quiet dialogue between human perception and geological permanence.
                </MaskedText>

                <StaggerGroup stagger={0.12} className="space-y-5 font-sans text-sm sm:text-base text-[#53554D] leading-relaxed font-light max-w-2xl">
                  <StaggerItem>
                    <p>
                      Every commission begins with an exacting topographical audit and solar azimuth study. We eschew superfluous ornamentation in pursuit of volumetric purity, authentic tactile surfaces, and climatic resilience.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
                      Our built projects range from single-family sanctuaries rooted in remote coastal bluffs to civic exhibition spaces engineered with post-tensioned concrete cantilevers.
                    </p>
                  </StaggerItem>
                </StaggerGroup>

                <ScrollReveal variant="fade-up" delay={0.25} className="pt-4 flex flex-wrap items-center gap-6">
                  <TextLink to="/about" showArrow className="text-sm font-mono uppercase tracking-wider">
                    Read more about our studio methodology
                  </TextLink>
                  <span className="text-[#E9E5DC] hidden sm:inline">|</span>
                  <Link
                    to="/contact"
                    className="text-xs font-mono uppercase tracking-wider text-[#797C72] hover:text-[#20211E] transition-colors"
                  >
                    Initiate Project Consultation →
                  </Link>
                </ScrollReveal>
              </div>

              {/* Right: Supporting Architectural Image Frame with Parallax & Clip Reveal */}
              <div className="lg:col-span-5 space-y-3">
                <ParallaxWrapper offset={24}>
                  <div className="relative border border-[#E9E5DC] p-3 bg-white shadow-editorial">
                    <ImageReveal
                      src={ARCHITECTURAL_ASSETS.kyotoAtelier!.url}
                      alt={ARCHITECTURAL_ASSETS.kyotoAtelier!.alt}
                      aspectRatio="portrait"
                      direction="left"
                      hoverZoom
                      caption="Private Gallery Residence — Tectonic layering of diffused sunlight and honed travertine."
                    />
                    <div className="absolute top-5 right-5 text-[10px] font-mono text-[#20211E] bg-white/90 backdrop-blur-sm px-2 py-0.5 border border-[#E9E5DC] z-10 pointer-events-none">
                      FIG. 02.1 · ATELIER K
                    </div>
                  </div>
                </ParallaxWrapper>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3 — SELECTED PROJECTS & INTERACTIVE INDEX
          Asymmetric monograph-grade architectural grid paired with interactive
          hover-preview project archive table.
         ========================================================================= */}
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Selected Works"
            title="Architectural Commissions &amp; Built Works"
            description="A curated survey of residential pavilions, cultural pavilions, and spatial transformations."
            action={
              <Link to="/projects">
                <Button variant="outline" size="sm" className="gap-2 font-mono text-xs uppercase tracking-wider group">
                  <span>View Full Archive ({DEMO_PROJECTS.length})</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
            }
            align="split"
          />

          {/* Asymmetric Monograph Grid with Differentiated Timing */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pt-12">
            {/* Project 1: Featured Hero Width (Col 1-8) */}
            <div className="md:col-span-8">
              <ScrollReveal variant="fade-up" duration={0.85}>
                <CardHover lift={4}>
                  <article className="group flex flex-col gap-4 text-left">
                    <Link
                      to={`/projects/${DEMO_PROJECTS[0]!.slug}`}
                      className="block overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
                    >
                      <ImageReveal
                        src={DEMO_PROJECTS[0]!.coverImage.url}
                        alt={DEMO_PROJECTS[0]!.coverImage.alt}
                        aspectRatio="landscape"
                        direction="up"
                        hoverZoom
                      />
                    </Link>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#797C72] tracking-[0.14em] uppercase">
                        <span>{formatCategoryLabel(DEMO_PROJECTS[0]!.category)}</span>
                        <span>{DEMO_PROJECTS[0]!.location} · {DEMO_PROJECTS[0]!.year}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors">
                        <Link to={`/projects/${DEMO_PROJECTS[0]!.slug}`}>
                          <HoverUnderline lineColor="bg-[#777B60]">
                            {DEMO_PROJECTS[0]!.title}
                          </HoverUnderline>
                        </Link>
                      </h3>
                      <p className="font-sans text-sm text-[#53554D] leading-relaxed max-w-xl font-light">
                        {DEMO_PROJECTS[0]!.excerpt}
                      </p>
                    </div>
                  </article>
                </CardHover>
              </ScrollReveal>
            </div>

            {/* Project 2: Portrait Monograph with Offset Delay (Col 9-12) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <ScrollReveal variant="fade-up" delay={0.2} duration={0.85}>
                <CardHover lift={4}>
                  <article className="group flex flex-col gap-4 text-left">
                    <Link
                      to={`/projects/${DEMO_PROJECTS[1]!.slug}`}
                      className="block overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
                    >
                      <ImageReveal
                        src={DEMO_PROJECTS[1]!.coverImage.url}
                        alt={DEMO_PROJECTS[1]!.coverImage.alt}
                        aspectRatio="portrait"
                        direction="left"
                        hoverZoom
                      />
                    </Link>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#797C72] tracking-[0.14em] uppercase">
                        <span>{formatCategoryLabel(DEMO_PROJECTS[1]!.category)}</span>
                        <span>{DEMO_PROJECTS[1]!.location} · {DEMO_PROJECTS[1]!.year}</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors">
                        <Link to={`/projects/${DEMO_PROJECTS[1]!.slug}`}>
                          <HoverUnderline lineColor="bg-[#777B60]">
                            {DEMO_PROJECTS[1]!.title}
                          </HoverUnderline>
                        </Link>
                      </h3>
                      <p className="font-sans text-xs text-[#53554D] leading-relaxed font-light">
                        {DEMO_PROJECTS[1]!.excerpt}
                      </p>
                    </div>
                  </article>
                </CardHover>
              </ScrollReveal>
            </div>
          </div>

          {/* Interactive Project Index with Live Hover Preview */}
          <div className="pt-16 sm:pt-20">
            <ScrollReveal variant="fade-up">
              <div className="border-t border-[#E9E5DC] pt-8 mb-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#777B60]">
                  Interactive Archive Index
                </span>
                <span className="font-mono text-xs text-[#797C72]">
                  Hover or focus to inspect project details
                </span>
              </div>
            </ScrollReveal>
            <InteractiveProjectIndex />
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4 — FEATURED PROJECT STORYTELLING (PINNED SECTION)
          A pinned, scroll-scrubbed storytelling sequence presenting one project
          through 3 evolving chapters (Form, Material, Atmosphere) with a progress bar.
         ========================================================================= */}
      <PinnedStorytelling />

      {/* =========================================================================
          SECTION 5 — SERVICES AND CAPABILITIES
          Disciplines: Architecture, Interior design, Spatial planning, Architectural visualization.
          Refined editorial dividers with technical annotations.
         ========================================================================= */}
      <section className="py-20 bg-[#EFECE3] border-y border-[#E9E5DC]">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start text-left">
            <div className="lg:col-span-4 space-y-4">
              <ScrollReveal variant="fade-up">
                <Badge variant="outline">Studio Practice</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#20211E] tracking-tight leading-[1.12]">
                  Disciplines &amp; Spatial Services
                </h2>
                <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                  Our collaborative studio structure spans built commissions and digital spatial toolkits.
                </p>
                <p className="font-mono text-xs text-[#797C72] pt-2">
                  * Demonstration curriculum illustrating creative scope.
                </p>
              </ScrollReveal>
            </div>

            {/* Interactive Editorial Services Panel */}
            <StaggerGroup stagger={0.08} className="lg:col-span-8 divide-y divide-[#E9E5DC] border-y border-[#E9E5DC]">
              <StaggerItem>
                <div className="py-6 px-4 -mx-4 rounded-sm flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group hover:bg-[#FCFAF6] transition-colors duration-300">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#777B60] group-hover:scale-110 transition-transform">01</span>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                        Architecture
                      </h3>
                      <p className="font-sans text-sm text-[#53554D] font-light max-w-md leading-relaxed">
                        Comprehensive architectural design, contextual site integration, Passivhaus thermal envelope engineering, and municipal approvals.
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#797C72] sm:text-right group-hover:text-[#20211E] transition-colors">
                    Concept through Build
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="py-6 px-4 -mx-4 rounded-sm flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group hover:bg-[#FCFAF6] transition-colors duration-300">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#777B60] group-hover:scale-110 transition-transform">02</span>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                        Interior Design
                      </h3>
                      <p className="font-sans text-sm text-[#53554D] font-light max-w-md leading-relaxed">
                        Atmospheric spatial curation, custom millwork and joinery detailing, natural material sourcing, and bespoke furniture commissions.
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#797C72] sm:text-right group-hover:text-[#20211E] transition-colors">
                    Tactile Curation
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="py-6 px-4 -mx-4 rounded-sm flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group hover:bg-[#FCFAF6] transition-colors duration-300">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#777B60] group-hover:scale-110 transition-transform">03</span>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                        Spatial Planning
                      </h3>
                      <p className="font-sans text-sm text-[#53554D] font-light max-w-md leading-relaxed">
                        Microclimatic orientation studies, circulation modeling, volumetric optimization, and flexible zoning for adaptive re-use.
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#797C72] sm:text-right group-hover:text-[#20211E] transition-colors">
                    Solar &amp; Volume Flow
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="py-6 px-4 -mx-4 rounded-sm flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group hover:bg-[#FCFAF6] transition-colors duration-300">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#777B60] group-hover:scale-110 transition-transform">04</span>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                        Architectural Visualization
                      </h3>
                      <p className="font-sans text-sm text-[#53554D] font-light max-w-md leading-relaxed">
                        Photorealistic unclipped daylight simulations, editorial still renderings, and real-time interactive walkthroughs for competition entries.
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#797C72] sm:text-right group-hover:text-[#20211E] transition-colors">
                    Photometric Cycles PBR
                  </span>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6 — DIGITAL DESIGN RESOURCES
          Digital product shop registry as a natural extension of studio craft.
          Compelling product mockups, pricing in INR, format tags, and bag trigger.
         ========================================================================= */}
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Marketplace Registry"
            title="Digital 3D Assets &amp; Scene Files"
            description="Production-ready 3D environments, seamless 8K PBR architectural materials, and calibrated skies for architects and visualizers."
            action={
              <Link to="/shop">
                <Button variant="outline" size="sm" className="gap-2 font-mono text-xs uppercase tracking-wider group">
                  <span>Explore Full Catalog ({DEMO_PRODUCTS.length})</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
            }
            align="split"
          />

          <StaggerGroup stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            {DEMO_PRODUCTS.map((product) => {
              const isJustAdded = addedProductId === product.id
              const coverImg = product.previewImages[0]

              return (
                <StaggerItem key={product.id} className="h-full">
                  <CardHover lift={4} className="h-full">
                    <article
                      className="group flex flex-col justify-between h-full bg-white rounded-sm border border-[#E9E5DC] p-4 transition-all duration-300 hover:border-[#D3CDC0] hover:shadow-editorial-hover text-left"
                    >
                      <div className="space-y-3">
                        <div className="relative">
                          <Link to={`/shop/${product.slug}`} className="block overflow-hidden rounded-sm">
                            <ImageReveal
                              src={coverImg?.url || ''}
                              alt={coverImg?.alt || product.title}
                              aspectRatio="landscape"
                              hoverZoom
                            />
                          </Link>
                          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 pointer-events-none z-10">
                            {product.formats.slice(0, 2).map((fmt) => (
                              <span
                                key={fmt}
                                className="bg-[#20211E]/80 backdrop-blur-sm text-[#F6F4EF] text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-sm"
                              >
                                .{fmt}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#797C72] block">
                            {formatCategoryLabel(product.category)}
                          </span>
                          <h3 className="font-sans text-base font-medium text-[#20211E] group-hover:text-[#777B60] transition-colors line-clamp-1">
                            <Link to={`/shop/${product.slug}`}>
                              <HoverUnderline lineColor="bg-[#777B60]">
                                {product.title}
                              </HoverUnderline>
                            </Link>
                          </h3>
                          <p className="font-sans text-xs text-[#53554D] line-clamp-2 leading-relaxed font-light">
                            {product.headline}
                          </p>
                        </div>
                      </div>

                      {/* Price in INR & Add-to-cart trigger */}
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E9E5DC]">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#797C72] block">
                            Studio License
                          </span>
                          <span className="font-serif text-xl font-medium text-[#20211E] font-mono">
                            {formatPaiseToInr(product.priceInPaise)}
                          </span>
                        </div>

                        <Button
                          size="sm"
                          variant={isJustAdded ? 'secondary' : 'primary'}
                          onClick={(e) => handleProductAdd(e, product)}
                          aria-label={`Add ${product.title} to shopping bag`}
                          className={`font-mono text-xs uppercase tracking-wider ${
                            isJustAdded ? 'bg-[#777B60] text-white border-[#777B60]' : ''
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Added
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" /> Add
                            </>
                          )}
                        </Button>
                      </div>
                    </article>
                  </CardHover>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7 — DESIGN PHILOSOPHY OR PROCESS
          01. Discover, 02. Develop, 03. Refine, 04. Deliver.
          Visual timeline and numbered steps.
         ========================================================================= */}
      <section className="py-16 sm:py-24 border-t border-[#E9E5DC]">
        <Container>
          <SectionHeading
            eyebrow="Methodology"
            title="The Design Process"
            description="Four deliberate phases ensuring structural integrity, environmental harmony, and craftsmanship."
            align="left"
          />

          {/* Animated Connecting Timeline Bar */}
          <div className="pt-6">
            <SectionTransition variant="hairline" />
          </div>

          <StaggerGroup stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
            {/* Step 1 */}
            <StaggerItem className="h-full">
              <CardHover lift={3} className="h-full">
                <div className="h-full space-y-4 p-6 sm:p-8 rounded-sm bg-[#FCFAF6] border border-[#E9E5DC]/80 text-left shadow-editorial hover:border-[#D3CDC0] transition-colors">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-semibold">
                    Phase 01
                  </span>
                  <h3 className="font-serif text-2xl text-[#20211E]">
                    Discover
                  </h3>
                  <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                    Topographical audit, solar azimuth tracking, geological core samples, and rigorous inquiry into client lifestyle rituals.
                  </p>
                  <div className="pt-2 text-xs text-[#797C72] font-mono border-t border-[#E9E5DC]/60">
                    Site &amp; Solar Modeling
                  </div>
                </div>
              </CardHover>
            </StaggerItem>

            {/* Step 2 */}
            <StaggerItem className="h-full">
              <CardHover lift={3} className="h-full">
                <div className="h-full space-y-4 p-6 sm:p-8 rounded-sm bg-[#FCFAF6] border border-[#E9E5DC]/80 text-left shadow-editorial hover:border-[#D3CDC0] transition-colors">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-semibold">
                    Phase 02
                  </span>
                  <h3 className="font-serif text-2xl text-[#20211E]">
                    Develop
                  </h3>
                  <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                    Iterative volumetric massing, timber framing calculations, 1:20 physical plaster maquettes, and daylight diffusion simulations.
                  </p>
                  <div className="pt-2 text-xs text-[#797C72] font-mono border-t border-[#E9E5DC]/60">
                    Maquette &amp; Volumetrics
                  </div>
                </div>
              </CardHover>
            </StaggerItem>

            {/* Step 3 */}
            <StaggerItem className="h-full">
              <CardHover lift={3} className="h-full">
                <div className="h-full space-y-4 p-6 sm:p-8 rounded-sm bg-[#FCFAF6] border border-[#E9E5DC]/80 text-left shadow-editorial hover:border-[#D3CDC0] transition-colors">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-semibold">
                    Phase 03
                  </span>
                  <h3 className="font-serif text-2xl text-[#20211E]">
                    Refine
                  </h3>
                  <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                    Material quarry audits, acoustic isolation specification, bespoke brass hardware mockups, and building envelope tuning.
                  </p>
                  <div className="pt-2 text-xs text-[#797C72] font-mono border-t border-[#E9E5DC]/60">
                    Material Specifications
                  </div>
                </div>
              </CardHover>
            </StaggerItem>

            {/* Step 4 */}
            <StaggerItem className="h-full">
              <CardHover lift={3} className="h-full">
                <div className="h-full space-y-4 p-6 sm:p-8 rounded-sm bg-[#FCFAF6] border border-[#E9E5DC]/80 text-left shadow-editorial hover:border-[#D3CDC0] transition-colors">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-semibold">
                    Phase 04
                  </span>
                  <h3 className="font-serif text-2xl text-[#20211E]">
                    Deliver
                  </h3>
                  <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                    Direct on-site master artisan supervision, cast-in-place concrete curing audits, and photographic monograph documentation.
                  </p>
                  <div className="pt-2 text-xs text-[#797C72] font-mono border-t border-[#E9E5DC]/60">
                    Execution &amp; Archival
                  </div>
                </div>
              </CardHover>
            </StaggerItem>
          </StaggerGroup>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8 — TESTIMONIALS & CLIENT FEEDBACK
          Editorial client, patron, and jury reflections with authentic fixtures.
         ========================================================================= */}
      <TestimonialsSection />

      {/* =========================================================================
          SECTION 9 — JOURNAL & ARCHITECTURAL INSIGHTS
          Monographs, daylight physics, and documentation standards.
         ========================================================================= */}
      <JournalSection />

      {/* =========================================================================
          SECTION 10 — STRONG CLOSING SECTION
          Memorable architectural canvas, concise statement, and direct CTA.
         ========================================================================= */}
      <section className="py-12 sm:py-20">
        <Container>
          <ScrollReveal variant="scale-subtle">
            <div className="relative rounded-sm bg-[#20211E] text-[#F6F4EF] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-floating border border-white/10">
              {/* Subtle background architectural grid texture */}
              <div
                className="absolute inset-0 opacity-10 bg-[radial-gradient(#F6F4EF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-3xl space-y-8 text-left">
                <span className="font-mono text-xs uppercase tracking-[0.24em] font-medium text-[#777B60]">
                  Commission Brief
                </span>

                <MaskedText
                  as="h2"
                  className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.08] text-balance"
                >
                  Have a spatial commission or digital asset licensing project in mind?
                </MaskedText>

                <p className="font-sans text-base sm:text-lg text-[#E9E5DC]/80 leading-relaxed font-light max-w-xl">
                  We accept a limited number of bespoke architectural and interior commissions annually to maintain uncompromised craftsmanship.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="group bg-[#F6F4EF] text-[#20211E] hover:bg-white hover:text-black gap-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5">
                      <span>Initiate Project Dialogue</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="border-[#E9E5DC]/30 text-[#F6F4EF] hover:bg-white/10 hover:text-white gap-2 font-mono text-xs uppercase tracking-wider">
                      Our Studio Philosophy
                    </Button>
                  </Link>
                </div>

                <div className="pt-8 border-t border-[#E9E5DC]/15 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-[#E9E5DC]/70 font-mono">
                  <span>Direct Inquiries: <a href="mailto:contact@tangent-studio.com" className="text-white underline underline-offset-4 font-sans">contact@tangent-studio.com</a></span>
                  <span>Response Window: Within 48 Hours</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  )
}
