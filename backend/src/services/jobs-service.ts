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
    try {
      const response = await axios.get<JobsResponse>(REMOTIVE_API_URL)
      const parsedData = jobsResponseSchema.safeParse({
        job_count: response.data.jobs.length,
        jobs: response.data.jobs,
      })

      if (!parsedData.success) {
        throw new Error("Invalid API response format")
      }

      let jobs = parsedData.data.jobs

      // Apply filters
      if (params.category) {
        jobs = jobs.filter((job) =>
          job.category?.toLowerCase().includes(params.category!.toLowerCase())
        )
      }

      if (params.search) {
        const searchTerm = params.search.toLowerCase()
        jobs = jobs.filter(
          (job) =>
            job.title?.toLowerCase().includes(searchTerm) ||
            job.company_name?.toLowerCase().includes(searchTerm) ||
            job.description?.toLowerCase().includes(searchTerm)
        )
      }

      // Apply pagination
      const page = params.page || 1
      const limit = params.limit || 20
      const start = (page - 1) * limit
      const end = start + limit
      const paginatedJobs = jobs.slice(start, end)

      return {
        jobs: paginatedJobs,
        totalJobs: jobs.length,
        page,
        itemsPerPage: limit,
        totalPages: Math.ceil(jobs.length / limit),
      }
    } catch (error) {
      throw error
    }
  }

  async findById(id: number): Promise<Job | null> {
    try {
      const response = await axios.get<JobsResponse>(REMOTIVE_API_URL)
      const parsedData = jobsResponseSchema.safeParse({
        job_count: response.data.jobs.length,
        jobs: response.data.jobs,
      })

      if (!parsedData.success) {
        throw new Error("Invalid API response format")
      }

      const job = parsedData.data.jobs.find((job) => job.id === id)
      return job || null
    } catch (error) {
      throw error
    }
  }
}
