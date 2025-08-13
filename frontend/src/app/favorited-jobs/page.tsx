"use client"

import { JobCard } from "@/components/JobCard"
import { Card } from "@/components/ui/card"
import { useUser } from "@/contexts/UserContext"
import { api } from "@/lib/api"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

interface FavoriteJob {
  jobId: string
  jobData: {
    id: number
    title: string
    company_name: string
    category: string
    candidate_required_location: string
    job_type: string
  }
}

export default function FavoritedJobs() {
  const { userId } = useUser()
  const [favorites, setFavorites] = useState<FavoriteJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get("/favorited-jobs")
      setFavorites(response.data)
    } catch (error) {
      console.error("Error loading favorites:", error)
      toast.error("Failed to load favorite jobs")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleUnfavorite = async (jobId: string) => {
    try {
      const job = favorites.find((fav) => fav.jobId === jobId)
      if (!job) return

      await api.post("/favorited-jobs/toggle", { jobId })
      setFavorites((prev) => prev.filter((fav) => fav.jobId !== jobId))
      toast.success(`Removed ${job.jobData.title} from favorites`)
    } catch (error) {
      console.error("Error unfavoriting job:", error)
      toast.error("Failed to remove job from favorites")
    }
  }

  useEffect(() => {
    if (userId) {
      loadFavorites()
    }
  }, [userId, loadFavorites])

  if (!userId) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold">No User ID Found</h2>
          <p className="text-muted-foreground">
            Please refresh the page to generate a user ID.
          </p>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="space-y-4 p-6 border rounded-lg animate-pulse"
          >
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold">No Favorited Jobs</h2>
          <p className="text-muted-foreground">
            Jobs you favorite will appear here. Go browse some jobs!
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Favorited Jobs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => (
          <JobCard
            key={favorite.jobId}
            id={favorite.jobData.id}
            title={favorite.jobData.title}
            companyName={favorite.jobData.company_name}
            category={favorite.jobData.category}
            location={favorite.jobData.candidate_required_location}
            type={favorite.jobData.job_type}
            isFavorited={true}
            onFavoriteClick={() => handleUnfavorite(favorite.jobId)}
          />
        ))}
      </div>
    </div>
  )
}
