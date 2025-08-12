import { prisma } from "../lib/prisma"
import { Job } from "../types/jobs"

export class FavoritesService {
  async findByUserId(userId: string) {
    return prisma.favoriteJob.findMany({
      where: { userId },
    })
  }

  async toggle(userId: string, jobId: string, jobData: Job) {
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
      return { favorited: false }
    }

    await prisma.favoriteJob.create({
      data: {
        userId,
        jobId,
        jobData,
      },
    })

    return { favorited: true }
  }
}
