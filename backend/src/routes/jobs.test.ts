import axios from "axios"
import { FastifyInstance } from "fastify"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import { prisma } from "../lib/prisma"
import { createServer } from "../server"

describe("Jobs Routes", () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await createServer()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe("GET /api/jobs", () => {
    it("should return jobs list", async () => {
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

      const response = await request(app.server).get("/api/jobs").expect(200)

      expect(response.body.jobs).toHaveLength(1)
      expect(response.body.jobs[0].title).toBe("Software Engineer")
    })
  })

  describe("GET /api/job/:id", () => {
    it("should return job details", async () => {
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

      const response = await request(app.server).get("/api/job/1").expect(200)

      expect(response.body.title).toBe("Software Engineer")
    })

    it("should return 404 for non-existent job", async () => {
      const mockJobs = {
        job_count: 0,
        jobs: [],
      }

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockJobs })

      await request(app.server).get("/api/job/999").expect(404)
    })
  })

  describe("GET /api/favorited-jobs", () => {
    it("should return user favorites", async () => {
      const mockFavorites = [
        {
          userId: "user123",
          jobId: "job123",
          jobData: {
            id: 1,
            title: "Software Engineer",
          },
          createdAt: new Date(),
        },
      ]

      vi.mocked(prisma.favoriteJob.findMany).mockResolvedValueOnce(
        mockFavorites
      )

      const response = await request(app.server)
        .get("/api/favorited-jobs")
        .set("X-User-Id", "user123")
        .expect(200)

      expect(response.body).toHaveLength(1)
      expect(response.body[0].jobData.title).toBe("Software Engineer")
    })

    it("should return 401 without user id", async () => {
      await request(app.server).get("/api/favorited-jobs").expect(401)
    })
  })

  describe("POST /api/favorited-jobs/toggle", () => {
    it("should toggle favorite status", async () => {
      const mockJob = {
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

      vi.mocked(prisma.favoriteJob.findUnique).mockResolvedValueOnce(null)
      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockJob })
      vi.mocked(prisma.favoriteJob.create).mockResolvedValueOnce({
        userId: "user123",
        jobId: "1",
        jobData: mockJob.jobs[0],
        createdAt: new Date(),
      })

      const response = await request(app.server)
        .post("/api/favorited-jobs/toggle")
        .set("X-User-Id", "user123")
        .send({ jobId: "1" })
        .expect(200)

      expect(response.body).toEqual({ isFavorited: true })
    })

    it("should return 401 without user id", async () => {
      await request(app.server)
        .post("/api/favorited-jobs/toggle")
        .send({ jobId: "1" })
        .expect(401)
    })
  })
})
