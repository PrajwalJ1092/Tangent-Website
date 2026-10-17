import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ARCHITECTURAL_ASSETS } from '@/data/assets'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface StoryChapter {
  step: string
  label: string
  title: string
  subtitle: string
  narrative: string
  specs: { label: string; value: string }[]
  image: string
  imageAlt: string
  caption: string
  coordinates: string
}

const CHAPTERS: StoryChapter[] = [
  {
    step: '01',
    label: 'Morphology',
    title: 'Volumetric Massing & Topographical Anchor',
    subtitle: 'Engadin Monolith · St. Moritz, Switzerland',
    narrative:
      'The residence is embedded directly into the schist bedrock, presenting an impenetrable stone perimeter against alpine blizzards while framing panoramic southern valley vistas through a 16-meter continuous triple-glazed aperture.',
    specs: [
      { label: 'Conditioned Envelope', value: '480 m²' },
      { label: 'Thermal Retention', value: '88% Passive Mass' },
      { label: 'Primary Structural System', value: 'Post-Tensioned Concrete' },
    ],
    image: ARCHITECTURAL_ASSETS.monolithicVilla!.url,
    imageAlt: ARCHITECTURAL_ASSETS.monolithicVilla!.alt,
    caption: 'Figure 1.1 — Alpine topography integration and cantilevered thermal envelope.',
    coordinates: '46.4908° N, 9.8355° E',
  },
  {
    step: '02',
    label: 'Tectonics',
    title: 'Tectonic Materiality & Honed Stone',
    subtitle: 'Micro-Texture & Geological Authenticity',
    narrative:
      'We juxtapose raw board-formed cedar concrete with cross-cut Roman travertine. No synthetic coatings or fillers are applied; the stone remains open-pored, breathing with seasonal humidity variations.',
    specs: [
      { label: 'Stone Quarry', value: 'Tivoli, Italy (Cross-cut)' },
      { label: 'Formwork Grain', value: '150mm Douglas Fir' },
      { label: 'Joinery Tolerance', value: '±0.5mm Precision' },
    ],
    image: ARCHITECTURAL_ASSETS.travertineVein!.url,
    imageAlt: ARCHITECTURAL_ASSETS.travertineVein!.alt,
    caption: 'Figure 1.2 — Unfilled Roman travertine slab showing geological vein stratification.',
    coordinates: '41.9610° N, 12.7984° E',
  },
  {
    step: '03',
    label: 'Atmosphere',
    title: 'Daylight Calibration & Acoustic Silence',
    subtitle: 'Spatial Illumination & Reverberation Control',
    narrative:
      'A sunken clerestory light well channels diffused northern daylight deep into the subterranean sound salon. Micro-perforated acoustic timber paneling ensures a natural reverberation decay of 0.72 seconds.',
    specs: [
      { label: 'Ambient Daylight Target', value: '420 Lux at Noon' },
      { label: 'Acoustic RT60 Index', value: '0.72 Seconds' },
      { label: 'Luminaires', value: '2700K Concealed Linear LEDs' },
    ],
    image: ARCHITECTURAL_ASSETS.kyotoAtelier!.url,
    imageAlt: ARCHITECTURAL_ASSETS.kyotoAtelier!.alt,
    caption: 'Figure 1.3 — Diffuse ambient daylighting filtered through shoji-grade acoustic scrims.',
    coordinates: '35.0116° N, 135.7681° E',
  },
]

export function PinnedStorytelling() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance chapters smoothly unless user is hovering or interacting
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CHAPTERS.length)
    }, 7000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, activeIdx])

  const currentChapter = CHAPTERS[activeIdx]!

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % CHAPTERS.length)
  }

  return (
    <section
      className="relative bg-[#1A1B18] text-[#F6F4EF] py-16 sm:py-24 border-y border-white/10 overflow-hidden"
      aria-label="Pinned Monograph Storytelling"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-10 sm:space-y-12">
        {/* Top Header & Chapter Stepper */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#777B60] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#777B60]">
                Featured Monograph Case Study
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
              Anatomy of the Engadin Monolith
            </h2>
          </div>

          {/* Interactive 3-Phase Step Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CHAPTERS.map((ch, idx) => {
              const isActive = idx === activeIdx
              return (
                <button
                  key={ch.step}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`group text-left px-3.5 py-2 rounded-sm border transition-all duration-300 ${
                    isActive
                      ? 'border-[#777B60] bg-white/[0.08]'
                      : 'border-white/10 hover:border-white/25 bg-white/[0.02]'
                  }`}
                  aria-label={`View chapter ${ch.step}: ${ch.label}`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className={isActive ? 'text-[#777B60] font-semibold' : 'text-[#D3CDC0]/50'}>
                      {ch.step}
                    </span>
                    <span className={isActive ? 'text-white font-medium' : 'text-[#D3CDC0]/70'}>
                      {ch.label}
                    </span>
                  </div>
                  {/* Progress bar line under tab */}
                  <div className="w-full h-[2px] bg-white/10 mt-1.5 overflow-hidden rounded-full">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isActive ? 'w-full bg-[#777B60]' : 'w-0 group-hover:w-1/3 bg-white/30'
                      }`}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Center Stage: Split Screen with Pinned Image Left & Evolving Narrative Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Framed Image with Live Monograph View */}
          <div className="lg:col-span-7 relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/10] rounded-sm overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.step}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={currentChapter.image}
                  alt={currentChapter.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Technical Watermark Badges */}
                <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#F6F4EF] bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/15">
                  Live Monograph View · Fig {currentChapter.step}
                </div>

                <div className="absolute top-4 right-4 hidden sm:block text-[10px] font-mono text-[#D3CDC0]/80 bg-black/50 backdrop-blur-md px-2.5 py-1 border border-white/10">
                  {currentChapter.coordinates}
                </div>

                {/* Caption Bar */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-28 text-xs font-mono text-[#D3CDC0] bg-black/70 backdrop-blur-md px-3.5 py-2 border border-white/10">
                  {currentChapter.caption}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev/Next arrows bottom right */}
            <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/10 p-1">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 text-[#D3CDC0] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Previous chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono text-[#D3CDC0]/60 px-1">
                {currentChapter.step}/03
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 text-[#D3CDC0] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Next chapter"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Evolving Narrative & Specs */}
          <div className="lg:col-span-5 relative min-h-[360px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full space-y-6"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#777B60]">
                    Chapter {currentChapter.step} / {currentChapter.label}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
                    {currentChapter.title}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-wider text-[#D3CDC0]/70">
                    {currentChapter.subtitle}
                  </p>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#E9E5DC]/80 font-light leading-relaxed">
                  {currentChapter.narrative}
                </p>

                {/* Technical Specs Table */}
                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/10 font-mono text-xs">
                  {currentChapter.specs.map((s) => (
                    <div key={s.label} className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#D3CDC0]/60">{s.label}</span>
                      <span className="text-white font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/projects/engadin-monolith"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#777B60] hover:text-white transition-colors group"
                  >
                    <span>Examine complete project monograph</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Technical Status Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D3CDC0]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#777B60]" />
            <span>Interactive Monograph Analysis Active</span>
          </div>
          <span className="hidden sm:inline">Select chapter tabs or hover to examine tectonic specifications</span>
        </div>
      </div>
    </section>
  )
}
