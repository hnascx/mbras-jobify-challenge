import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

interface Job {
  id: number
  title: string
  company_name: string
  company_logo: string | null
  category: string
  candidate_required_location: string
  description: string
}

interface JobsResponse {
  jobs: Job[]
  totalJobs: number
}

export function useJobs(page: number, category?: string, search?: string) {
  return useQuery({
    queryKey: ["jobs", page, category, search],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) params.append("search", search)
      if (category && category !== "all") params.append("category", category)
      params.append("page", page.toString())
      params.append("limit", "20")

      const response = await api.get<JobsResponse>(`/jobs?${params.toString()}`)
      return response.data
    },
  })
}
