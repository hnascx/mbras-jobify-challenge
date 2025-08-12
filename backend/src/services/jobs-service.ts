import axios from "axios"
import { jobsResponseSchema } from "../schemas/jobs"
import { Job, JobsResponse } from "../types/jobs"

const REMOTIVE_API_URL = "https://remotive.com/api/remote-jobs"

interface FindAllParams {
  category?: string
  search?: string
  page?: number
  limit?: number
}

export class JobsService {
  async findAll(params: FindAllParams = {}) {
    const response = await axios.get<JobsResponse>(REMOTIVE_API_URL)
    const parsedData = jobsResponseSchema.safeParse(response.data)

    if (!parsedData.success) {
      throw new Error("Invalid API response format")
    }

    let jobs = parsedData.data.jobs

    // Apply filters
    if (params.category) {
      jobs = jobs.filter((job) =>
        job.category.toLowerCase().includes(params.category!.toLowerCase())
      )
    }

    if (params.search) {
      const searchTerm = params.search.toLowerCase()
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company_name.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
      )
    }

    // Apply pagination
    const page = params.page || 1
    const limit = params.limit || 10
    const start = (page - 1) * limit
    const end = start + limit

    return {
      jobs: jobs.slice(start, end),
      total: jobs.length,
      page,
      limit,
      totalPages: Math.ceil(jobs.length / limit),
    }
  }

  async findById(id: string): Promise<Job | null> {
    const response = await axios.get<JobsResponse>(REMOTIVE_API_URL)
    const parsedData = jobsResponseSchema.safeParse(response.data)

    if (!parsedData.success) {
      throw new Error("Invalid API response format")
    }

    const job = parsedData.data.jobs.find((job) => job.id === Number(id))
    return job || null
  }
}
