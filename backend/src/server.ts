import cors from "@fastify/cors"
import fastify from "fastify"
import { env } from "./config/env"
import { jobRoutes } from "./routes/jobs"

const app = fastify()

app.register(cors, {
  origin: env.FRONTEND_URL,
})

app.register(jobRoutes, { prefix: "/api/jobs" })

app
  .listen({
    port: Number(env.PORT),
    host: env.HOST,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
  })
