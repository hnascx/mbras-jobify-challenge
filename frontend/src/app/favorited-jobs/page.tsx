"use client"

import {
  EmptyState,
  FavoriteJobsList,
  LoadingState,
} from "@/components/FavoriteJobsStates"
import { useUser } from "@/contexts/UserContext"
import { useFavoriteJobs, useToggleFavorite } from "@/hooks/useFavoriteJobs"
import { useEffect, useState } from "react"

export default function FavoritedJobs() {
  const { userId } = useUser()
  const { data: favorites = [], isLoading } = useFavoriteJobs(userId)
  const toggleFavorite = useToggleFavorite(userId)
  const [hasInitialLoad, setHasInitialLoad] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setHasInitialLoad(true)
    }
  }, [isLoading])

  const handleUnfavorite = async (jobId: string) => {
    await toggleFavorite.mutateAsync(jobId)
  }

  if (isLoading || !hasInitialLoad) {
    return <LoadingState />
  }

  if (hasInitialLoad && !favorites.length) {
    return <EmptyState />
  }

  return (
    <div className="space-y-7">
      <FavoriteJobsList favorites={favorites} onUnfavorite={handleUnfavorite} />
    </div>
  )
}
