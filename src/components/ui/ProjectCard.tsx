import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types/project'
import { ImageFrame } from './ImageFrame'
import { formatCategoryLabel } from '@/lib/formatters'
import { cn } from '@/lib/utils'

export interface ProjectCardProps {
  project: Project
  aspectRatio?: 'landscape' | 'portrait' | 'square'
  className?: string
  priority?: boolean
}

export function ProjectCard({
  project,
  aspectRatio = 'landscape',
  className,
  priority = false,
}: ProjectCardProps) {
  return (
    <article className={cn('group flex flex-col gap-4 text-left', className)}>
      <Link
        to={`/projects/${project.slug}`}
        className="block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E] rounded-md"
        aria-label={`View case study for ${project.title}`}
      >
        <ImageFrame
          src={project.coverImage.url}
          alt={project.coverImage.alt}
          aspectRatio={aspectRatio}
          priority={priority}
          hoverZoom
        />
      </Link>

      <div className="space-y-2">
        {/* Metadata tag line */}
        <div className="flex items-center justify-between text-xs font-sans text-[#797C72] tracking-[0.14em] uppercase">
          <span>{formatCategoryLabel(project.category)}</span>
          <span>{project.location} · {project.year}</span>
        </div>

        {/* Project Title and Link */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors leading-tight">
            <Link to={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <Link
            to={`/projects/${project.slug}`}
            className="p-1.5 text-[#53554D] group-hover:text-[#20211E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            aria-hidden="true"
            tabIndex={-1}
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Excerpt */}
        {project.excerpt && (
          <p className="font-sans text-sm text-[#53554D] leading-relaxed line-clamp-2">
            {project.excerpt}
          </p>
        )}
      </div>
    </article>
  )
}
