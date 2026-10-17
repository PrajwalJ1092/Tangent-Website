import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShieldAlert,
  Lock,
  FileCheck,
  Tag,
  User,
  MapPin,
  Loader2,
} from 'lucide-react'
import { useCart } from '@/context'
import {
  Container,
  Breadcrumbs,
  Button,
} from '@/components/ui'
import {
  ScrollReveal,
  MaskedText,
  CardHover,
} from '@/components/motion'
import { formatPaiseToInr } from '@/lib/formatters'
import type { CheckoutFormData } from '@/types/cart'

export function CheckoutPage() {
  const { items, summary, placeDemoOrder, appliedDiscount } = useCart()
  const navigate = useNavigate()

  // Form State
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    studioName: '',
    country: 'India',
    stateProvince: '',
    postalCode: '',
    agreeToLicenseTerms: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect to cart if empty (unless currently submitting order)
  if (items.length === 0 && !isSubmitting) {
    return <Navigate to="/cart" replace />
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {}

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work or personal email address.'
    }

    if (!formData.stateProvince.trim()) {
      newErrors.stateProvince = 'State or province is required for tax documentation.'
    }

    if (!formData.postalCode.trim() || formData.postalCode.trim().length < 3) {
      newErrors.postalCode = 'Please enter a valid postal or PIN code.'
    }

    if (!formData.agreeToLicenseTerms) {
      newErrors.agreeToLicenseTerms =
        'You must acknowledge the studio license and prototype terms to proceed.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const order = placeDemoOrder(formData)
      navigate(`/checkout/confirmation?orderId=${encodeURIComponent(order.id)}`)
    } catch (err) {
      console.error('Order placement failed:', err)
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    field: keyof CheckoutFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="py-10 space-y-12">
      <Container>
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Studio Home', to: '/' },
              { label: 'Studio Bag', to: '/cart' },
              { label: 'Simulated Checkout' },
            ]}
          />
          <div className="space-y-4 max-w-4xl text-left">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#777B60] block">
              Direct Acquisition Monograph
            </span>
            <MaskedText
              as="h1"
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#20211E] leading-[1.05]"
            >
              Simulated Studio Checkout
            </MaskedText>
            <ScrollReveal delay={0.15}>
              <p className="font-sans text-lg sm:text-xl text-[#53554D] font-light leading-relaxed max-w-3xl">
                Complete your prototype order review. As a demonstration environment, no real payment
                credentials or financial transactions are conducted.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Demo Security Notice Banner */}
        <ScrollReveal delay={0.25}>
          <div className="mt-8 p-5 border border-[#777B60]/40 bg-[#FCFAF6] rounded-lg flex items-start gap-3.5 text-xs text-[#20211E] text-left">
            <ShieldAlert className="w-5 h-5 text-[#777B60] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold uppercase tracking-wider font-mono">
                Demo Checkout Environment
              </span>
              <p className="text-[#53554D] leading-relaxed font-light">
                This storefront is an architectural digital commerce prototype. We do <strong>NOT</strong> collect credit card numbers, CVVs, or payment passwords. Submitting this form creates a simulated demo order in client memory and tests the complete order fulfillment experience without charging any real funds.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Customer Billing Form (7 cols) */}
          <div className="lg:col-span-7 text-left">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Customer Contact */}
              <ScrollReveal>
                <div className="border border-[#E9E5DC] bg-white p-6 space-y-5 rounded-lg shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#E9E5DC] text-xs font-mono uppercase tracking-widest text-[#20211E]">
                    <User className="w-4 h-4 text-[#777B60]" />
                    <span>1. Architect / Client Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-[#20211E]">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="e.g. Ar. Elena Rostova"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                          errors.fullName ? 'border-red-600 ring-1 ring-red-600' : 'border-[#E9E5DC]'
                        } rounded-md focus:outline-none focus:border-[#20211E] transition-all text-[#20211E]`}
                      />
                      <AnimatePresence>
                        {errors.fullName && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            id="fullName-error"
                            className="text-[11px] text-red-600"
                          >
                            {errors.fullName}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#20211E]">
                        Work Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="e.g. elena@tangentstudio.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : 'email-help'}
                        className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                          errors.email ? 'border-red-600 ring-1 ring-red-600' : 'border-[#E9E5DC]'
                        } rounded-md focus:outline-none focus:border-[#20211E] transition-all text-[#20211E]`}
                      />
                      <p id="email-help" className="text-[11px] text-[#777B60]">
                        Simulated download receipt and access tokens will be delivered to this email.
                      </p>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            id="email-error"
                            className="text-[11px] text-red-600"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label htmlFor="studioName" className="block text-xs font-mono uppercase tracking-wider text-[#53554D]">
                        Architecture Practice / Studio Name <span className="text-neutral-400 font-sans">(Optional)</span>
                      </label>
                      <input
                        id="studioName"
                        type="text"
                        placeholder="e.g. Rostova &amp; Partners Architects"
                        value={formData.studioName}
                        onChange={(e) => handleInputChange('studioName', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E9E5DC] rounded-md focus:outline-none focus:border-[#20211E] transition-all text-[#20211E]"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Billing Location (No CC info) */}
              <ScrollReveal delay={0.1}>
                <div className="border border-[#E9E5DC] bg-white p-6 space-y-5 rounded-lg shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#E9E5DC] text-xs font-mono uppercase tracking-widest text-[#20211E]">
                    <MapPin className="w-4 h-4 text-[#777B60]" />
                    <span>2. Practice Billing Location</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="country" className="block text-xs font-mono uppercase tracking-wider text-[#20211E]">
                        Country / Region
                      </label>
                      <select
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-[#E9E5DC] rounded-md focus:outline-none focus:border-[#20211E] text-[#20211E] cursor-pointer"
                      >
                        <option value="India">India (INR)</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="stateProvince" className="block text-xs font-mono uppercase tracking-wider text-[#20211E]">
                        State / Province <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="stateProvince"
                        type="text"
                        required
                        placeholder="e.g. Karnataka / Maharashtra"
                        value={formData.stateProvince}
                        onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                        aria-invalid={!!errors.stateProvince}
                        aria-describedby={errors.stateProvince ? 'stateProvince-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                          errors.stateProvince ? 'border-red-600 ring-1 ring-red-600' : 'border-[#E9E5DC]'
                        } rounded-md focus:outline-none focus:border-[#20211E] transition-all text-[#20211E]`}
                      />
                      <AnimatePresence>
                        {errors.stateProvince && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            id="stateProvince-error"
                            className="text-[11px] text-red-600"
                          >
                            {errors.stateProvince}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label htmlFor="postalCode" className="block text-xs font-mono uppercase tracking-wider text-[#20211E]">
                        Postal / PIN Code <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="postalCode"
                        type="text"
                        required
                        placeholder="e.g. 560001"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        aria-invalid={!!errors.postalCode}
                        aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                          errors.postalCode ? 'border-red-600 ring-1 ring-red-600' : 'border-[#E9E5DC]'
                        } rounded-md focus:outline-none focus:border-[#20211E] transition-all text-[#20211E]`}
                      />
                      <AnimatePresence>
                        {errors.postalCode && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            id="postalCode-error"
                            className="text-[11px] text-red-600"
                          >
                            {errors.postalCode}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* License Agreement & Terms */}
              <ScrollReveal delay={0.15}>
                <div className="border border-[#E9E5DC] bg-white p-6 space-y-4 rounded-lg shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#E9E5DC] text-xs font-mono uppercase tracking-widest text-[#20211E]">
                    <FileCheck className="w-4 h-4 text-[#777B60]" />
                    <span>3. Perpetual License Acknowledgement</span>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="agreeToLicenseTerms" className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id="agreeToLicenseTerms"
                        checked={formData.agreeToLicenseTerms}
                        onChange={(e) => handleInputChange('agreeToLicenseTerms', e.target.checked)}
                        aria-invalid={!!errors.agreeToLicenseTerms}
                        aria-describedby={errors.agreeToLicenseTerms ? 'terms-error' : undefined}
                        className="mt-1 h-4 w-4 rounded border-[#E9E5DC] text-[#20211E] focus:ring-[#20211E] cursor-pointer"
                      />
                      <span className="text-xs text-[#53554D] leading-relaxed">
                        I understand and agree to the <strong>Tangent Studio Digital License Agreement</strong>. I understand that assets are licensed for commercial studio visualization and construction document usage, and raw 3D mesh or file redistribution is strictly prohibited. I also acknowledge this is a <strong>simulated prototype order</strong> with zero actual monetary charge.
                      </span>
                    </label>
                    <AnimatePresence>
                      {errors.agreeToLicenseTerms && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          id="terms-error"
                          className="text-[11px] text-red-600 pl-7"
                        >
                          {errors.agreeToLicenseTerms}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>

              {/* Submit CTA */}
              <ScrollReveal delay={0.2}>
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 bg-[#20211E] text-white hover:bg-[#3A3B36] cursor-pointer rounded-lg shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Simulated Demo Order...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          Place Demo Order ({formatPaiseToInr(summary.totalInPaise)}) — No Payment
                        </span>
                      </>
                    )}
                  </Button>
                  <p className="mt-2 text-center text-[11px] font-mono text-[#777B60]">
                    Immediate simulated confirmation and archive link overview on the next screen.
                  </p>
                </div>
              </ScrollReveal>
            </form>
          </div>

          {/* Right: Order Summary Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <ScrollReveal>
              <CardHover lift={2}>
                <div className="border border-[#E9E5DC] bg-white p-6 space-y-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9E5DC]">
                    <h2 className="font-serif text-lg text-[#20211E]">
                      Order Items ({items.length})
                    </h2>
                    <Link
                      to="/cart"
                      className="text-xs font-mono text-[#777B60] hover:text-[#20211E] underline underline-offset-4"
                    >
                      Edit Bag
                    </Link>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-[#E9E5DC] max-h-72 overflow-y-auto pr-1 space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 shrink-0 border border-[#E9E5DC] rounded bg-[#EFECE6]/40 overflow-hidden">
                            <img
                              src={item.product.coverImage.url}
                              alt={item.product.coverImage.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="font-serif text-xs text-[#20211E] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <div className="text-[10px] font-mono text-[#777B60]">
                              Qty: {item.quantity} · {item.license} license
                            </div>
                          </div>
                        </div>
                        <div className="font-mono text-xs text-[#20211E] shrink-0">
                          {formatPaiseToInr(item.lineTotalInPaise)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="pt-4 border-t border-[#E9E5DC] space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between text-[#53554D]">
                      <span>Subtotal</span>
                      <span className="text-[#20211E] font-medium">
                        {formatPaiseToInr(summary.subtotalInPaise)}
                      </span>
                    </div>

                    {summary.discountInPaise > 0 && (
                      <div className="flex justify-between text-emerald-800">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          Promo ({appliedDiscount?.code})
                        </span>
                        <span className="font-medium">
                          -{formatPaiseToInr(summary.discountInPaise)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#53554D]">
                      <span>Estimated 18% GST</span>
                      <span className="text-[#20211E] font-medium">
                        {formatPaiseToInr(summary.estimatedTaxInPaise)}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-3 border-t border-[#E9E5DC] text-sm">
                      <span className="font-serif text-base text-[#20211E]">
                        Order Total
                      </span>
                      <span className="font-serif text-xl text-[#20211E]">
                        {formatPaiseToInr(summary.totalInPaise)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHover>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </div>
  )
}
