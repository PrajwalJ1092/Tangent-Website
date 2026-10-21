import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft,
  Check,
  ShoppingBag,
  Download,
  ShieldCheck,
  FileCode,
  Clock,
  HardDrive,
  Info,
  Sparkles,
  Maximize2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  HelpCircle,
  Users,
  Layers,
  ArrowRight,
} from 'lucide-react'
import {
  Container,
  Breadcrumbs,
  Badge,
  Button,
  EmptyState,
  ProductCard,
  SEO,
} from '@/components/ui'
import {
  ScrollReveal,
  MaskedText,
  StaggerGroup,
  StaggerItem,
  CardHover,
  MaskedHeadline,
  CharacterReveal,
} from '@/components/motion'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { formatPaiseToInr, calculateDiscountPercent } from '@/lib/formatters'
import { useCart } from '@/context/useCart'
import { MARKETPLACE_CATEGORIES } from '@/types/product'
import { ProductPreviewLightbox } from '@/components/products/ProductPreviewLightbox'
import { ProductReviewsSection } from '@/components/products/ProductReviewsSection'
import { StickyPurchaseBar } from '@/components/products/StickyPurchaseBar'
import { useMotionSafe } from '@/lib/motionTokens'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug])
  const { addItem, setIsCartOpen } = useCart()
  const { isMotionSafe } = useMotionSafe()

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0)

  // Fallback if product does not exist
  if (!product) {
    return (
      <div className="py-20">
        <Container>
          <EmptyState
            icon={<Info className="w-5 h-5" />}
            title="Digital Asset Not Found"
            description={`We could not locate any product matching the identifier "${slug}". The item may have been relocated or updated in our catalog.`}
            actionLabel="Return to Digital Storefront"
            actionNode={
              <Link to="/shop">
                <Button variant="primary" size="md">
                  Browse All Resources
                </Button>
              </Link>
            }
          />
        </Container>
      </div>
    )
  }

  // Gallery of all images for the product
  const gallery =
    product.previewImages && product.previewImages.length > 0
      ? product.previewImages
      : [product.coverImage]

  const activeImage = gallery[activeImageIndex] || product.coverImage

  const categoryLabel =
    MARKETPLACE_CATEGORIES.find((c) => c.id === product.category)?.label ||
    product.category

  const discountPercent =
    product.compareAtPriceInPaise && product.compareAtPriceInPaise > product.priceInPaise
      ? calculateDiscountPercent(product.priceInPaise, product.compareAtPriceInPaise)
      : null

  const savingsPaise =
    product.compareAtPriceInPaise && product.compareAtPriceInPaise > product.priceInPaise
      ? product.compareAtPriceInPaise - product.priceInPaise
      : null

  const relatedProducts = getRelatedProducts(product.id, product.category, 3)

  const handleAddToCart = () => {
    addItem(product, product.licenseType)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2500)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index)
  }

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [product.coverImage.url],
    description: product.shortDescription,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: (product.priceInPaise / 100).toFixed(2),
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <div className="py-10 space-y-16">
      <SEO
        title={product.name}
        description={product.shortDescription}
        ogType="product"
        ogImage={product.coverImage.url}
        jsonLd={productJsonLd}
      />
      <Container>
        {/* Navigation Breadcrumbs & Back Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E5DC]">
          <Breadcrumbs
            items={[
              { label: 'Studio Home', to: '/' },
              { label: 'Digital Marketplace', to: '/shop' },
              { label: categoryLabel, to: `/shop?category=${product.category}` },
              { label: product.name },
            ]}
          />
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#777B60] hover:text-[#20211E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E] rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Marketplace
          </Link>
        </div>

        {/* Main Product Layout: 2 Columns */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Image Preview Gallery & Spreads (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Stage Image with Lightbox Zoom Trigger */}
            <div className="relative border border-[#E9E5DC] bg-[#EFECE6]/40 overflow-hidden group rounded-lg aspect-[16/10]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage.id || activeImageIndex}
                  src={activeImage.url}
                  alt={activeImage.alt}
                  initial={isMotionSafe ? { opacity: 0, scale: 1.03 } : { opacity: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={isMotionSafe ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </AnimatePresence>

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="default" className="bg-[#20211E]/80 text-[#F6F4EF] backdrop-blur-sm border-none">
                  Demo Asset
                </Badge>
                {product.featured && (
                  <Badge variant="outline" className="bg-white/90 text-[#20211E] border-[#20211E]/30 backdrop-blur-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#777B60]" />
                    Featured Release
                  </Badge>
                )}
              </div>

              {/* View Count & Fullscreen trigger */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#20211E] bg-white/95 hover:bg-white px-2.5 py-1 backdrop-blur-sm border border-[#E9E5DC] shadow-sm transition-colors rounded-sm cursor-pointer"
                  aria-label="Enlarge spread in high-resolution lightbox"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Preview</span>
                </button>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#20211E]/80 bg-white/90 px-2.5 py-1 backdrop-blur-sm border border-[#E9E5DC] rounded-sm">
                  {activeImageIndex + 1} of {gallery.length} Views
                </span>
              </div>
            </div>

            {/* Thumbnail Selector Strip */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {gallery.map((img, idx) => {
                  const isCurrent = idx === activeImageIndex
                  return (
                    <button
                      key={img.id || idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative border transition-all overflow-hidden rounded-md cursor-pointer ${
                        isCurrent
                          ? 'border-[#20211E] ring-2 ring-[#20211E]'
                          : 'border-[#E9E5DC] opacity-70 hover:opacity-100 hover:border-[#777B60]'
                      }`}
                      aria-label={`View preview ${idx + 1}: ${img.alt}`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            )}

            {/* What's Included / Highlights Breakdown */}
            {product.highlights && product.highlights.length > 0 && (
              <ScrollReveal>
                <div className="border border-[#E9E5DC] bg-white p-6 sm:p-8 space-y-4 rounded-lg text-left shadow-editorial">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
                    <Layers className="w-4 h-4" />
                    <span>Deliverables &amp; Master Contents</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#20211E] font-normal">
                    What You Receive with This Studio Package
                  </h3>
                  <ul className="space-y-3 pt-2">
                    {product.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#53554D] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#777B60] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {/* Who Is This For */}
            {product.targetAudience && product.targetAudience.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div className="border border-[#E9E5DC] bg-[#FCFAF6] p-6 sm:p-8 space-y-4 rounded-lg text-left">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
                    <Users className="w-4 h-4" />
                    <span>Practitioner Fit</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#20211E] font-normal">
                    Who Is This Resource Crafted For?
                  </h3>
                  <ul className="space-y-2.5 pt-2">
                    {product.targetAudience.map((audience, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#53554D] leading-relaxed">
                        <span className="font-mono text-xs text-[#777B60] font-semibold">0{idx + 1}.</span>
                        <span>{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {/* How To Use It 3-Step Workflow */}
            {product.howToUse && product.howToUse.length > 0 && (
              <ScrollReveal delay={0.15}>
                <div className="border border-[#E9E5DC] bg-white p-6 sm:p-8 space-y-6 rounded-lg text-left shadow-editorial">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
                    <Clock className="w-4 h-4" />
                    <span>Workflow Integration</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#20211E] font-normal">
                    How to Integrate into Your Studio Practice
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    {product.howToUse.map((step) => (
                      <div key={step.step} className="space-y-2 p-4 bg-[#FCFAF6] border border-[#E9E5DC]/80 rounded-lg">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#777B60] font-bold">
                          Step {step.step}
                        </span>
                        <h4 className="font-serif text-lg text-[#20211E]">
                          {step.title}
                        </h4>
                        <p className="font-sans text-xs text-[#53554D] leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Included Source Files & Formats Card */}
            <ScrollReveal delay={0.2}>
              <div className="border border-[#E9E5DC] bg-[#FCFAF6] p-6 space-y-4 rounded-lg text-left">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
                  <FileCode className="w-4 h-4" />
                  <span>Verified Archive Contents ({product.includedFiles.length} Items)</span>
                </div>
                <div className="divide-y divide-[#E9E5DC] text-xs font-mono">
                  {product.includedFiles.map((file, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-[#20211E]">
                      <span className="truncate pr-4">{file}</span>
                      <span className="text-[#777B60] shrink-0 font-sans text-[11px]">Included</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-sans text-[#53554D] leading-relaxed pt-2 border-t border-[#E9E5DC]">
                  All files listed above are packaged inside the delivered source zip file. No extraneous formats or third-party plug-ins are required beyond specified host software.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Pricing, Specs, License & Cart CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* Header info with Masked Typography and Staggered Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Link
                  to={`/shop?category=${product.category}`}
                  className="text-xs font-mono uppercase tracking-widest text-[#777B60] hover:text-[#20211E] transition-colors"
                >
                  {categoryLabel}
                </Link>
                {product.lastUpdated && (
                  <>
                    <span className="text-[#E9E5DC]">•</span>
                    <span className="text-xs font-mono text-[#53554D] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Updated {product.lastUpdated}
                    </span>
                  </>
                )}
              </div>

              <MaskedHeadline
                as="h1"
                text={product.name}
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#20211E] leading-tight font-normal"
              />

              <p className="font-sans text-sm sm:text-base text-[#53554D] leading-relaxed font-light">
                {product.shortDescription}
              </p>
            </div>

            {/* Price block */}
            <CardHover lift={2}>
              <div className="p-6 sm:p-8 border border-[#E9E5DC] bg-white space-y-4 rounded-lg shadow-editorial">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-normal text-[#20211E]">
                    {formatPaiseToInr(product.priceInPaise)}
                  </span>
                  {product.compareAtPriceInPaise && (
                    <span className="text-sm font-sans line-through text-[#777B60]">
                      {formatPaiseToInr(product.compareAtPriceInPaise)}
                    </span>
                  )}
                  {discountPercent && (
                    <Badge variant="outline" className="border-emerald-700/30 text-emerald-800 bg-emerald-50 text-xs">
                      Save {discountPercent}% ({formatPaiseToInr(savingsPaise || 0)})
                    </Badge>
                  )}
                </div>

                <div className="text-[11px] font-mono text-[#777B60] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>One-time studio investment • Perpetual commercial usage</span>
                </div>

                {/* Add to Cart CTA */}
                <div className="space-y-3 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    className={`w-full py-4 text-sm font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-800 text-white hover:bg-emerald-850'
                        : 'bg-[#20211E] text-white hover:bg-[#3A3B36]'
                    }`}
                    aria-live="polite"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-in zoom-in" />
                        Added to Studio Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Add to Studio Bag
                      </>
                    )}
                  </Button>

                  {isAdded && (
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(true)}
                      className="w-full text-center text-xs font-mono text-[#777B60] hover:text-[#20211E] underline underline-offset-4 pt-1 cursor-pointer"
                    >
                      View Bag &amp; Proceed to Checkout →
                    </button>
                  )}
                </div>
              </div>
            </CardHover>

            {/* Specifications & Compatibility */}
            <ScrollReveal>
              <div className="space-y-4 border-t border-[#E9E5DC] pt-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#777B60]">
                  Technical Compatibility
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibleSoftware.map((software, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3 py-1 bg-white border border-[#E9E5DC] text-[#20211E] rounded"
                    >
                      {software}
                    </span>
                  ))}
                </div>

                {product.fileSize && (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#53554D] pt-1">
                    <HardDrive className="w-3.5 h-3.5 text-[#777B60]" />
                    <span>Download Package Size: {product.fileSize}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Full Description */}
            <ScrollReveal>
              <div className="space-y-3 border-t border-[#E9E5DC] pt-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#777B60]">
                  Design Specification &amp; Monograph Notes
                </h3>
                <div className="space-y-3 font-sans text-xs sm:text-sm text-[#53554D] leading-relaxed whitespace-pre-line font-light">
                  {product.fullDescription}
                </div>
              </div>
            </ScrollReveal>

            {/* Transparent License Information (Visible Before Purchase) */}
            <ScrollReveal>
              <div className="border border-[#E9E5DC] bg-[#FCFAF6] p-5 space-y-3 rounded-lg">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#20211E]">
                  <ShieldCheck className="w-4 h-4 text-[#777B60]" />
                  <span>Transparent Licensing Summary</span>
                </div>
                <p className="text-xs text-[#53554D] leading-relaxed font-light">
                  {product.licenseSummary}
                </p>
                <div className="pt-2 border-t border-[#E9E5DC] grid grid-cols-2 gap-2 text-[11px] font-mono text-[#53554D]">
                  <div>
                    <span className="text-emerald-700 font-semibold">✓ Permitted:</span> Client presentations, commercial renders, built monographs
                  </div>
                  <div>
                    <span className="text-red-700 font-semibold">✕ Prohibited:</span> Reselling, sublicensing, or redistributing raw model geometry
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Product FAQs Accordion */}
            {product.faqs && product.faqs.length > 0 && (
              <ScrollReveal>
                <div className="space-y-3 border-t border-[#E9E5DC] pt-6">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
                    <HelpCircle className="w-4 h-4" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <div className="divide-y divide-[#E9E5DC] border-y border-[#E9E5DC]">
                    {product.faqs.map((faq, idx) => {
                      const isExpanded = expandedFaqIndex === idx
                      return (
                        <div key={idx} className="py-3">
                          <button
                            type="button"
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-medium text-[#20211E] hover:text-[#777B60] transition-colors cursor-pointer"
                            aria-expanded={isExpanded}
                          >
                            <span>{faq.question}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#777B60] shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#777B60] shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-2 text-xs text-[#53554D] leading-relaxed font-sans font-light">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Delivery Terms */}
            <ScrollReveal>
              <div className="border border-[#E9E5DC] bg-white p-5 space-y-2 rounded-lg shadow-editorial">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#20211E]">
                  <Download className="w-4 h-4 text-[#777B60]" />
                  <span>Instant Digital Delivery</span>
                </div>
                <p className="text-xs text-[#53554D] leading-relaxed font-light">
                  Upon order confirmation, download links for the complete uncompressed archive are generated instantly and delivered via encrypted receipt. Perpetual re-download access is preserved.
                </p>
              </div>
            </ScrollReveal>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#777B60]">
                  Tags:
                </span>
                {product.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/shop?q=${encodeURIComponent(tag)}`}
                    className="text-[11px] font-mono text-[#53554D] bg-[#EFECE6] px-2 py-0.5 hover:text-[#20211E] transition-colors rounded-sm"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews & Rating Distribution Section */}
        <ScrollReveal>
          <ProductReviewsSection
            productId={product.id}
            productName={product.name}
            initialReviews={product.reviewsList}
          />
        </ScrollReveal>
      </Container>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#E9E5DC] bg-[#FCFAF6] py-16">
          <Container>
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#777B60] mb-2">
                    Complementary Tools
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-[#20211E]">
                    Related Architectural Resources
                  </h2>
                </div>
                <Link
                  to="/shop"
                  className="text-xs font-mono uppercase tracking-wider text-[#777B60] hover:text-[#20211E] transition-colors flex items-center gap-1"
                >
                  <span>View Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerGroup
              stagger={0.08}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {relatedProducts.map((rel) => (
                <StaggerItem key={rel.id} className="h-full">
                  <ProductCard product={rel} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      )}

      {/* Lightbox Modal */}
      <ProductPreviewLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={gallery}
        currentIndex={activeImageIndex}
        onIndexChange={setActiveImageIndex}
        productTitle={product.name}
      />

      {/* Sticky Quick-Purchase Bar on Scroll */}
      <StickyPurchaseBar
        product={product}
        onAddToCart={handleAddToCart}
        isAdded={isAdded}
      />
    </div>
  )
}
