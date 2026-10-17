import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/data/projects'
import { formatCategoryLabel } from '@/lib/formatters'

export function InteractiveProjectIndex() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const displayProjects = PROJECTS.slice(0, 5)
  const activeProject = displayProjects[activeProjectIndex] || displayProjects[0]!

  return (
    <div className="pt-8">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Project Index List (7 cols) */}
        <div className="lg:col-span-7 divide-y divide-[#E9E5DC] border-y border-[#E9E5DC]">
          {displayProjects.map((project, idx) => {
            const isCurrent = idx === activeProjectIndex
            return (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                onMouseEnter={() => setActiveProjectIndex(idx)}
                onFocus={() => setActiveProjectIndex(idx)}
                className={`group block py-5 sm:py-6 px-2 sm:px-4 transition-all duration-300 ${
                  isCurrent ? 'bg-[#EFECE3]/60' : 'hover:bg-[#FCFAF6]'
                }`}
                aria-label={`Examine commission 0${idx + 1}: ${project.title}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-xs text-[#777B60] tracking-widest font-semibold">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4
                        className={`font-serif text-xl sm:text-2xl md:text-3xl transition-colors duration-200 ${
                          isCurrent
                            ? 'text-[#20211E] font-medium'
                            : 'text-[#53554D] group-hover:text-[#20211E]'
                        }`}
                      >
                        {project.title}
                      </h4>
                      <p className="font-sans text-xs text-[#797C72] tracking-wider uppercase pt-0.5">
                        {formatCategoryLabel(project.category)} · {project.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:self-center mt-2 sm:mt-0 font-mono text-xs text-[#797C72]">
                    <span className="text-[11px] tracking-widest">{project.year}</span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#20211E] text-white border-[#20211E]'
                          : 'border-[#E9E5DC] group-hover:border-[#20211E] group-hover:text-[#20211E]'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Right Column: Dynamic Companion Image Preview Stage (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 hidden lg:block">
          <div className="relative border border-[#E9E5DC] bg-white p-3 shadow-editorial overflow-hidden rounded-sm">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#EFECE6]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.id}
                  src={activeProject.coverImage.url}
                  alt={activeProject.coverImage.alt}
                  initial={{ opacity: 0.2, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.1, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Technical Overlay Annotation */}
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-[#20211E] bg-[#F6F4EF]/95 backdrop-blur-sm px-3 py-2 border border-[#E9E5DC] flex items-center justify-between">
                <span className="truncate pr-2 font-medium">{activeProject.title}</span>
                <span className="shrink-0 text-[#777B60] uppercase tracking-wider text-[10px]">
                  {activeProject.area || 'Architectural Commission'}
                </span>
              </div>
            </div>

            <div className="p-3 pt-4 space-y-2 text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#777B60] block">
                Archival Record Specimen
              </span>
              <p className="font-sans text-xs text-[#53554D] leading-relaxed line-clamp-2 font-light">
                {activeProject.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
