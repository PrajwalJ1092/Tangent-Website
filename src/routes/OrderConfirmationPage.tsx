import { useMemo, useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  CheckCircle2,
  Download,
  Printer,
  ShieldCheck,
  Mail,
  FileCode,
  Calendar,
  ArrowRight,
  X,
  Check,
} from 'lucide-react'
import { useCart } from '@/context'
import {
  Container,
  Breadcrumbs,
  Button,
  Badge,
  EmptyState,
  SEO,
} from '@/components/ui'
import {
  ScrollReveal,
  MaskedText,
  CardHover,
} from '@/components/motion'
import { formatPaiseToInr } from '@/lib/formatters'
import type { DemoOrder } from '@/types/order'

export function OrderConfirmationPage() {
  const { lastOrder } = useCart()
  const [searchParams] = useSearchParams()
  const orderIdParam = searchParams.get('orderId')

  // Resolve order from context or sessionStorage
  const order = useMemo<DemoOrder | null>(() => {
    if (lastOrder && (!orderIdParam || lastOrder.id === orderIdParam)) {
      return lastOrder
    }
    if (typeof window !== 'undefined') {
      try {
        const raw = window.sessionStorage.getItem('tangent_studio_last_order')
        if (raw) {
          const parsed = JSON.parse(raw) as DemoOrder
          if (parsed && (!orderIdParam || parsed.id === orderIdParam)) {
            return parsed
          }
        }
      } catch {
        // Fallback gracefully
      }
    }
    return null
  }, [lastOrder, orderIdParam])

  const [downloadModalItem, setDownloadModalItem] = useState<{
    productName: string
    files: string[]
  } | null>(null)

  useEffect(() => {
    if (!downloadModalItem) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDownloadModalItem(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [downloadModalItem])

  if (!order) {
    return (
      <div className="py-20">
        <Container>
          <EmptyState
            icon={<ShieldCheck className="w-6 h-6" />}
            title="No Recent Order Found"
            description="We could not retrieve an active demo order session. Your previous simulated order may have expired or been cleared."
            actionLabel="Return to Digital Marketplace"
            actionNode={
              <Link to="/shop">
                <Button variant="primary" size="md">
                  Explore Marketplace Catalog
                </Button>
              </Link>
            }
          />
        </Container>
      </div>
    )
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="py-10 space-y-12">
      <SEO
        title="Simulated Order Receipt"
        description="Demo prototype order receipt and digital asset licensing confirmation."
      />
      <Container>
        {/* Navigation & Header with Masked Typography */}
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Studio Home', to: '/' },
              { label: 'Digital Marketplace', to: '/shop' },
              { label: 'Order Confirmation' },
            ]}
          />
          <div className="space-y-4 max-w-4xl text-left">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-800 font-semibold block">
              Direct Verification · Verified Fulfillment
            </span>
            <MaskedText
              as="h1"
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#20211E] leading-[1.05]"
            >
              Simulated Order Receipt
            </MaskedText>
            <ScrollReveal delay={0.15}>
              <p className="font-sans text-lg sm:text-xl text-[#53554D] font-light leading-relaxed max-w-3xl">
                Your demo transaction has been processed in the prototype environment. Zero financial charges were incurred.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Confirmation Status Banner */}
        <ScrollReveal delay={0.25}>
          <div className="mt-8 p-6 border border-emerald-300 bg-emerald-50/70 rounded-xl space-y-4 text-left shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold block">
                    Simulated Order Confirmed
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#20211E]">
                    Reference: {order.id}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="text-xs gap-1.5 bg-white border-[#E9E5DC] text-[#20211E] cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Receipt
                </Button>
                <Link to="/shop">
                  <Button variant="primary" size="sm" className="text-xs gap-1.5 cursor-pointer">
                    Browse Shop
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-200/60 text-xs font-sans text-emerald-950 flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-emerald-800" />
                Confirmation sent to: <strong>{order.customer.email}</strong>
              </span>
              <span>•</span>
              <span className="font-mono text-emerald-800">Status: Prototype Simulation (No Charge)</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Monograph Order Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Left: Licensed Asset Package & Download Links (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal>
              <div className="border border-[#E9E5DC] bg-white p-6 space-y-6 rounded-xl shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E9E5DC]">
                  <h3 className="font-serif text-lg text-[#20211E]">
                    Licensed Studio Downloads ({order.items.length} {order.items.length === 1 ? 'Asset' : 'Assets'})
                  </h3>
                  <span className="text-xs font-mono text-[#777B60]">Perpetual Commercial Access</span>
                </div>

                {/* Items with Mock Download Links */}
                <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 border border-[#E9E5DC] bg-[#FCFAF6] rounded-lg space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <Link
                            to={`/shop/${item.productSlug}`}
                            className="font-serif text-base text-[#20211E] hover:text-[#777B60] transition-colors"
                          >
                            {item.productName}
                          </Link>
                          <div className="flex items-center gap-2 text-xs font-mono text-[#53554D]">
                            <Badge variant="outline" className="text-[10px] py-0 border-[#E9E5DC]">
                              {item.license} license
                            </Badge>
                            <span>•</span>
                            <span>{item.quantity} {item.quantity === 1 ? 'seat' : 'seats'}</span>
                            <span>•</span>
                            <span>{formatPaiseToInr(item.lineTotalInPaise)}</span>
                          </div>
                        </div>

                        {/* Mock Download Action */}
                        <button
                          type="button"
                          onClick={() =>
                            setDownloadModalItem({
                              productName: item.productName,
                              files: item.includedFiles,
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#20211E] text-white hover:bg-[#3A3B36] transition-colors shrink-0 rounded cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Demo (.zip)</span>
                        </button>
                      </div>

                      {/* Verified Included Files inside this package */}
                      <div className="pt-3 border-t border-[#E9E5DC] text-xs font-mono space-y-1.5">
                        <div className="text-[11px] uppercase tracking-wider text-[#777B60] flex items-center gap-1">
                          <FileCode className="w-3 h-3" />
                          <span>Included Archive Package Contents:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#20211E]">
                          {item.includedFiles.map((file, fileIdx) => (
                            <div key={fileIdx} className="truncate text-[#53554D]">
                              • {file}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Commercial license reassurance note */}
                <div className="p-4 border border-[#E9E5DC] bg-[#FCFAF6] rounded-lg text-xs font-mono text-[#53554D] leading-relaxed">
                  <strong>Digital Licensing Certificate: </strong> All assets are granted under The Tangent Collaborative perpetual commercial usage terms. Download links remain active indefinitely via your account or receipt link.
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Client Receipt & Monetary Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <CardHover lift={2}>
                <div className="border border-[#E9E5DC] bg-white p-6 space-y-6 rounded-xl shadow-xs">
                  <h3 className="font-serif text-lg text-[#20211E] pb-3 border-b border-[#E9E5DC]">
                    Client Documentation
                  </h3>

                  <div className="space-y-3 text-xs font-mono text-[#53554D]">
                    <div className="flex justify-between">
                      <span className="text-[#777B60]">Client / Architect:</span>
                      <span className="text-[#20211E] font-medium">{order.customer.fullName}</span>
                    </div>
                    {order.customer.studioName && (
                      <div className="flex justify-between">
                        <span className="text-[#777B60]">Studio Practice:</span>
                        <span className="text-[#20211E]">{order.customer.studioName}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#777B60]">Billing Territory:</span>
                      <span className="text-[#20211E]">
                        {order.customer.stateProvince}, {order.customer.country} ({order.customer.postalCode})
                      </span>
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="pt-4 border-t border-[#E9E5DC] space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between text-[#53554D]">
                      <span>Catalog Subtotal</span>
                      <span className="text-[#20211E] font-medium">
                        {formatPaiseToInr(order.pricing.subtotalInPaise)}
                      </span>
                    </div>

                    {order.pricing.discountInPaise > 0 && (
                      <div className="flex justify-between text-emerald-800">
                        <span>Studio Promo Applied</span>
                        <span className="font-medium">
                          -{formatPaiseToInr(order.pricing.discountInPaise)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#53554D]">
                      <span>Estimated Tax (18% GST)</span>
                      <span className="text-[#20211E] font-medium">
                        {formatPaiseToInr(order.pricing.estimatedTaxInPaise)}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-[#E9E5DC] text-sm">
                      <span className="font-serif text-base text-[#20211E]">
                        Simulated Total Paid
                      </span>
                      <div className="text-right">
                        <span className="font-serif text-2xl text-[#20211E]">
                          {formatPaiseToInr(order.pricing.totalInPaise)}
                        </span>
                        <span className="block text-[10px] text-emerald-800 font-mono uppercase tracking-wider font-semibold">
                          ₹0 Charged (Demo Prototype)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHover>
            </ScrollReveal>
          </div>
        </div>
      </Container>

      {/* Simulated Download Delivery Modal Dialog */}
      {downloadModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
        >
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-lg border border-[#E9E5DC] shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E5DC]">
              <div className="space-y-0.5">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777B60]">
                  Encrypted CDN Distribution
                </span>
                <h3 id="download-modal-title" className="font-serif text-xl sm:text-2xl text-[#20211E]">
                  {downloadModalItem.productName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDownloadModalItem(null)}
                className="p-1 text-[#797C72] hover:text-[#20211E] rounded transition-colors cursor-pointer"
                aria-label="Close download modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-950 space-y-2 rounded">
              <div className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Simulated Secure Token Validated</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                In production, this initiates a signed CDN stream directly delivering the high-speed uncompressed .zip archive.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#20211E] block">
                Archive Package Manifest ({downloadModalItem.files.length} items):
              </span>
              <div className="max-h-40 overflow-y-auto divide-y divide-[#E9E5DC] border border-[#E9E5DC] rounded text-xs font-mono bg-[#FCFAF6]">
                {downloadModalItem.files.map((file, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between text-[#20211E]">
                    <span className="truncate pr-2 font-mono text-[11px]">📁 {file}</span>
                    <span className="text-emerald-700 text-[10px] uppercase font-semibold">Ready</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setDownloadModalItem(null)}
                className="cursor-pointer font-mono text-xs uppercase tracking-wider"
              >
                Close Dialog [ESC]
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
