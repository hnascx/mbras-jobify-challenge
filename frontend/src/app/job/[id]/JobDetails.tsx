"use client"

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
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded w-3/4 animate-pulse"></div>
        <div className="h-6 bg-muted rounded w-1/2 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold text-destructive">
            {error || "Job not found"}
          </h2>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-lg text-muted-foreground">{job.company_name}</p>
        </div>
        <div className="flex gap-2">
          <ShareButton
            title={job.title}
            url={typeof window !== "undefined" ? window.location.href : ""}
          />
          {userId && (
            <Button
              variant={isFavorited ? "default" : "outline"}
              onClick={toggleFavorite}
            >
              {isFavorited ? "Unfavorite" : "Favorite"}
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{job.category}</Badge>
        <Badge variant="secondary">{job.candidate_required_location}</Badge>
        <Badge>{job.job_type}</Badge>
        {job.salary && <Badge variant="outline">{job.salary}</Badge>}
      </div>

      {job.company_logo && (
        <div className="flex justify-center py-4">
          <img
            src={job.company_logo}
            alt={`${job.company_name} logo`}
            className="max-h-24 object-contain"
          />
        </div>
      )}

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button asChild>
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </Button>
      </div>
    </div>
  )
}
