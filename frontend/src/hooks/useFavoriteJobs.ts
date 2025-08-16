import { api } from "@/lib/api"
import { queryClient } from "@/lib/query"
import { FavoriteJob } from "@/types/favorites"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

interface ToggleResponse {
  isFavorited: boolean
}

export function useFavoriteJobs(userId: string | null) {
  return useQuery({
    queryKey: ["favoriteJobs", userId],
    queryFn: async () => {
      if (!userId) return []
      const response = await api.get<FavoriteJob[]>("/favorited-jobs", {
        headers: { "X-User-Id": userId },
      })
      return response.data
    },
    enabled: !!userId,
  })
}

export function useToggleFavorite(userId: string | null) {
  return useMutation({
    mutationFn: async (jobId: string) => {
      if (!userId) throw new Error("User ID is required")
      const response = await api.post<ToggleResponse>(
        "/favorited-jobs/toggle",
        { jobId },
        { headers: { "X-User-Id": userId } }
      )
      return response.data
    },
    onSuccess: (data) => {
      // Invalida o cache das queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["favoriteJobs"] })
      queryClient.invalidateQueries({ queryKey: ["job"] })
      queryClient.invalidateQueries({ queryKey: ["jobs"] })

      toast.success(
        data.isFavorited
          ? "Vaga adicionada aos favoritos"
          : "Vaga removida dos favoritos"
      )
    },
    onError: () => {
      toast.error("Erro ao atualizar favoritos")
    },
  })
}
