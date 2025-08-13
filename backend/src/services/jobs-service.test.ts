import axios from "axios"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { JobsService } from "./jobs-service"

describe("JobsService", () => {
  let jobsService: JobsService

  beforeEach(() => {
    jobsService = new JobsService()
  })

  describe("findAll", () => {
    it("should return paginated jobs", async () => {
      const mockJobs = {
        job_count: 2,
        jobs: [
          {
            id: 1,
            title: "Software Engineer",
            company_name: "Tech Corp",
            category: "software-development",
            url: "https://example.com/job/1",
            company_logo: "https://example.com/logo.png",
            tags: ["javascript"],
            job_type: "full_time",
            publication_date: "2024-02-14",
            candidate_required_location: "Remote",
            salary: "$100k",
            description: "Job description",
          },
          {
            id: 2,
            title: "Frontend Developer",
            company_name: "Web Corp",
            category: "frontend",
            url: "https://example.com/job/2",
            company_logo: "https://example.com/logo.png",
            tags: ["react"],
            job_type: "full_time",
            publication_date: "2024-02-14",
            candidate_required_location: "Remote",
            salary: "$90k",
            description: "Job description",
          },
        ],
      }

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockJobs })

      const result = await jobsService.findAll({ limit: 1, page: 1 })

      expect(result.jobs).toHaveLength(1)
      expect(result.totalJobs).toBe(2)
      expect(result.totalPages).toBe(2)
    })

    it("should filter jobs by category", async () => {
      const mockJobs = {
        job_count: 2,
        jobs: [
          {
            id: 1,
            title: "Software Engineer",
            company_name: "Tech Corp",
            category: "software-development",
            url: "https://example.com/job/1",
            company_logo: "https://example.com/logo.png",
            tags: ["javascript"],
            job_type: "full_time",
            publication_date: "2024-02-14",
            candidate_required_location: "Remote",
            salary: "$100k",
            description: "Job description",
          },
          {
            id: 2,
            title: "Frontend Developer",
            company_name: "Web Corp",
            category: "frontend",
            url: "https://example.com/job/2",
            company_logo: "https://example.com/logo.png",
            tags: ["react"],
            job_type: "full_time",
            publication_date: "2024-02-14",
            candidate_required_location: "Remote",
            salary: "$90k",
            description: "Job description",
          },
        ],
      }

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockJobs })

      const result = await jobsService.findAll({ category: "frontend" })

      expect(result.jobs).toHaveLength(1)
      expect(result.jobs[0].category).toBe("frontend")
    })
  })

  describe("findById", () => {
    it("should return a job by id", async () => {
      const mockJobs = {
        job_count: 1,
        jobs: [
          {
            id: 1,
            title: "Software Engineer",
            company_name: "Tech Corp",
            category: "software-development",
            url: "https://example.com/job/1",
            company_logo: "https://example.com/logo.png",
            tags: ["javascript"],
            job_type: "full_time",
            publication_date: "2024-02-14",
            candidate_required_location: "Remote",
            salary: "$100k",
            description: "Job description",
          },
        ],
      }

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockJobs })

      const result = await jobsService.findById(1)

      expect(result).toEqual(mockJobs.jobs[0])
    })

    it("should return null when job is not found", async () => {
      const mockJobs = {
        job_count: 0,
        jobs: [],
      }

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockJobs })

      const result = await jobsService.findById(999)

      expect(result).toBeNull()
    })
  })
})
