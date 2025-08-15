"use client"

import { JobDetailsSkeleton } from "@/components/JobDetailsSkeleton"
import { useFavoriteJobs, useToggleFavorite } from "@/hooks/useFavoriteJobs"
import { useJob } from "@/hooks/useJob"
import { useUserId } from "@/hooks/useUserId"
import { useParams } from "next/navigation"
import { JobDetails } from "./JobDetails"

export default function JobPage() {
  const params = useParams()
  const id = params.id as string
  const userId = useUserId()

  const { data: job, isLoading, isError } = useJob(id)
  const { data: favoriteJobs = [] } = useFavoriteJobs(userId)
  const toggleFavorite = useToggleFavorite(userId)

  const handleFavoriteClick = async () => {
    await toggleFavorite.mutateAsync(id)
  }

  if (isLoading) {
    return <JobDetailsSkeleton />
  }

  if (isError || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
        <h1 className="text-2xl font-bold mb-4">Vaga não encontrada :(</h1>
        <p className="text-muted-foreground">
          A vaga que você está procurando não existe ou foi removida.
        </p>
      </div>
    )
  }

  const isFavorited = favoriteJobs.some((fav) => fav.jobId === id)

  return (
    <JobDetails
      id={job.id}
      title={job.title}
      companyName={job.company_name}
      companyLogo={job.company_logo || undefined}
      category={job.category}
      location={job.candidate_required_location}
      type={job.job_type}
      description={job.description}
      salary={job.salary || undefined}
      publicationDate={job.publication_date}
      url={job.url}
      isFavorited={isFavorited}
      onFavoriteClick={handleFavoriteClick}
    />
  )
}
