import { Link } from 'react-router-dom'
import {
  Compass,
  Layers,
  Sun,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Users,
} from 'lucide-react'
import {
  Container,
  PageHeading,
  Breadcrumbs,
  Button,
  Badge,
  ImageFrame,
} from '@/components/ui'
import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
  CardHover,
} from '@/components/motion'
import { STUDIO_CONFIG } from '@/data/studioInfo'
import { PROJECTS } from '@/data/projects'
import { ARCHITECTURAL_ASSETS } from '@/data/assets'

export function AboutPage() {
  const selectedCommissions = PROJECTS.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="py-10 space-y-20">
      {/* Editorial Header */}
      <Container>
        <ScrollReveal variant="fade-up" duration={0.6}>
          <PageHeading
            breadcrumbs={
              <Breadcrumbs
                items={[
                  { label: 'Studio Home', to: '/' },
                  { label: 'Studio Practice' },
                ]}
              />
            }
            title="Monolithic Restraint & Material Honesty"
            subtitle="Tangent Studio is an architectural practice and spatial research atelier. We conceive residential pavilions, cultural galleries, and tactile interior environments defined by structural order, raw materials, and calibrated daylight."
          />
        </ScrollReveal>

        {/* Monograph Lead Image Banner with Architectural Reveal */}
        <ScrollReveal variant="clip-up" duration={0.9} delay={0.2} className="mt-10">
          <div className="border border-[#E9E5DC] bg-[#EFECE6]/40 overflow-hidden relative">
            <ImageFrame
              src={ARCHITECTURAL_ASSETS.nordicPavilion!.url}
              alt="Tangent Studio Architectural Practice Monograph"
              aspectRatio="wide"
              className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#20211E]/90 backdrop-blur-md px-4 py-2 text-white border border-[#20211E]/40 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#777B60] animate-pulse" />
              <span>Practice Monograph • Founded on Architectural Craft</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* Philosophy Section */}
      <section className="border-y border-[#E9E5DC] bg-[#FCFAF6] py-16">
        <Container>
          <ScrollReveal variant="fade-up" duration={0.6}>
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono uppercase tracking-widest text-[#777B60] mb-2">
                Spatial Philosophy
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#20211E] leading-tight">
                Quiet permanence over ephemeral novelty
              </h2>
              <p className="mt-4 text-sm text-[#53554D] leading-relaxed">
                We reject transient architectural styles in pursuit of tectonic clarity. By stripping away extraneous decorative veneer, our buildings expose their structural logic, weathering gracefully with time.
              </p>
            </div>
          </ScrollReveal>

          <StaggerGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <CardHover lift={4} className="h-full">
                <div className="p-8 border border-[#E9E5DC] bg-white space-y-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#20211E]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-[#20211E]">
                    01. Tectonic Honesty
                  </h3>
                  <p className="text-xs text-[#53554D] leading-relaxed font-sans">
                    Every joint, reveal, and beam is expressed with intentional structural truth. Monolithic cast concrete, raw local timbers, and honed stone speak for themselves without artificial surface treatments.
                  </p>
                </div>
              </CardHover>
            </StaggerItem>

            <StaggerItem>
              <CardHover lift={4} className="h-full">
                <div className="p-8 border border-[#E9E5DC] bg-white space-y-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#20211E]">
                    <Sun className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-[#20211E]">
                    02. Calibrated Daylighting
                  </h3>
                  <p className="text-xs text-[#53554D] leading-relaxed font-sans">
                    Light is our primary construction medium. Deep fenestrations, clerestories, and lightwells are positioned according to solar azimuths to transform rooms as daily hours shift.
                  </p>
                </div>
              </CardHover>
            </StaggerItem>

            <StaggerItem>
              <CardHover lift={4} className="h-full">
                <div className="p-8 border border-[#E9E5DC] bg-white space-y-4 h-full">
                  <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#20211E]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-[#20211E]">
                    03. Digital-Physical Reciprocity
                  </h3>
                  <p className="text-xs text-[#53554D] leading-relaxed font-sans">
                    We develop full physical 1:1 material mocks alongside sub-millimeter BIM models, ensuring that architectural concepts translate seamlessly into built reality on site.
                  </p>
                </div>
              </CardHover>
            </StaggerItem>
          </StaggerGroup>
        </Container>
      </section>

      {/* Disciplinary Scope */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal variant="fade-up" duration={0.6} className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#777B60]">
              Disciplinary Scope
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#20211E] leading-tight">
              A continuous dialogue between structure and atmosphere
            </h2>
            <div className="space-y-4 text-xs font-sans text-[#53554D] leading-relaxed">
              <p>
                Our practice does not differentiate between the exterior building shell and the interior tactile experience. A bespoke joinery reveal in an intimate bedroom sanctuary shares the exact spatial proportions and datum lines as the exterior timber colonnade.
              </p>
              <p>
                From rural private retreats to civic exhibition spaces, our process begins with listening to the landscape, understanding local geological strata, and collaborating closely with generational stonemasons and joiners.
              </p>
            </div>

            <div className="space-y-3 pt-2 font-mono text-xs text-[#20211E]">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-800" />
                <span>Bespoke residential architecture &amp; private monographs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-800" />
                <span>Civic, institutional &amp; acoustic exhibition halls</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-800" />
                <span>Interior spatial architecture, joinery schedules &amp; lighting</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale-subtle" duration={0.8} delay={0.2} className="lg:col-span-6">
            <div className="border border-[#E9E5DC] bg-[#EFECE6]/40 p-3">
              <ImageFrame
                src={ARCHITECTURAL_ASSETS.kyotoAtelier?.url || ''}
                alt="Tangent Studio Interior Architecture Workshop"
                aspectRatio="landscape"
                className="w-full object-cover"
              />
              <div className="p-3 text-[11px] font-mono text-[#53554D] flex justify-between items-center">
                <span>Material prototype review</span>
                <span>Kyoto Workshop Commission</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>

      {/* 4-Stage Design Process */}
      <section className="border-t border-[#E9E5DC] bg-[#FCFAF6] py-16">
        <Container>
          <ScrollReveal variant="fade-up" duration={0.6}>
            <div className="max-w-xl mb-12">
              <div className="text-xs font-mono uppercase tracking-widest text-[#777B60] mb-2">
                Methodology
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#20211E]">
                Four-stage architectural journey
              </h2>
              <p className="mt-3 text-xs text-[#53554D] leading-relaxed">
                Our commission lifecycle is structured to balance conceptual exploration with uncompromising engineering rigor.
              </p>
            </div>
          </ScrollReveal>

          <StaggerGroup stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <CardHover lift={3} className="h-full">
                <div className="p-6 border border-[#E9E5DC] bg-white space-y-3 h-full">
                  <div className="text-xs font-mono text-[#777B60]">Stage 01</div>
                  <h3 className="font-serif text-lg text-[#20211E]">
                    Inquiry &amp; Context
                  </h3>
                  <p className="text-xs text-[#53554D] leading-relaxed font-sans">
                    Deep topographic surveying, solar orientation studies, acoustic baseline analysis, and rigorous brief definition.
                  </p>
                </div>
              </CardHover>
            </StaggerItem>

            <StaggerItem>
              <CardHover lift={3} className="h-full">
                <div className="p-6 border border-[#E9E5DC] bg-white space-y-3 h-full">
                  <div className="text-xs font-mono text-[#777B60]">Stage 02</div>
                  <h3 className="font-serif text-lg text-[#20211E]">
                    Tectonic Studies
                  </h3>
                  <p className="text-xs text-[#53554D] leading-relaxed font-sans">
                    Physical model casting, tactile material palettes, volumetric proportioning, and initial structural schema.
                  </p>
                </div>
              </CardHover>
            </StaggerItem>

            <StaggerItem>
              <CardHover lift={3} className="h-full">
                <div className="p-6 border border-[#E9E5DC] bg-white space-y-3 h-full">
                  <div className="text-xs font-mono text-[#777B60]">Stage 03</div>
                  <h3 className="font-serif text-lg text-[#20211E]">
                    Computational Rigor
                  </h3>
                  <p className="text-xs text-[#53554D] leading-relaxed font-sans">
                    Full BIM parameterization, photometric daylight simulation, thermal analysis, and MEP coordination.
                  </p>
                </div>
              </CardHover>
            </StaggerItem>

            <StaggerItem>
              <CardHover lift={3} className="h-full">
                <div className="p-6 border border-[#E9E5DC] bg-white space-y-3 h-full">
                  <div className="text-xs font-mono text-[#777B60]">Stage 04</div>
                  <h3 className="font-serif text-lg text-[#20211E]">
                    Precision Realization
                  </h3>
                  <p className="text-xs text-[#53554D] leading-relaxed font-sans">
                    1:5 joinery detail packages, site administration, artisan coordination, and final commission documentation.
                  </p>
                </div>
              </CardHover>
            </StaggerItem>
          </StaggerGroup>
        </Container>
      </section>

      {/* Team & Leadership */}
      <Container>
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E9E5DC]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60] mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Studio Leadership</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E]">
                Architectural Direction &amp; Leadership
              </h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono text-[#777B60] border-[#E9E5DC] self-start sm:self-auto">
              Configurable Studio Roles
            </Badge>
          </div>
        </ScrollReveal>

        <StaggerGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STUDIO_CONFIG.team.map((member) => (
            <StaggerItem key={member.id}>
              <CardHover lift={4} className="h-full">
                <div className="p-6 border border-[#E9E5DC] bg-white space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#777B60] block">
                        {member.discipline}
                      </span>
                      <h3 className="font-serif text-xl text-[#20211E]">
                        {member.name}
                      </h3>
                      <div className="text-xs font-mono text-[#53554D]">
                        {member.role}
                      </div>
                    </div>

                    <p className="text-xs text-[#53554D] leading-relaxed font-sans pt-2 border-t border-[#E9E5DC]">
                      {member.bio}
                    </p>
                  </div>

                  <div className="text-[11px] font-mono text-[#777B60] flex items-center gap-1.5 pt-4">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#777B60]" />
                    <span>Configurable in studioInfo.ts</span>
                  </div>
                </div>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>

      {/* Selected Built Projects Showcase */}
      <section className="border-t border-[#E9E5DC] bg-[#FCFAF6] py-16">
        <Container>
          <ScrollReveal variant="fade-up" duration={0.6}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#777B60] mb-2">
                  Portfolio Monograph
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E]">
                  Selected Architectural Commissions
                </h2>
              </div>
              <Link
                to="/projects"
                className="text-xs font-mono uppercase tracking-wider text-[#777B60] hover:text-[#20211E] transition-colors flex items-center gap-1 group"
              >
                <span>View Complete Monograph Archive</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </ScrollReveal>

          <StaggerGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedCommissions.map((project) => (
              <StaggerItem key={project.id}>
                <CardHover lift={4} className="h-full">
                  <div className="group border border-[#E9E5DC] bg-white overflow-hidden flex flex-col justify-between p-4 h-full">
                    <div className="space-y-3">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="block overflow-hidden"
                        aria-label={`View details for ${project.title}`}
                      >
                        <ImageFrame
                          src={project.coverImage.url}
                          alt={project.coverImage.alt}
                          aspectRatio="landscape"
                          hoverZoom
                        />
                      </Link>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#777B60] block">
                          {project.category} · {project.year}
                        </span>
                        <h3 className="font-serif text-lg text-[#20211E] group-hover:text-[#777B60] transition-colors line-clamp-1">
                          <Link to={`/projects/${project.slug}`}>
                            {project.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-[#53554D] line-clamp-2 leading-relaxed">
                          {project.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E9E5DC] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#777B60]">{project.location}</span>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 text-[#20211E] hover:text-[#777B60]"
                      >
                        Plate Details →
                      </Link>
                    </div>
                  </div>
                </CardHover>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Contact CTA */}
      <Container>
        <ScrollReveal variant="scale-subtle" duration={0.8}>
          <div className="border border-[#20211E] bg-[#20211E] text-white p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E9E5DC]/80 block">
                Commissions &amp; Inquiries
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F4EF]">
                Initiate a spatial dialogue with our practice
              </h2>
              <p className="text-xs text-[#E9E5DC]/80 leading-relaxed font-sans">
                We welcome prospective residential commissions, institutional competitions, and commercial interior architecture dialogues worldwide.
              </p>
            </div>

            <div className="shrink-0">
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-[#20211E] hover:bg-[#F6F4EF] border-white font-mono uppercase tracking-widest text-xs px-6 py-4 flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <span>Commission an Inquiry</span>
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
