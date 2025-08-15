import { prisma } from "../lib/prisma"
import { JobsService } from "./jobs-service"

export class FavoritesService {
  constructor(private jobsService = new JobsService()) {}

  async findByUserId(userId: string) {
    return prisma.favoriteJob.findMany({
      where: { userId },
    })
  }

  async toggle(userId: string, jobId: string) {
    const existingFavorite = await prisma.favoriteJob.findUnique({
      where: {
        userId_jobId: {
          userId,
          jobId,
        },
      },
    })

    if (existingFavorite) {
      await prisma.favoriteJob.delete({
        where: {
          userId_jobId: {
            userId,
            jobId,
          },
        },
      })
      return { isFavorited: false }
    }

    // Fetch job data from the API
    const job = await this.jobsService.findById(Number(jobId))
    if (!job) {
      throw new Error("Job not found")
    }

    await prisma.favoriteJob.create({
      data: {
        userId,
        jobId,
        jobData: JSON.parse(JSON.stringify(job)),
      },
    })

    return { isFavorited: true }
  }
}
