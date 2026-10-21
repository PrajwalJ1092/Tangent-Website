import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Home, Layers, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SEO } from '@/components/ui/SEO'
import { ScrollReveal, MaskedText, CardHover } from '@/components/motion'

export function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 sm:py-32 text-center max-w-xl mx-auto space-y-6">
      <SEO
        title="404 — Page Not Found"
        description="The requested spatial reference does not exist or has been relocated within The Tangent Collaborative archive."
      />
      <ScrollReveal variant="fade-up" duration={0.6}>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFECE6]/60 border border-[#E9E5DC] text-[11px] font-mono uppercase tracking-widest text-[#777B60]">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Coordinate Reference Disconnected</span>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-in" duration={0.7} delay={0.1}>
        <span className="text-7xl sm:text-8xl font-light text-[#777B60]/70 font-mono tracking-tighter block">
          404
        </span>
      </ScrollReveal>

      <div className="space-y-3">
        <MaskedText as="h1" delay={0.2} className="font-serif text-3xl sm:text-4xl text-[#20211E]">
          Page Not Found
        </MaskedText>
        <ScrollReveal variant="fade-up" duration={0.6} delay={0.3}>
          <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light max-w-md mx-auto">
            The requested spatial reference does not exist or has been relocated within the studio archive. Please navigate back to one of our primary monograph zones below.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fade-up" duration={0.6} delay={0.4} className="w-full pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <CardHover lift={2}>
            <Link
              to="/"
              className="p-4 border border-[#E9E5DC] bg-white flex flex-col justify-between h-full group hover:border-[#20211E] transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#777B60]">
                <span>Home</span>
                <Home className="w-3.5 h-3.5" />
              </div>
              <div className="pt-3 font-serif text-sm text-[#20211E] group-hover:text-[#777B60] transition-colors flex items-center justify-between">
                <span>Studio Main</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </CardHover>

          <CardHover lift={2}>
            <Link
              to="/projects"
              className="p-4 border border-[#E9E5DC] bg-white flex flex-col justify-between h-full group hover:border-[#20211E] transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#777B60]">
                <span>Work</span>
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="pt-3 font-serif text-sm text-[#20211E] group-hover:text-[#777B60] transition-colors flex items-center justify-between">
                <span>Built Projects</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </CardHover>

          <CardHover lift={2}>
            <Link
              to="/shop"
              className="p-4 border border-[#E9E5DC] bg-white flex flex-col justify-between h-full group hover:border-[#20211E] transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#777B60]">
                <span>Store</span>
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <div className="pt-3 font-serif text-sm text-[#20211E] group-hover:text-[#777B60] transition-colors flex items-center justify-between">
                <span>Digital Assets</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </CardHover>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" duration={0.6} delay={0.5} className="pt-4">
        <Link to="/">
          <Button variant="primary" size="md" className="font-mono uppercase tracking-widest text-xs px-6 py-3">
            Return to Studio Home
          </Button>
        </Link>
      </ScrollReveal>
    </div>
  )
}
