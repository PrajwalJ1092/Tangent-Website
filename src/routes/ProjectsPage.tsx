import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import type { ProjectCategory } from '@/types/project'
import { PROJECTS, getProjectsByCategory } from '@/data/projects'
import {
  Container,
  PageHeading,
  Breadcrumbs,
  ImageFrame,
  Badge,
  Button,
  EmptyState,
} from '@/components/ui'
import { formatCategoryLabel } from '@/lib/formatters'
import { cn } from '@/lib/utils'

type FilterCategory = ProjectCategory | 'all'

const CATEGORY_TABS: { label: string; value: FilterCategory }[] = [
  { label: 'All Commissions', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Interior', value: 'interior' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Conceptual', value: 'conceptual' },
]

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')

  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(activeCategory)
  }, [activeCategory])

  return (
    <div className="py-10 space-y-12">
      {/* Editorial Header */}
      <Container>
        <PageHeading
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: 'Studio Home', to: '/' },
                { label: 'Architectural Projects' },
              ]}
            />
          }
          title="Selected Commissions &amp; Spatial Works"
          subtitle="A comprehensive monograph of built residential pavilions, civic exhibition halls, interior sanctuaries, and conceptual acoustic environments."
        />
      </Container>

      {/* Filter Bar & Project Count */}
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E9E5DC]">
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

          {/* Project Count Indicator */}
          <div className="flex items-center gap-2 font-sans text-xs text-[#797C72] tracking-[0.12em] uppercase shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#777B60]" />
            <span>
              Showing {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'Project' : 'Projects'} of {PROJECTS.length}
            </span>
          </div>
        </div>
      </Container>

      {/* Asymmetric Portfolio Grid */}
      <Container>
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No Commissions in this Category"
            description="There are currently no architectural projects cataloged under the selected filter."
            actionLabel="View All Commissions"
            onAction={() => setActiveCategory('all')}
          />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                // Compose an asymmetric publication layout:
                // Pattern:
                // idx 0: 8 cols (hero landscape)
                // idx 1: 4 cols (portrait)
                // idx 2: 6 cols (landscape)
                // idx 3: 6 cols (landscape)
                // idx 4: 4 cols (portrait)
                // idx 5: 8 cols (landscape)
                const isHeroRow = idx % 5 === 0
                const isPortraitSpan = idx % 5 === 1 || idx % 5 === 4
                const spanClass = isHeroRow
                  ? 'md:col-span-8'
                  : isPortraitSpan
                  ? 'md:col-span-4'
                  : 'md:col-span-6'

                const aspectRatio = isPortraitSpan ? 'portrait' : 'landscape'

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={cn('group flex flex-col gap-4 text-left', spanClass)}
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
                      aria-label={`View ${project.title} monograph case study`}
                    >
                      <ImageFrame
                        src={project.coverImage.url}
                        alt={project.coverImage.alt}
                        aspectRatio={aspectRatio}
                        hoverZoom
                      />
                    </Link>

                    <div className="space-y-2 pt-1">
                      {/* Quiet metadata row */}
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
                            {project.title}
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
      </Container>
    </div>
  )
}
