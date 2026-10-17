import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ARCHITECTURAL_ASSETS } from '@/data/assets'
import { STUDIO_CONFIG } from '@/data/studioInfo'

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll scrubbing for cinematic hero parallax and scale expansion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Transform values for hero image and typography
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -40])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-[#20211E] text-[#F6F4EF]"
      aria-label="Cinematic Studio Hero"
    >
      {/* Background Architectural Canvas with Parallax & Scale Drift */}
      <motion.div
        className="absolute inset-0 z-0 origin-center will-change-transform"
        style={{ scale: imageScale, y: imageY }}
      >
        <img
          src={ARCHITECTURAL_ASSETS.cinematicHeroLandscape?.url || ARCHITECTURAL_ASSETS.nordicPavilion!.url}
          alt={ARCHITECTURAL_ASSETS.cinematicHeroLandscape?.alt || 'Monolithic architecture pavilion in scandinavian pine forest'}
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Architectural atmospheric gradient scrims */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#151614] via-[#20211E]/40 to-[#151614]/75 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* Top Architectural Technical Header Strip */}
      <div className="relative z-10 w-full pt-8 sm:pt-10 px-6 sm:px-10 lg:px-16 border-b border-white/10 backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.22em] text-[#E9E5DC]/80">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#777B60] animate-pulse" />
            <span className="font-sans font-medium text-white tracking-[0.24em]">
              {STUDIO_CONFIG.studioName}
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-[#D3CDC0]">Practice &amp; Digital Archive</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#D3CDC0]/90">
            <span>Lat 47.3769° N, 8.5417° E</span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline">Zurich · Copenhagen · Bengaluru</span>
          </div>
        </div>
      </div>

      {/* Hero Center Editorial Typography and Intent */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 max-w-7xl mx-auto w-full">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Studio Volume Monograph Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.2em] text-[#E9E5DC]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#777B60]" />
            <span>Monograph Vol. 04 / Architectural Commission &amp; Spatial Tectonics</span>
          </motion.div>

          {/* Masked Monumental Headline */}
          <div className="space-y-2">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '115%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight text-white leading-[0.98] text-balance"
              >
                Formed by Light. Grounded in Matter.
              </motion.h1>
            </div>
          </div>

          {/* Editorial Philosophy Statement and Direct Actions */}
          <div className="grid md:grid-cols-12 gap-8 items-end pt-2 border-t border-white/15">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7 font-sans text-base sm:text-lg text-[#E9E5DC]/90 font-light leading-relaxed max-w-2xl"
            >
              Spaces shaped by light, material and intention. Tangent Studio bridges physical architecture and digital craft—constructing residential sanctuaries and producing rigorous design documentation tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 flex flex-wrap items-center gap-4 sm:justify-end"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-white text-[#20211E] font-mono text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#E9E5DC] transition-all duration-300 shadow-floating hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-black/40 text-white border border-white/20 backdrop-blur-md font-mono text-xs uppercase tracking-[0.14em] hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Discover the Shop</span>
                <ArrowUpRight className="w-4 h-4 text-[#777B60] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Architectural Scroll Indicator with animated line */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-5 border-t border-white/10 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-[#D3CDC0]">
          <span className="uppercase tracking-[0.2em] text-[11px] hidden sm:inline">
            Tectonic Precision · Structural Honesty · Spatial Atmosphere
          </span>
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <span className="uppercase tracking-[0.18em] text-[11px]">Scroll to Explore Monograph</span>
            <div className="w-10 h-[1.5px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="w-4 h-full bg-[#777B60]"
                animate={{ x: [-16, 40] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
