import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Container, PageHeading, Breadcrumbs, Button, SEO } from '@/components/ui'
import { ScrollReveal } from '@/components/motion'

interface FaqItem {
  question: string
  answer: string
  category: 'Commissions & Practice' | 'Digital Products & Licensing' | 'Billing & Operations'
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Commissions & Practice',
    question: 'What types of architectural commissions does The Tangent Collaborative accept?',
    answer:
      'We focus on bespoke private residential pavilions, alpine retreats, cultural exhibition galleries, and spatial interior architecture. We intentionally limit our active concurrent projects to maintain direct partner-level oversight on every detail.',
  },
  {
    category: 'Commissions & Practice',
    question: 'How does the studio manage international or remote commissions?',
    answer:
      'We operate across Karnataka—serving Bangalore, Vijayapura, and Hubballi—alongside select national and international commissions. Initial schematic design and BIM coordination are conducted digitally with photogrammetric terrain surveys. During the realization stage, our architects perform on-site audits, 1:1 millwork reviews, and supervise critical structural casting alongside local executive architects and artisans.',
  },
  {
    category: 'Commissions & Practice',
    question: 'What is the typical timeline for an architectural monograph commission?',
    answer:
      'Residential commissions typically range from 14 to 28 months depending on municipal zoning, site complexity, and artisan joinery fabrication schedules. Schematic designs and 3D daylighting simulations are typically presented within 8 to 12 weeks of brief sign-off.',
  },
  {
    category: 'Digital Products & Licensing',
    question: 'What is included in digital 3D scene files and material packs?',
    answer:
      'Our scene files are packaged with native Blender 4.2+ files, Cycles and EEVEE shader setups, calibrated lighting rigs, and 8K seamless PBR texture maps (albedo, roughness, normal, displacement). All digital files include our Commercial License for professional client renderings and marketing presentations.',
  },
  {
    category: 'Digital Products & Licensing',
    question: 'Can digital resources be used in client commercial projects?',
    answer:
      'Yes. Our Standard Commercial License permits unlimited client commercial visualization, marketing collateral, and publication usage. The only restriction is that raw source files or 3D geometries cannot be redistributed, resold, or packaged as competing stock assets.',
  },
  {
    category: 'Digital Products & Licensing',
    question: 'How do I access my purchased digital assets?',
    answer:
      'Immediately upon simulated demo checkout confirmation, you receive a generated license key and direct simulated download triggers. In a live production configuration, download links are delivered instantly via secure, signed CDN links sent to your work email.',
  },
  {
    category: 'Billing & Operations',
    question: 'Why are prices displayed in Indian Rupees (INR ₹)?',
    answer:
      'The Tangent Collaborative operates across Karnataka, India—serving Bangalore, Vijayapura, and Hubballi (Hubli)—alongside international commissions. All marketplace pricing is anchored in INR with authoritative paise precision.',
  },
  {
    category: 'Billing & Operations',
    question: 'Is the online checkout on this website live or simulated?',
    answer:
      'This website currently features an interactive demonstration checkout environment. No actual payment gateway credentials or credit cards are processed or stored. Simulated orders generate verifiable demo reference codes and license keys.',
  },
]

export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const categories = ['All', 'Commissions & Practice', 'Digital Products & Licensing', 'Billing & Operations']

  const filteredFaqs =
    activeCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory)

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx)
  }

  return (
    <div className="py-10 space-y-16">
      <SEO
        title="Frequently Asked Questions"
        description="Transparent disclosures on The Tangent Collaborative architectural commissions, digital asset licensing terms, and studio operations across Bangalore, Vijayapura, and Hubballi."
      />
      <Container>
        <ScrollReveal variant="fade-up" duration={0.6}>
          <PageHeading
            breadcrumbs={
              <Breadcrumbs
                items={[
                  { label: 'Studio Home', to: '/' },
                  { label: 'Frequently Asked Questions' },
                ]}
              />
            }
            title="Frequently Asked Questions"
            subtitle="Transparent disclosures on our architectural practice methodology, digital resource licensing terms, and commission workflows."
          />
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal variant="fade-in" duration={0.5} delay={0.15} className="mt-10">
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E9E5DC]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setExpandedIndex(null)
                }}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#20211E] text-white shadow-sm'
                    : 'bg-[#FCFAF6] text-[#53554D] border border-[#E9E5DC] hover:border-[#20211E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* FAQ Accordion List */}
        <div className="mt-10 max-w-3xl space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx

            return (
              <ScrollReveal key={idx} variant="fade-up" duration={0.4}>
                <div className="border border-[#E9E5DC] bg-white transition-colors">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isExpanded}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E]"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#777B60] block">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-lg text-[#20211E]">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border border-[#E9E5DC] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 bg-[#EFECE6]' : 'bg-transparent'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-[#20211E]" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-xs leading-relaxed text-[#53554D] font-sans border-t border-[#E9E5DC]/60 bg-[#FCFAF6]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Have more questions card */}
        <ScrollReveal variant="fade-up" duration={0.6} className="mt-16 max-w-3xl">
          <div className="p-8 border border-[#E9E5DC] bg-[#EFECE6]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#777B60] block">
                Direct Atelier Dialogue
              </span>
              <h4 className="font-serif text-xl text-[#20211E]">
                Have a specific question not addressed here?
              </h4>
              <p className="text-xs text-[#53554D]">
                Our partners and licensing team are available for technical and spatial inquiries.
              </p>
            </div>

            <Link to="/contact">
              <Button
                variant="primary"
                size="md"
                className="font-mono text-xs uppercase tracking-wider whitespace-nowrap bg-[#20211E] text-white hover:bg-[#3A3B36] flex items-center gap-2"
              >
                <span>Inquire Directly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  )
}
