import { FastifyInstance } from "fastify"
import { JobsController } from "../controllers/jobs-controller"

export async function jobRoutes(app: FastifyInstance) {
  const jobsController = new JobsController()

  app.get("/", (req, reply) => jobsController.findAll(req, reply))
  app.get("/:id", (req, reply) => jobsController.findById(req, reply))
  app.get("/favorites/:userId", (req, reply) =>
    jobsController.findFavorites(req, reply)
  )
  app.post("/favorites", (req, reply) =>
    jobsController.toggleFavorite(req, reply)
  )
}
