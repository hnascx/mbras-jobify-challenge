import { FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod"
import {
  jobIdParamSchema,
  jobsQuerySchema,
  toggleFavoriteSchema,
  userIdParamSchema,
} from "../schemas/validations"
import { FavoritesService } from "../services/favorites-service"
import { JobsService } from "../services/jobs-service"

export class JobsController {
  constructor(
    private jobsService = new JobsService(),
    private favoritesService = new FavoritesService()
  ) {}

  private handleError(error: unknown, reply: FastifyReply) {
    console.error("Error:", error)

    if (error instanceof ZodError) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Validation error",
        details: error.errors,
      })
    }

    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    })
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = jobsQuerySchema.parse(request.query)
      const jobs = await this.jobsService.findAll(query)
      return jobs
    } catch (error) {
      return this.handleError(error, reply)
    }
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = jobIdParamSchema.parse(request.params)
      const job = await this.jobsService.findById(id.toString())

      if (!job) {
        return reply.status(404).send({
          statusCode: 404,
          error: "Not Found",
          message: `Job with ID ${id} not found`,
        })
      }

      return job
    } catch (error) {
      return this.handleError(error, reply)
    }
  }

  async findFavorites(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = userIdParamSchema.parse(request.params)
      const favorites = await this.favoritesService.findByUserId(userId)
      return favorites
    } catch (error) {
      return this.handleError(error, reply)
    }
  }

  async toggleFavorite(request: FastifyRequest, reply: FastifyReply) {
    try {
      const payload = toggleFavoriteSchema.parse(request.body)
      const result = await this.favoritesService.toggle(
        payload.userId,
        payload.jobId,
        payload.jobData
      )
      return result
    } catch (error) {
      return this.handleError(error, reply)
    }
  }
}
