"use client"

import { JobDetailsSkeleton } from "@/components/JobDetailsSkeleton"
import { useUserId } from "@/hooks/useUserId"
import { api } from "@/lib/api"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { JobDetails } from "./JobDetails"

interface Job {
  id: number
  title: string
  company_name: string
  company_logo: string | null
  category: string
  candidate_required_location: string
  job_type: string
  description: string
  salary: string | null
  publication_date: string
}

export default function JobPage() {
  const params = useParams()
  const id = params.id as string
  const userId = useUserId()
  const [job, setJob] = useState<Job | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchJob = useCallback(async () => {
    try {
      setIsLoading(true)
      setIsError(false)

      const [jobResponse, favoriteResponse] = await Promise.all([
        api.get(`/job/${id}`),
        userId
          ? api.get(`/favorited-jobs`, {
              headers: { "X-User-Id": userId },
            })
          : Promise.resolve({ data: [] }),
      ])

      setJob(jobResponse.data)
      setIsFavorited(
        favoriteResponse.data.some((fav: { jobId: string }) => fav.jobId === id)
      )
    } catch (error) {
      console.error(error)
      setIsError(true)
      toast.error("Erro ao carregar vaga")
    } finally {
      setIsLoading(false)
    }
  }, [id, userId])

  useEffect(() => {
    fetchJob()
  }, [fetchJob])

  const handleFavoriteClick = async () => {
    if (!userId) return

    try {
      const response = await api.post(
        "/favorited-jobs/toggle",
        { jobId: id },
        { headers: { "X-User-Id": userId } }
      )
      setIsFavorited(response.data.isFavorited)
      toast.success(
        response.data.isFavorited
          ? "Vaga adicionada aos favoritos"
          : "Vaga removida dos favoritos"
      )
    } catch (error) {
      console.error(error)
      toast.error("Erro ao favoritar vaga")
    }
  }

  if (isLoading) {
    return <JobDetailsSkeleton />
  }

  if (isError || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
        <h1 className="text-2xl font-bold mb-4">Vaga não encontrada</h1>
        <p className="text-muted-foreground">
          A vaga que você está procurando não existe ou foi removida.
        </p>
      </div>
    )
  }

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
      isFavorited={isFavorited}
      onFavoriteClick={handleFavoriteClick}
    />
  )
}
