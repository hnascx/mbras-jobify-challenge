import { FastifyInstance } from "fastify"
import { JobsController } from "../controllers/jobs-controller"
import { userIdMiddleware } from "../middlewares/user-id"

export async function jobRoutes(app: FastifyInstance) {
  const jobsController = new JobsController()

  app.get("/jobs", jobsController.findAll.bind(jobsController))
  app.get("/job/:id", jobsController.findById.bind(jobsController))

  app.register(async function (protectedRoutes) {
    protectedRoutes.addHook("preHandler", userIdMiddleware)

    protectedRoutes.get(
      "/favorited-jobs",
      jobsController.findFavorites.bind(jobsController)
    )
    protectedRoutes.post(
      "/favorited-jobs/toggle",
      jobsController.toggleFavorite.bind(jobsController)
    )
  })
}
