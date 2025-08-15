"use client"

import { JobCard } from "@/components/JobCard"
import { SingleJobSkeleton } from "@/components/SingleJobSkeleton"

interface Job {
  id: number
  title: string
  company_name: string
  company_logo: string | null
  category: string
  candidate_required_location: string
  description: string
}

interface JobListProps {
  jobs?: Job[]
  isLoading: boolean
  favoritedJobIds: string[]
  onFavoriteClick: (jobId: number) => Promise<void>
}

export function JobList({
  jobs,
  isLoading,
  favoritedJobIds,
  onFavoriteClick,
}: JobListProps) {
  if (isLoading) {
    return (
      <div aria-live="polite" aria-busy="true">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <SingleJobSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (!jobs?.length) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <p className="text-lg text-muted-foreground">
          Nenhuma vaga encontrada. Tente ajustar sua busca ou filtros.
        </p>
      </div>
    )
  }

  return (
    <div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      role="feed"
      aria-label="Lista de vagas"
      aria-busy={isLoading}
    >
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          companyName={job.company_name}
          companyLogo={job.company_logo || undefined}
          category={job.category}
          location={job.candidate_required_location}
          description={job.description}
          isFavorited={favoritedJobIds.includes(job.id.toString())}
          onFavoriteClick={() => onFavoriteClick(job.id)}
        />
      ))}
    </div>
  )
}
