import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import {
  Container,
  PageHeading,
  Breadcrumbs,
  Button,
  ImageFrame,
  SEO,
} from '@/components/ui'
import {
  ScrollReveal,
  CardHover,
} from '@/components/motion'
import { STUDIO_SERVICES } from '@/data/services'

export function ServicesPage() {
  return (
    <div className="py-10 space-y-20">
      <SEO
        title="Services &amp; Architectural Disciplines"
        description="Comprehensive architecture, interior design, spatial planning, and architectural visualization services by The Tangent Collaborative across Bangalore, Vijayapura, and Hubballi."
      />
      <Container>
        <ScrollReveal variant="fade-up" duration={0.6}>
          <PageHeading
            breadcrumbs={
              <Breadcrumbs
                items={[
                  { label: 'Studio Home', to: '/' },
                  { label: 'Services & Disciplines' },
                ]}
              />
            }
            title="Architectural Disciplines & Spatial Practice"
            subtitle="Our practice conceives residential sanctuaries, civic pavilions, and computational digital assets defined by tectonic order, raw materiality, and calibrated daylight."
          />
        </ScrollReveal>

        {/* Assurance Metrics Strip */}
        <ScrollReveal variant="fade-in" duration={0.6} delay={0.15} className="mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border border-[#E9E5DC] bg-[#FCFAF6] text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase text-[#777B60] block">Coordination</span>
              <span className="font-serif text-lg text-[#20211E] font-medium">BIM Sub-Millimeter</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#777B60] block">Daylighting</span>
              <span className="font-serif text-lg text-[#20211E] font-medium">Photometric Raytrace</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#777B60] block">Envelope Standard</span>
              <span className="font-serif text-lg text-[#20211E] font-medium">Passivhaus Ready</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#777B60] block">Digital Assets</span>
              <span className="font-serif text-lg text-[#20211E] font-medium">Blender 4.2+ Cycles</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* Disciplines Detailed Sections */}
      <Container>
        <div className="space-y-24">
          {STUDIO_SERVICES.map((service, index) => {
            const isReversed = index % 2 === 1

            return (
              <ScrollReveal
                key={service.id}
                variant="fade-up"
                duration={0.7}
                className="border-t border-[#E9E5DC] pt-16"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text Content (7 cols) */}
                  <div className={`space-y-6 ${isReversed ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#777B60]">
                        {service.code}
                      </span>
                      <span className="w-8 h-[1px] bg-[#E9E5DC]" />
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-[#20211E] leading-tight">
                      {service.title}
                    </h2>

                    <p className="font-serif text-base text-[#777B60] italic">
                      "{service.tagline}"
                    </p>

                    <p className="text-sm text-[#53554D] leading-relaxed font-sans">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-3 pt-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#20211E] font-semibold block">
                        Core Commission Deliverables:
                      </span>
                      <ul className="space-y-2 text-xs font-sans text-[#53554D]">
                        {service.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <CheckCircle className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suitable For */}
                    <div className="p-4 border border-[#E9E5DC] bg-[#FCFAF6] text-xs font-sans text-[#53554D] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#777B60] block">
                        Ideal Commission Profile:
                      </span>
                      <p>{service.suitableFor}</p>
                    </div>

                    <div className="pt-2">
                      <Link to="/contact">
                        <Button
                          variant="outline"
                          size="md"
                          className="font-mono text-xs uppercase tracking-wider flex items-center gap-2 border-[#20211E] text-[#20211E] hover:bg-[#20211E] hover:text-white transition-colors"
                        >
                          <span>Commission Inquiries</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Imagery & Specifications (5 cols) */}
                  <div className={`${isReversed ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}`}>
                    <CardHover lift={4}>
                      <div className="border border-[#E9E5DC] bg-[#EFECE6]/40 p-3 space-y-4">
                        <ImageFrame
                          src={service.imageUrl}
                          alt={service.imageAlt}
                          aspectRatio="landscape"
                          className="w-full object-cover"
                        />
                        <div className="p-3 bg-white border border-[#E9E5DC] space-y-3">
                          <span className="text-[11px] font-mono uppercase text-[#777B60] block border-b border-[#E9E5DC] pb-2">
                            Technical Standards
                          </span>
                          <ul className="space-y-1.5 text-xs font-mono text-[#20211E]">
                            {service.technicalStandards.map((std, sIdx) => (
                              <li key={sIdx} className="flex items-center gap-2 text-[11px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#777B60]" />
                                <span>{std}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardHover>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>

      {/* Inquiry CTA */}
      <Container>
        <ScrollReveal variant="scale-subtle" duration={0.8}>
          <div className="border border-[#20211E] bg-[#20211E] text-white p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E9E5DC]/80 block">
                Practice Engagement
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F4EF]">
                Ready to initiate a spatial commission?
              </h2>
              <p className="text-xs text-[#E9E5DC]/80 leading-relaxed font-sans">
                Our architectural partners review all project briefs directly. We welcome residential and civic dialogues across the globe.
              </p>
            </div>

            <div className="shrink-0">
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-[#20211E] hover:bg-[#F6F4EF] border-white font-mono uppercase tracking-widest text-xs px-6 py-4 flex items-center gap-2"
                >
                  <span>Submit Commission Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  )
}
