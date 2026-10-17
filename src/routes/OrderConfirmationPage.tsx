import { useMemo } from 'react'
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
} from 'lucide-react'
import { useCart } from '@/context'
import {
  Container,
  PageHeading,
  Breadcrumbs,
  Button,
  Badge,
  EmptyState,
} from '@/components/ui'
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
      <Container>
        {/* Navigation & Header */}
        <PageHeading
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: 'Studio Home', to: '/' },
                { label: 'Digital Marketplace', to: '/shop' },
                { label: 'Order Confirmation' },
              ]}
            />
          }
          title="Simulated Order Receipt"
          subtitle="Your demo transaction has been processed in the prototype environment. Zero financial charges were incurred."
        />

        {/* Confirmation Status Banner */}
        <div className="mt-8 p-6 border border-emerald-300 bg-emerald-50/70 space-y-4">
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
                className="text-xs gap-1.5 bg-white border-[#E9E5DC] text-[#20211E]"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Receipt
              </Button>
              <Link to="/shop">
                <Button variant="primary" size="sm" className="text-xs gap-1.5">
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

        {/* 2-Column Monograph Order Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Licensed Asset Package & Download Links (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-[#E9E5DC] bg-white p-6 space-y-6">
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
                    className="p-5 border border-[#E9E5DC] bg-[#FCFAF6] space-y-4"
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
                          alert(
                            `[Prototype Simulation]\n\nIn a production deployment, this triggers an encrypted, signed CDN download for "${item.productName}" archive bundle.\n\nIncluded files:\n• ${item.includedFiles.join('\n• ')}`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#20211E] text-white hover:bg-[#3A3B36] transition-colors shrink-0"
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

              <div className="p-4 border border-[#E9E5DC] bg-white text-xs text-[#53554D] leading-relaxed">
                <span className="font-semibold text-[#20211E]">Fulfillment Note: </span>
                All download packages in this demonstration are fictional mock archives. Permanent access tokens and tax invoices are linked to customer identifier <strong>{order.customer.email}</strong>.
              </div>
            </div>
          </div>

          {/* Right: Invoice Summary & Customer Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Monograph Invoice Breakdown */}
            <div className="border border-[#E9E5DC] bg-white p-6 space-y-5">
              <h3 className="font-serif text-lg text-[#20211E] pb-3 border-b border-[#E9E5DC]">
                Simulated Monograph Invoice
              </h3>

              <div className="space-y-3 text-xs font-mono divide-y divide-[#E9E5DC]">
                <div className="flex justify-between text-[#53554D] pb-3">
                  <span>Subtotal</span>
                  <span className="text-[#20211E] font-medium">
                    {formatPaiseToInr(order.pricing.subtotalInPaise)}
                  </span>
                </div>

                {order.pricing.discountInPaise > 0 && (
                  <div className="flex justify-between text-emerald-800 pt-3 pb-3">
                    <span>Discount Applied ({order.pricing.discountCode})</span>
                    <span className="font-medium">
                      -{formatPaiseToInr(order.pricing.discountInPaise)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[#53554D] pt-3 pb-3">
                  <span>Estimated 18% GST</span>
                  <span className="text-[#20211E] font-medium">
                    {formatPaiseToInr(order.pricing.estimatedTaxInPaise)}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-4 text-sm">
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

            {/* Customer & Billing Snapshot */}
            <div className="border border-[#E9E5DC] bg-white p-6 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#777B60] pb-2 border-b border-[#E9E5DC]">
                Architect &amp; Practice Details
              </h4>
              <div className="space-y-2 text-xs font-sans text-[#53554D]">
                <div>
                  <span className="text-[#777B60] font-mono text-[11px] block">Client Name</span>
                  <span className="text-[#20211E] font-medium">{order.customer.fullName}</span>
                </div>
                <div>
                  <span className="text-[#777B60] font-mono text-[11px] block">Email</span>
                  <span className="text-[#20211E] font-medium">{order.customer.email}</span>
                </div>
                {order.customer.studioName && (
                  <div>
                    <span className="text-[#777B60] font-mono text-[11px] block">Studio / Practice</span>
                    <span className="text-[#20211E] font-medium">{order.customer.studioName}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#777B60] font-mono text-[11px] block">Billing Jurisdiction</span>
                  <span className="text-[#20211E] font-medium">
                    {order.customer.stateProvince}, {order.customer.postalCode}, {order.customer.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Production Architecture Reminder */}
            <div className="p-4 border border-[#E9E5DC] bg-[#FCFAF6] text-xs text-[#53554D] space-y-1.5">
              <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[#20211E]">
                <ShieldCheck className="w-4 h-4 text-[#777B60]" />
                <span>Future Gateway Boundary</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                When the production payment provider (e.g. Razorpay or Stripe) is connected, this order confirmation view will receive validated order signatures and signed download keys via server-side webhooks.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
