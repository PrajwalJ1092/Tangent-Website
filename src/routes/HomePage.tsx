import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowUpRight,
  ArrowDown,
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
  ImageFrame,
} from '@/components/ui'
import { ARCHITECTURAL_ASSETS } from '@/data/assets'
import { DEMO_PROJECTS, DEMO_PRODUCTS } from '@/data/mockData'
import { formatCategoryLabel, formatPaiseToInr } from '@/lib/formatters'
import { useCart } from '@/context'

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
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* =========================================================================
          SECTION A: HERO
          Cinematic minimal architectural opening. Studio name, editorial headline,
          large photograph, balanced CTA pairing, small scroll indicator.
         ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <Container>
          <div className="space-y-8 sm:space-y-12">
            {/* Top metadata row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E5DC] pb-6">
              <span className="font-sans text-xs uppercase tracking-[0.24em] font-medium text-[#777B60]">
                Architecture &amp; Spatial Systems
              </span>
              <span className="font-sans text-xs text-[#797C72] tracking-[0.16em] uppercase">
                Zurich · Copenhagen · Tokyo
              </span>
            </div>

            {/* Editorial Headline & Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-12 gap-8 items-end"
            >
              <div className="lg:col-span-8 space-y-4">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#797C72] block">
                  Studio Monograph / Volume 01
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#20211E] leading-[1.03] text-balance">
                  Formed by Light. Grounded in Matter.
                </h1>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <p className="font-sans text-sm sm:text-base text-[#53554D] leading-relaxed font-light">
                  Tangent Studio bridges contemporary architectural design and digital craft, crafting physical spaces that harmonize light, materials, and form.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link to="/projects">
                    <Button size="lg" className="gap-2">
                      Explore Projects <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/shop">
                    <Button size="lg" variant="secondary" className="gap-2">
                      Discover the Shop <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Large Hero Architectural Photograph */}
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-lg overflow-hidden border border-[#E9E5DC]"
            >
              <ImageFrame
                src={ARCHITECTURAL_ASSETS.nordicPavilion!.url}
                alt="Nordic Forest Pavilion in natural landscape setting"
                aspectRatio="wide"
                priority
                hoverZoom={false}
                caption="Nordic Forest Pavilion — Cast-in-place concrete cores and Douglas fir frame, Oslo, Norway."
              />
            </motion.div>

            {/* Scroll Indicator */}
            <div className="flex items-center justify-between text-xs text-[#797C72] font-sans pt-2">
              <span className="uppercase tracking-[0.18em]">Tectonic Precision &amp; Material Honesty</span>
              <div className="inline-flex items-center gap-2 text-[#797C72]">
                <span className="uppercase tracking-[0.18em] hidden sm:inline">Scroll to Examine</span>
                <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION B: STUDIO INTRODUCTION
          Concise philosophy, supporting image, editorial layout with generous negative space.
         ========================================================================= */}
      <section className="py-12 border-t border-[#E9E5DC]">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Architectural Philosophy Text */}
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="accent">Studio Philosophy</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#20211E] tracking-tight leading-[1.12] text-balance">
                We believe architecture is the quiet dialogue between human perception and geological permanence.
              </h2>
              <div className="space-y-4 font-sans text-sm sm:text-base text-[#53554D] leading-relaxed font-light max-w-xl">
                <p>
                  Every commission begins with an exacting topographical audit and light study. We eschew superfluous ornamentation in pursuit of volumetric purity, authentic tactile surfaces, and climatic resilience.
                </p>
                <p>
                  Our built projects range from single-family sanctuaries rooted in remote coastal bluffs to civic exhibition spaces engineered with post-tensioned concrete cantilevers.
                </p>
              </div>
              <div className="pt-4">
                <TextLink to="/about" showArrow className="text-base">
                  Read more about our studio methodology
                </TextLink>
              </div>
            </div>

            {/* Right: Supporting Architectural Image Frame */}
            <div className="lg:col-span-6">
              <div className="relative">
                <ImageFrame
                  src={ARCHITECTURAL_ASSETS.kyotoAtelier!.url}
                  alt={ARCHITECTURAL_ASSETS.kyotoAtelier!.alt}
                  aspectRatio="portrait"
                  caption="Private Gallery Residence — Tectonic layering of diffused sunlight and honed travertine."
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION C: SELECTED PROJECTS
          Asymmetric monograph-grade architectural grid with varied proportions.
         ========================================================================= */}
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Selected Works"
            title="Architectural Commissions &amp; Built Works"
            description="A curated survey of residential pavilions, cultural pavilions, and spatial transformations."
            action={
              <Link to="/projects">
                <Button variant="outline" size="sm" className="gap-2">
                  View Full Archive ({DEMO_PROJECTS.length}) <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            }
            align="split"
          />

          {/* Asymmetric Monograph Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pt-12">
            {/* Project 1: Featured Hero Width (Col 1-8) */}
            <div className="md:col-span-8">
              <article className="group flex flex-col gap-4 text-left">
                <Link
                  to={`/projects/${DEMO_PROJECTS[0]!.slug}`}
                  className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
                >
                  <ImageFrame
                    src={DEMO_PROJECTS[0]!.coverImage.url}
                    alt={DEMO_PROJECTS[0]!.coverImage.alt}
                    aspectRatio="landscape"
                    hoverZoom
                  />
                </Link>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans text-[#797C72] tracking-[0.14em] uppercase">
                    <span>{formatCategoryLabel(DEMO_PROJECTS[0]!.category)}</span>
                    <span>{DEMO_PROJECTS[0]!.location} · {DEMO_PROJECTS[0]!.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors">
                    <Link to={`/projects/${DEMO_PROJECTS[0]!.slug}`}>
                      {DEMO_PROJECTS[0]!.title}
                    </Link>
                  </h3>
                  <p className="font-sans text-sm text-[#53554D] leading-relaxed max-w-xl">
                    {DEMO_PROJECTS[0]!.excerpt}
                  </p>
                </div>
              </article>
            </div>

            {/* Project 2: Portrait Monograph (Col 9-12) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <article className="group flex flex-col gap-4 text-left">
                <Link
                  to={`/projects/${DEMO_PROJECTS[1]!.slug}`}
                  className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
                >
                  <ImageFrame
                    src={DEMO_PROJECTS[1]!.coverImage.url}
                    alt={DEMO_PROJECTS[1]!.coverImage.alt}
                    aspectRatio="portrait"
                    hoverZoom
                  />
                </Link>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans text-[#797C72] tracking-[0.14em] uppercase">
                    <span>{formatCategoryLabel(DEMO_PROJECTS[1]!.category)}</span>
                    <span>{DEMO_PROJECTS[1]!.location} · {DEMO_PROJECTS[1]!.year}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors">
                    <Link to={`/projects/${DEMO_PROJECTS[1]!.slug}`}>
                      {DEMO_PROJECTS[1]!.title}
                    </Link>
                  </h3>
                  <p className="font-sans text-xs text-[#53554D] leading-relaxed">
                    {DEMO_PROJECTS[1]!.excerpt}
                  </p>
                </div>
              </article>
            </div>

            {/* Project 3: Col 1-6 */}
            <div className="md:col-span-6">
              <article className="group flex flex-col gap-4 text-left">
                <Link
                  to={`/projects/${DEMO_PROJECTS[2]!.slug}`}
                  className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
                >
                  <ImageFrame
                    src={DEMO_PROJECTS[2]!.coverImage.url}
                    alt={DEMO_PROJECTS[2]!.coverImage.alt}
                    aspectRatio="landscape"
                    hoverZoom
                  />
                </Link>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans text-[#797C72] tracking-[0.14em] uppercase">
                    <span>{formatCategoryLabel(DEMO_PROJECTS[2]!.category)}</span>
                    <span>{DEMO_PROJECTS[2]!.location} · {DEMO_PROJECTS[2]!.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors">
                    <Link to={`/projects/${DEMO_PROJECTS[2]!.slug}`}>
                      {DEMO_PROJECTS[2]!.title}
                    </Link>
                  </h3>
                  <p className="font-sans text-sm text-[#53554D] leading-relaxed">
                    {DEMO_PROJECTS[2]!.excerpt}
                  </p>
                </div>
              </article>
            </div>

            {/* Project 4: Col 7-12 */}
            <div className="md:col-span-6">
              <article className="group flex flex-col gap-4 text-left">
                <Link
                  to={`/projects/${DEMO_PROJECTS[3]!.slug}`}
                  className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
                >
                  <ImageFrame
                    src={DEMO_PROJECTS[3]!.coverImage.url}
                    alt={DEMO_PROJECTS[3]!.coverImage.alt}
                    aspectRatio="landscape"
                    hoverZoom
                  />
                </Link>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans text-[#797C72] tracking-[0.14em] uppercase">
                    <span>{formatCategoryLabel(DEMO_PROJECTS[3]!.category)}</span>
                    <span>{DEMO_PROJECTS[3]!.location} · {DEMO_PROJECTS[3]!.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors">
                    <Link to={`/projects/${DEMO_PROJECTS[3]!.slug}`}>
                      {DEMO_PROJECTS[3]!.title}
                    </Link>
                  </h3>
                  <p className="font-sans text-sm text-[#53554D] leading-relaxed">
                    {DEMO_PROJECTS[3]!.excerpt}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION D: SERVICES
          Architecture, Interior design, Spatial planning, Architectural visualization.
          Clear demonstration framing without generic cards.
         ========================================================================= */}
      <section className="py-16 bg-[#EFECE3] border-y border-[#E9E5DC]">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
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
            </div>

            <div className="lg:col-span-8 divide-y divide-[#E9E5DC] border-y border-[#E9E5DC]">
              <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#777B60]">01</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                      Architecture
                    </h3>
                    <p className="font-sans text-sm text-[#53554D] font-light max-w-md">
                      Comprehensive architectural design, contextual site integration, Passivhaus thermal envelope engineering, and municipal approvals.
                    </p>
                  </div>
                </div>
                <span className="font-sans text-xs uppercase tracking-wider text-[#797C72] sm:text-right">
                  Concept through Build
                </span>
              </div>

              <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#777B60]">02</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                      Interior Design
                    </h3>
                    <p className="font-sans text-sm text-[#53554D] font-light max-w-md">
                      Atmospheric spatial curation, custom millwork and joinery detailing, natural material sourcing, and bespoke furniture commissions.
                    </p>
                  </div>
                </div>
                <span className="font-sans text-xs uppercase tracking-wider text-[#797C72] sm:text-right">
                  Tactile Curation
                </span>
              </div>

              <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#777B60]">03</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                      Spatial Planning
                    </h3>
                    <p className="font-sans text-sm text-[#53554D] font-light max-w-md">
                      Microclimatic orientation studies, circulation modeling, volumetric optimization, and flexible zoning for adaptive re-use.
                    </p>
                  </div>
                </div>
                <span className="font-sans text-xs uppercase tracking-wider text-[#797C72] sm:text-right">
                  Solar &amp; Volume Flow
                </span>
              </div>

              <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#777B60]">04</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                      Architectural Visualization
                    </h3>
                    <p className="font-sans text-sm text-[#53554D] font-light max-w-md">
                      Photorealistic unclipped daylight simulations, editorial still renderings, and real-time interactive walkthroughs for competition entries.
                    </p>
                  </div>
                </div>
                <span className="font-sans text-xs uppercase tracking-wider text-[#797C72] sm:text-right">
                  Photometric Cycles PBR
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION E: FEATURED DIGITAL PRODUCTS
          4 products with cover image, name, category, price in INR, link, add to cart.
         ========================================================================= */}
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Marketplace Registry"
            title="Digital 3D Assets &amp; Scene Files"
            description="Production-ready 3D environments, seamless 8K PBR architectural materials, and calibrated skies for architects and visualizers."
            action={
              <Link to="/shop">
                <Button variant="outline" size="sm" className="gap-2">
                  Explore Full Catalog ({DEMO_PRODUCTS.length}) <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            }
            align="split"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            {DEMO_PRODUCTS.map((product) => {
              const isJustAdded = addedProductId === product.id
              const coverImg = product.previewImages[0]

              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between bg-white rounded-lg border border-[#E9E5DC] p-4 transition-all duration-300 hover:border-[#D3CDC0] hover:shadow-[0_8px_24px_-4px_rgba(32,33,30,0.06)] text-left"
                >
                  <div className="space-y-3">
                    <div className="relative">
                      <Link to={`/shop/${product.slug}`} className="block overflow-hidden rounded-md">
                        <ImageFrame
                          src={coverImg?.url || ''}
                          alt={coverImg?.alt || product.title}
                          aspectRatio="landscape"
                          hoverZoom
                        />
                      </Link>
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        {product.formats.slice(0, 2).map((fmt) => (
                          <span
                            key={fmt}
                            className="bg-[#20211E]/80 backdrop-blur-sm text-[#F6F4EF] text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded"
                          >
                            .{fmt}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#797C72] block">
                        {formatCategoryLabel(product.category)}
                      </span>
                      <h3 className="font-sans text-base font-medium text-[#20211E] group-hover:text-[#777B60] transition-colors line-clamp-1">
                        <Link to={`/shop/${product.slug}`}>
                          {product.title}
                        </Link>
                      </h3>
                      <p className="font-sans text-xs text-[#53554D] line-clamp-2 leading-relaxed">
                        {product.headline}
                      </p>
                    </div>
                  </div>

                  {/* Price in INR & Add-to-cart trigger */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E9E5DC]">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#797C72] block">
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
                      className={isJustAdded ? 'bg-[#777B60] text-white border-[#777B60]' : ''}
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
              )
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION F: DESIGN PROCESS
          01. Discover, 02. Develop, 03. Refine, 04. Deliver.
         ========================================================================= */}
      <section className="py-16 border-t border-[#E9E5DC]">
        <Container>
          <SectionHeading
            eyebrow="Methodology"
            title="The Design Process"
            description="Four deliberate phases ensuring structural integrity, environmental harmony, and craftsmanship."
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
            {/* Step 1 */}
            <div className="space-y-4 p-6 rounded-lg bg-[#FCFAF6] border border-[#E9E5DC]/80 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-semibold">
                Phase 01
              </span>
              <h3 className="font-serif text-2xl text-[#20211E]">
                Discover
              </h3>
              <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                Topographical audit, solar azimuth tracking, geological core samples, and rigorous inquiry into client lifestyle rituals.
              </p>
              <div className="pt-2 text-xs text-[#797C72] font-mono">
                Site &amp; Solar Modeling
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 p-6 rounded-lg bg-[#FCFAF6] border border-[#E9E5DC]/80 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-semibold">
                Phase 02
              </span>
              <h3 className="font-serif text-2xl text-[#20211E]">
                Develop
              </h3>
              <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                Iterative volumetric massing, timber framing calculations, 1:20 physical plaster maquettes, and daylight diffusion simulations.
              </p>
              <div className="pt-2 text-xs text-[#797C72] font-mono">
                Maquette &amp; Volumetrics
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 p-6 rounded-lg bg-[#FCFAF6] border border-[#E9E5DC]/80 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-semibold">
                Phase 03
              </span>
              <h3 className="font-serif text-2xl text-[#20211E]">
                Refine
              </h3>
              <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                Material quarry audits, acoustic isolation specification, bespoke brass hardware mockups, and building envelope envelope tuning.
              </p>
              <div className="pt-2 text-xs text-[#797C72] font-mono">
                Material Specifications
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-4 p-6 rounded-lg bg-[#FCFAF6] border border-[#E9E5DC]/80 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-semibold">
                Phase 04
              </span>
              <h3 className="font-serif text-2xl text-[#20211E]">
                Deliver
              </h3>
              <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
                Direct on-site master artisan supervision, cast-in-place concrete curing audits, and photographic monograph documentation.
              </p>
              <div className="pt-2 text-xs text-[#797C72] font-mono">
                Execution &amp; Archival
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION G: CONTACT CTA
          Visually strong architectural section encouraging client inquiry.
         ========================================================================= */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative rounded-2xl bg-[#20211E] text-[#F6F4EF] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-floating">
            {/* Subtle background architectural grid texture */}
            <div
              className="absolute inset-0 opacity-10 bg-[radial-gradient(#F6F4EF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl space-y-8 text-left">
              <span className="font-sans text-xs uppercase tracking-[0.24em] font-medium text-[#777B60]">
                Commission Brief
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.08] text-balance">
                Have a spatial commission or digital asset licensing project in mind?
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#E9E5DC]/80 leading-relaxed font-light max-w-xl">
                We accept a limited number of bespoke architectural and interior commissions annually to maintain uncompromised craftsmanship.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-[#F6F4EF] text-[#20211E] hover:bg-white hover:text-black gap-2">
                    Initiate Project Dialogue <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-[#E9E5DC]/30 text-[#F6F4EF] hover:bg-white/10 hover:text-white gap-2">
                    Our Studio Philosophy
                  </Button>
                </Link>
              </div>

              <div className="pt-8 border-t border-[#E9E5DC]/15 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-[#E9E5DC]/70 font-sans">
                <span>Direct Inquiries: <a href="mailto:contact@tangent-studio.com" className="text-white underline underline-offset-4">contact@tangent-studio.com</a></span>
                <span>Response Window: Within 48 Hours</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
