import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  X,
  FileCode,
} from 'lucide-react'
import { useCart } from '@/context'
import {
  Container,
  Breadcrumbs,
  Button,
  ImageFrame,
  Badge,
  EmptyState,
  SEO,
} from '@/components/ui'
import {
  ScrollReveal,
  MaskedText,
} from '@/components/motion'
import { formatPaiseToInr } from '@/lib/formatters'

export function CartPage() {
  const {
    items,
    summary,
    updateQuantity,
    removeItem,
    clearCart,
    applyDiscountCode,
    removeDiscountCode,
    appliedDiscount,
  } = useCart()

  const [promoInput, setPromoInput] = useState('')
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoInput.trim()) return
    const result = applyDiscountCode(promoInput)
    setPromoMessage({ text: result.message, success: result.success })
    if (result.success) {
      setPromoInput('')
    }
  }

  const handleRemovePromo = () => {
    removeDiscountCode()
    setPromoMessage(null)
  }

  return (
    <div className="py-10 space-y-12">
      <SEO
        title="Studio Acquisition Bag"
        description="Review selected architectural monographs, CAD libraries, and calibrated 3D visualization scenes queued for acquisition."
      />
      <Container>
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Studio Home', to: '/' },
              { label: 'Digital Marketplace', to: '/shop' },
              { label: 'Studio Bag' },
            ]}
          />
          <div className="space-y-4 max-w-4xl text-left">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#777B60] block">
              Cart &amp; Acquisition Queue
            </span>
            <MaskedText
              as="h1"
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#20211E] leading-[1.05]"
            >
              Digital Acquisition Bag
            </MaskedText>
            <ScrollReveal delay={0.15}>
              <p className="font-sans text-lg sm:text-xl text-[#53554D] font-light leading-relaxed max-w-3xl">
                Review selected architectural monographs, CAD libraries, and calibrated 3D visualization scenes.
                Each item includes a perpetual commercial studio license.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {items.length === 0 ? (
          <ScrollReveal>
            <div className="mt-8">
              <EmptyState
                icon={<ShoppingBag className="w-6 h-6" />}
                title="Your Studio Bag is Empty"
                description="You have not queued any architectural assets, 3D scenes, or detail libraries for acquisition yet."
                actionLabel="Explore Digital Marketplace"
                actionNode={
                  <Link to="/shop">
                    <Button variant="primary" size="md">
                      Explore Digital Resources
                    </Button>
                  </Link>
                }
                className="py-16"
              />
            </div>
          </ScrollReveal>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Cart Line Items (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Header and Clear Cart trigger */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E5DC]">
                <div className="text-xs font-mono uppercase tracking-widest text-[#777B60]">
                  Queue ({summary.itemCount} {summary.itemCount === 1 ? 'Asset' : 'Assets'} · {items.length} {items.length === 1 ? 'License' : 'Licenses'})
                </div>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-mono text-[#53554D] hover:text-[#20211E] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Clear Bag
                </button>
              </div>

              {/* Items List with AnimatePresence */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="p-5 border border-[#E9E5DC] bg-white rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all hover:border-[#777B60]/40 shadow-xs"
                    >
                      <div className="flex items-center gap-4">
                        {/* Product Thumbnail */}
                        <Link
                          to={`/shop/${item.product.slug}`}
                          className="w-20 h-20 shrink-0 border border-[#E9E5DC] rounded overflow-hidden bg-[#EFECE6]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E]"
                          aria-label={`View ${item.product.name}`}
                        >
                          <ImageFrame
                            src={item.product.coverImage.url}
                            alt={item.product.coverImage.alt}
                            aspectRatio="square"
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#777B60] block">
                            {item.product.category.replace('-', ' ')}
                          </span>
                          <Link
                            to={`/shop/${item.product.slug}`}
                            className="font-serif text-base text-[#20211E] hover:text-[#777B60] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <div className="flex items-center gap-2 text-xs font-mono text-[#53554D]">
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-[#E9E5DC]">
                              {item.license === 'extended'
                                ? 'Enterprise Studio'
                                : item.license === 'commercial'
                                ? 'Commercial Practice'
                                : 'Standard Studio'}
                            </Badge>
                            <span>•</span>
                            <span>{formatPaiseToInr(item.unitPriceInPaise)} / seat</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#E9E5DC]">
                        {/* Seat Quantity */}
                        <div className="flex items-center border border-[#E9E5DC] rounded overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-[#53554D] hover:text-[#20211E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            aria-label={`Decrease seats for ${item.product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono font-medium text-[#20211E]">
                            {item.quantity} {item.quantity === 1 ? 'seat' : 'seats'}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            className="p-2 text-[#53554D] hover:text-[#20211E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            aria-label={`Increase seats for ${item.product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right min-w-24">
                          <div className="font-serif text-lg text-[#20211E]">
                            {formatPaiseToInr(item.lineTotalInPaise)}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#777B60] hover:text-red-700 p-1.5 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Digital License Policy Callout */}
              <ScrollReveal>
                <div className="p-4 border border-[#E9E5DC] bg-[#FCFAF6] rounded-lg flex items-start gap-3 text-xs text-[#53554D] leading-relaxed">
                  <FileCode className="w-4 h-4 text-[#777B60] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#20211E]">Digital Delivery Assurance: </span>
                    All assets are delivered as immediate uncompressed archives. One seat grants perpetual rights for one active architectural workstation. Zero shipping charges apply.
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Order Summary & Checkout Action (5 cols) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="border border-[#E9E5DC] bg-white p-6 space-y-6 rounded-lg shadow-sm">
                    <h2 className="font-serif text-xl text-[#20211E]">
                      Order Financial Summary
                    </h2>

                    {/* Subtotal, Discount, Tax */}
                    <div className="space-y-3 divide-y divide-[#E9E5DC] text-xs font-mono">
                      <div className="flex justify-between text-[#53554D] pb-3">
                        <span>Subtotal ({summary.itemCount} seats)</span>
                        <span className="text-[#20211E] font-medium">
                          {formatPaiseToInr(summary.subtotalInPaise)}
                        </span>
                      </div>

                      {/* Applied Discount Line */}
                      {summary.discountInPaise > 0 && (
                        <div className="flex justify-between text-emerald-800 pt-3 pb-3">
                          <span className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5" />
                            Promo ({appliedDiscount?.code})
                          </span>
                          <span className="font-medium">
                            -{formatPaiseToInr(summary.discountInPaise)}
                          </span>
                        </div>
                      )}

                      {/* Estimated Tax Line */}
                      <div className="flex justify-between text-[#53554D] pt-3 pb-3">
                        <div>
                          <span>Estimated Tax (18% GST)</span>
                          <span className="block text-[10px] text-[#777B60] font-sans">
                            Standard digital services rate estimate
                          </span>
                        </div>
                        <span className="text-[#20211E] font-medium">
                          {formatPaiseToInr(summary.estimatedTaxInPaise)}
                        </span>
                      </div>

                      {/* Final Total */}
                      <div className="flex justify-between items-baseline pt-4 text-sm">
                        <span className="font-serif text-base text-[#20211E]">
                          Estimated Total
                        </span>
                        <div className="text-right">
                          <span className="font-serif text-2xl text-[#20211E]">
                            {formatPaiseToInr(summary.totalInPaise)}
                          </span>
                          <span className="block text-[10px] text-[#777B60] uppercase tracking-wider font-mono">
                            INR Inclusive of Taxes
                          </span>
                        </div>
                      </div>
                    </div>

                {/* Promo Code Form */}
                <div className="pt-2 border-t border-[#E9E5DC]">
                  {appliedDiscount ? (
                    <div data-testid="applied-promo" className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5" />
                        <span>Code <strong>{appliedDiscount.code}</strong> applied ({appliedDiscount.label})</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="text-emerald-800 hover:text-emerald-950 p-1"
                        aria-label="Remove promo code"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-2">
                      <label htmlFor="promo-code" className="text-xs font-mono uppercase tracking-wider text-[#777B60]">
                        Promotional Coupon
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="promo-code"
                          type="text"
                          placeholder="e.g. TANGENT10 or STUDIO20"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-[#E9E5DC] rounded-none focus:outline-none focus:border-[#20211E] uppercase"
                        />
                        <Button variant="outline" size="sm" type="submit" className="text-xs">
                          Apply
                        </Button>
                      </div>
                      {promoMessage && (
                        <p className={`text-xs ${promoMessage.success ? 'text-emerald-700' : 'text-red-700'}`}>
                          {promoMessage.text}
                        </p>
                      )}
                      <p className="text-[11px] text-[#777B60] font-sans">
                        Tip: Enter <strong>TANGENT10</strong> for 10% off or <strong>STUDIO20</strong> for 20% off.
                      </p>
                    </form>
                  )}
                </div>

                    {/* Checkout Button */}
                    <Link to="/checkout" className="block pt-2">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full py-4 text-xs font-mono uppercase tracking-wider gap-2 flex items-center justify-center cursor-pointer"
                      >
                        <span>Proceed to Simulated Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>

                    {/* Trust badges */}
                    <div className="pt-2 text-center text-[11px] text-[#797C72] font-mono flex items-center justify-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#777B60]" />
                      <span>Demonstration Checkout • No Payment Conducted</span>
                    </div>
                  </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
