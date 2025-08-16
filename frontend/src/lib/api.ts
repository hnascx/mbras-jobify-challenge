import axios from "axios"

const USER_ID_KEY = "@jobify:userId"

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
})

// Interceptor para adicionar o userId em todas as requisições
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem(USER_ID_KEY)

  if (userId) {
    config.headers["X-User-Id"] = userId
  }

  return config
})

export interface Job {
  id: number
  title: string
  company_name: string
  company_logo: string
  category: string
  description: string
  url: string
}

export interface JobsResponse {
  jobs: Job[]
  total: number
  page: number
  totalPages: number
}

export const jobsApi = {
  list: async (params?: {
    category?: string
    search?: string
    page?: number
  }) => {
    const response = await api.get<JobsResponse>("/jobs", { params })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<Job>(`/job/${id}`)
    return response.data
  },

  getFavorites: async () => {
    const response = await api.get<Job[]>("/favorited-jobs")
    return response.data
  },

  toggleFavorite: async (jobId: string) => {
    const response = await api.post<{ favorited: boolean }>(
      "/favorited-jobs/toggle",
      {
        jobId,
      }
    )
    return response.data
  },
}
