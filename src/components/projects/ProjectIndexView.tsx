import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types/project'
import { formatCategoryLabel } from '@/lib/formatters'
import { Badge } from '@/components/ui'
import { useMotionSafe } from '@/lib/motionTokens'

export interface ProjectIndexViewProps {
  projects: Project[]
}

export function ProjectIndexView({ projects }: ProjectIndexViewProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(projects[0] ?? null)
  const isMotionSafe = useMotionSafe()

  const firstProject = projects[0]
  if (projects.length === 0 || !firstProject) return null

  const displayedProject = activeProject || firstProject
  if (!displayedProject) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Interactive Monograph Table (7 cols on desktop) */}
      <div className="lg:col-span-7 divide-y divide-[#E9E5DC] border-y border-[#E9E5DC]">
        {projects.map((project, index) => {
          const isSelected = displayedProject?.id === project.id
          return (
            <div
              key={project.id}
              onMouseEnter={() => setActiveProject(project)}
              onFocus={() => setActiveProject(project)}
              className={`group py-5 px-3 -mx-3 transition-colors duration-200 cursor-pointer rounded-lg ${
                isSelected ? 'bg-[#EFECE3]/70' : 'hover:bg-[#EFECE3]/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#777B60] w-6 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="font-serif text-2xl sm:text-3xl text-[#20211E] group-hover:text-[#777B60] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E] rounded"
                  >
                    {project.title}
                  </Link>
                </div>

                <div className="flex items-center gap-3 sm:shrink-0 text-xs font-sans text-[#797C72] uppercase tracking-wider pl-10 sm:pl-0">
                  <span className="text-[#53554D] font-medium">
                    {formatCategoryLabel(project.category)}
                  </span>
                  <span>·</span>
                  <span>{project.location}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Mobile / expanded preview for touch users */}
              <div className="mt-3 pl-10 flex flex-wrap items-center justify-between gap-2">
                <p className="font-sans text-xs text-[#53554D] font-light max-w-lg line-clamp-1">
                  {project.shortDescription}
                </p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 font-sans text-xs uppercase tracking-wider text-[#777B60] font-medium hover:text-[#20211E] transition-colors"
                >
                  Monograph <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sticky Companion Preview Stage (5 cols on desktop, hidden on very small viewports or shown dynamically) */}
      <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
        <div className="rounded-xl overflow-hidden border border-[#E9E5DC] bg-[#FCFAF6] shadow-sm p-4 space-y-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#E9E5DC]">
            <AnimatePresence mode="wait">
              <motion.img
                key={displayedProject?.id}
                src={displayedProject?.coverImage.url}
                alt={displayedProject?.coverImage.alt || displayedProject?.title}
                initial={isMotionSafe ? { opacity: 0, scale: 1.04 } : { opacity: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={isMotionSafe ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute top-3 left-3">
              <Badge variant="accent">
                {formatCategoryLabel(displayedProject.category)}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-left">
            <div className="flex items-center justify-between text-xs font-mono text-[#797C72]">
              <span>{displayedProject.location}</span>
              <span>{displayedProject.year} · {displayedProject.area || 'Built'}</span>
            </div>
            <h4 className="font-serif text-2xl text-[#20211E]">
              {displayedProject.title}
            </h4>
            <p className="font-sans text-xs text-[#53554D] font-light leading-relaxed">
              {displayedProject.shortDescription}
            </p>
            <div className="pt-2">
              <Link
                to={`/projects/${displayedProject.slug}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider font-medium text-[#20211E] hover:text-[#777B60] transition-colors"
              >
                Open Case Study Monograph <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
