"use client"

import { JobSkeleton } from "@/components/JobSkeleton"
import { PageTransition } from "@/components/PageTransition"
import { ShareButton } from "@/components/ShareButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useUser } from "@/contexts/UserContext"
import { api } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

interface Job {
  id: number
  title: string
  company_name: string
  company_logo: string | null
  category: string
  candidate_required_location: string
  job_type: string
  salary: string
  description: string
  url: string
}

interface JobDetailsProps {
  id: string
}

export function JobDetails({ id }: JobDetailsProps) {
  const router = useRouter()
  const { userId } = useUser()
  const [job, setJob] = useState<Job | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadJob = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await api.get(`/job/${id}`)
      setJob(response.data)
    } catch (error) {
      setError("Failed to load job details")
      console.error("Error loading job:", error)
      toast.error("Failed to load job details")
    } finally {
      setIsLoading(false)
    }
  }, [id])

  const checkFavoriteStatus = useCallback(async () => {
    if (!userId || !job) return

    try {
      const response = await api.get("/favorited-jobs")
      const favorites = response.data
      setIsFavorited(
        favorites.some((fav: any) => fav.jobId === job.id.toString())
      )
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }, [userId, job])

  const toggleFavorite = async () => {
    if (!job) return

    try {
      const response = await api.post("/favorited-jobs/toggle", {
        jobId: job.id.toString(),
      })
      setIsFavorited(response.data.favorited)
      toast.success(
        response.data.favorited
          ? `Added ${job.title} to favorites`
          : `Removed ${job.title} from favorites`
      )
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast.error("Failed to update favorite status")
    }
  }

  useEffect(() => {
    loadJob()
  }, [loadJob])

  useEffect(() => {
    checkFavoriteStatus()
  }, [checkFavoriteStatus])

  if (isLoading) {
    return <JobSkeleton />
  }

  if (error || !job) {
    return (
      <Card className="p-6">
        <div
          className="text-center space-y-4"
          role="alert"
          aria-label="Error loading job"
        >
          <h2 className="text-lg font-semibold text-destructive">
            {error || "Job not found"}
          </h2>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <PageTransition>
      <article className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{job.title}</h1>
            <p
              className="text-base sm:text-lg text-muted-foreground"
              aria-label="Company name"
            >
              {job.company_name}
            </p>
          </div>
          <div className="flex gap-2 self-start">
            <ShareButton
              title={job.title}
              url={typeof window !== "undefined" ? window.location.href : ""}
            />
            {userId && (
              <Button
                variant={isFavorited ? "default" : "outline"}
                onClick={toggleFavorite}
                aria-label={
                  isFavorited
                    ? `Remove ${job.title} from favorites`
                    : `Add ${job.title} to favorites`
                }
                aria-pressed={isFavorited}
                className="whitespace-nowrap"
              >
                {isFavorited ? "Unfavorite" : "Favorite"}
              </Button>
            )}
          </div>
        </header>

        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Job details"
        >
          <Badge
            variant="outline"
            role="listitem"
            aria-label={`Category: ${job.category}`}
            className="text-xs sm:text-sm"
          >
            {job.category}
          </Badge>
          <Badge
            variant="secondary"
            role="listitem"
            aria-label={`Location: ${job.candidate_required_location}`}
            className="text-xs sm:text-sm"
          >
            {job.candidate_required_location}
          </Badge>
          <Badge
            role="listitem"
            aria-label={`Job type: ${job.job_type}`}
            className="text-xs sm:text-sm"
          >
            {job.job_type}
          </Badge>
          {job.salary && (
            <Badge
              variant="outline"
              role="listitem"
              aria-label={`Salary: ${job.salary}`}
              className="text-xs sm:text-sm"
            >
              {job.salary}
            </Badge>
          )}
        </div>

        {job.company_logo && (
          <div className="flex justify-center py-4" aria-label="Company logo">
            <img
              src={job.company_logo}
              alt={`${job.company_name} logo`}
              className="max-h-16 sm:max-h-24 object-contain"
            />
          </div>
        )}

        <div
          className="prose prose-sm sm:prose-base prose-zinc dark:prose-invert max-w-none"
          role="region"
          aria-label="Job description"
        >
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto gap-2"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto"
            aria-label={`Apply for ${job.title} position at ${job.company_name}`}
          >
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
        </div>
      </article>
    </PageTransition>
  )
}
