import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, SlidersHorizontal, LayoutGrid, List } from 'lucide-react'
import type { ProjectCategory } from '@/types/project'
import { PROJECTS, getProjectsByCategory } from '@/data/projects'
import {
  Container,
  Breadcrumbs,
  Badge,
  Button,
  EmptyState,
} from '@/components/ui'
import {
  ScrollReveal,
  MaskedText,
  ImageReveal,
  CardHover,
  HoverUnderline,
} from '@/components/motion'
import { ProjectIndexView } from '@/components/projects'
import { formatCategoryLabel } from '@/lib/formatters'
import { cn } from '@/lib/utils'

type FilterCategory = ProjectCategory | 'all'
type ViewMode = 'grid' | 'index'

const CATEGORY_TABS: { label: string; value: FilterCategory }[] = [
  { label: 'All Commissions', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Interior', value: 'interior' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Conceptual', value: 'conceptual' },
]

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(activeCategory)
  }, [activeCategory])

  return (
    <div className="py-10 space-y-12">
      {/* Editorial Header with Masked Typography */}
      <Container>
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Studio Home', to: '/' },
              { label: 'Architectural Projects' },
            ]}
          />
          <div className="space-y-4 max-w-4xl text-left">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#777B60] block">
              Monograph Archive · Vol. 01–06
            </span>
            <MaskedText
              as="h1"
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#20211E] leading-[1.05]"
            >
              Selected Commissions & Spatial Works
            </MaskedText>
            <ScrollReveal delay={0.2}>
              <p className="font-sans text-lg sm:text-xl text-[#53554D] font-light leading-relaxed max-w-3xl">
                A comprehensive monograph of built residential pavilions, civic exhibition halls,
                interior sanctuaries, and conceptual acoustic environments.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </Container>

      {/* Filter Bar, View Mode Toggle & Project Count */}
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E9E5DC]">
          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="Project Categories"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.value
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.value)}
                  className={cn(
                    'font-sans text-xs uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]',
                    isActive
                      ? 'bg-[#20211E] text-[#F6F4EF] font-medium shadow-sm'
                      : 'bg-transparent text-[#53554D] hover:text-[#20211E] hover:bg-[#E9E5DC]/60',
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Right controls: View Switcher & Counter */}
          <div className="flex items-center gap-5 justify-between md:justify-end shrink-0">
            {/* View Mode Toggle: Grid vs Monograph Index */}
            <div
              role="group"
              aria-label="Archive view mode"
              className="flex items-center p-1 bg-[#EFECE3] rounded-lg border border-[#E9E5DC]"
            >
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                aria-label="Grid view"
                className={cn(
                  'p-1.5 rounded transition-all flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase cursor-pointer',
                  viewMode === 'grid'
                    ? 'bg-[#FCFAF6] text-[#20211E] shadow-xs font-medium'
                    : 'text-[#797C72] hover:text-[#20211E]',
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('index')}
                aria-pressed={viewMode === 'index'}
                aria-label="Index view"
                className={cn(
                  'p-1.5 rounded transition-all flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase cursor-pointer',
                  viewMode === 'index'
                    ? 'bg-[#FCFAF6] text-[#20211E] shadow-xs font-medium'
                    : 'text-[#797C72] hover:text-[#20211E]',
                )}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Index</span>
              </button>
            </div>

            {/* Project Count Indicator */}
            <div className="flex items-center gap-2 font-sans text-xs text-[#797C72] tracking-[0.12em] uppercase">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#777B60]" />
              <span>
                Showing {filteredProjects.length}{' '}
                {filteredProjects.length === 1 ? 'Project' : 'Projects'} of {PROJECTS.length}
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Main Content Area */}
      <Container>
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No Commissions in this Category"
            description="There are currently no architectural projects cataloged under the selected filter."
            actionLabel="View All Commissions"
            onAction={() => setActiveCategory('all')}
          />
        ) : viewMode === 'index' ? (
          /* Interactive Monograph Index Mode */
          <ProjectIndexView projects={filteredProjects} />
        ) : (
          /* Asymmetric Portfolio Grid */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                // Compose an asymmetric publication layout:
                const isHeroRow = idx % 5 === 0
                const isPortraitSpan = idx % 5 === 1 || idx % 5 === 4
                const spanClass = isHeroRow
                  ? 'md:col-span-8'
                  : isPortraitSpan
                  ? 'md:col-span-4'
                  : 'md:col-span-6'

                const aspectRatio = isPortraitSpan ? 'aspect-[3/4]' : isHeroRow ? 'aspect-[16/9]' : 'aspect-[16/10]'

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: (idx % 4) * 0.05 }}
                    className={cn('group flex flex-col gap-4 text-left', spanClass)}
                  >
                    <CardHover lift={4} className="rounded-lg overflow-hidden">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="block overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
                        aria-label={`View ${project.title} monograph case study`}
                      >
                        <div className={cn('relative w-full overflow-hidden bg-[#E9E5DC]', aspectRatio)}>
                          <ImageReveal
                            src={project.coverImage.url}
                            alt={project.coverImage.alt}
                            direction="center"
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                          />
                        </div>
                      </Link>
                    </CardHover>

                    <div className="space-y-2 pt-1">
                      {/* Metadata row */}
                      <div className="flex items-center justify-between text-xs font-sans text-[#797C72] tracking-[0.14em] uppercase">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#777B60]">
                            {formatCategoryLabel(project.category)}
                          </span>
                          <span>·</span>
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{project.year}</span>
                          {project.status === 'concept' ? (
                            <Badge variant="accent">Concept</Badge>
                          ) : (
                            <span className="text-[10px] text-[#797C72] uppercase font-mono">
                              {project.area || 'Built'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Explore arrow */}
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors leading-tight">
                          <Link to={`/projects/${project.slug}`}>
                            <HoverUnderline>
                              {project.title}
                            </HoverUnderline>
                          </Link>
                        </h2>
                        <Link
                          to={`/projects/${project.slug}`}
                          className="p-1 text-[#53554D] group-hover:text-[#20211E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                          aria-hidden="true"
                          tabIndex={-1}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </Link>
                      </div>

                      {/* Brief description */}
                      <p className="font-sans text-sm text-[#53554D] font-light leading-relaxed line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>

      {/* Bottom Editorial Inquiry Strip */}
      <Container>
        <ScrollReveal>
          <div className="border-t border-[#E9E5DC] pt-12 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-[#20211E]">
                Commission a Project
              </h3>
              <p className="font-sans text-sm text-[#53554D] font-light">
                We accept a limited number of bespoke architectural commissions annually.
              </p>
            </div>
            <Link to="/contact">
              <Button size="md" className="gap-2">
                Initiate Project Brief <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  )
}
