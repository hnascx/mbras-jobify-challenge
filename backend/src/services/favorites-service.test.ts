import { beforeEach, describe, expect, it, vi } from "vitest"
import { prisma } from "../lib/prisma"
import { FavoritesService } from "./favorites-service"
import { JobsService } from "./jobs-service"

vi.mock("./jobs-service")

describe("FavoritesService", () => {
  let favoritesService: FavoritesService
  let mockJobsService: JobsService

  beforeEach(() => {
    mockJobsService = {
      findById: vi.fn(),
    } as unknown as JobsService

    favoritesService = new FavoritesService(mockJobsService)
  })

  describe("findByUserId", () => {
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

      const result = await favoritesService.findByUserId("user123")

      expect(result).toEqual(mockFavorites)
      expect(prisma.favoriteJob.findMany).toHaveBeenCalledWith({
        where: { userId: "user123" },
      })
    })
  })

  describe("toggle", () => {
    it("should remove favorite if it exists", async () => {
      const mockExistingFavorite = {
        userId: "user123",
        jobId: "job123",
        jobData: {
          id: 1,
          title: "Software Engineer",
        },
        createdAt: new Date(),
      }

      vi.mocked(prisma.favoriteJob.findUnique).mockResolvedValueOnce(
        mockExistingFavorite
      )
      vi.mocked(prisma.favoriteJob.delete).mockResolvedValueOnce(
        mockExistingFavorite
      )

      const result = await favoritesService.toggle("user123", "job123")

      expect(result).toEqual({ isFavorited: false })
      expect(prisma.favoriteJob.delete).toHaveBeenCalled()
    })

    it("should add favorite if it does not exist", async () => {
      const mockJob = {
        id: 1,
        title: "Software Engineer",
      }

      vi.mocked(prisma.favoriteJob.findUnique).mockResolvedValueOnce(null)
      vi.mocked(mockJobsService.findById).mockResolvedValueOnce(mockJob)
      vi.mocked(prisma.favoriteJob.create).mockResolvedValueOnce({
        userId: "user123",
        jobId: "job123",
        jobData: mockJob,
        createdAt: new Date(),
      })

      const result = await favoritesService.toggle("user123", "job123")

      expect(result).toEqual({ isFavorited: true })
      expect(prisma.favoriteJob.create).toHaveBeenCalled()
    })

    it("should throw error if job is not found", async () => {
      vi.mocked(prisma.favoriteJob.findUnique).mockResolvedValueOnce(null)
      vi.mocked(mockJobsService.findById).mockResolvedValueOnce(null)

      await expect(
        favoritesService.toggle("user123", "job123")
      ).rejects.toThrow("Job not found")
    })
  })
})
