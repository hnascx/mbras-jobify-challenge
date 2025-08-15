import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

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
  url: string
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await api.get<Job>(`/job/${id}`)
      return response.data
    },
  })
}
