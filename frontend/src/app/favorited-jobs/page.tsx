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
      console.error("Erro ao carregar favoritos:", error)
      toast.error("Falha ao carregar favoritos")
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
      toast.success(`Vaga removida dos favoritos`)
    } catch (error) {
      console.error("Erro ao remover vaga dos favoritos:", error)
      toast.error("Falha ao remover vaga dos favoritos")
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
          <h2 className="text-lg font-semibold">ID do usuário não encontrado</h2>
          <p className="text-muted-foreground">
            Por favor, atualize a página para gerar um ID de usuário.
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
          <h2 className="text-lg font-semibold">Nenhuma vaga favoritada</h2>
          <p className="text-muted-foreground">
            As vagas que você favoritar aparecerão aqui. Vá explorar algumas vagas!
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Vagas favoritadas</h1>
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
