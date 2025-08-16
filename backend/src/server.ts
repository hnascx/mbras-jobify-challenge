import cors from "@fastify/cors"
import fastify from "fastify"
import { jobRoutes } from "./routes/jobs"

export async function createServer() {
  const app = fastify()

  await app.register(cors, {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })

  // Health check endpoint para o Docker
  app.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() }
  })

  await app.register(jobRoutes, { prefix: "/api" })

  return app
}

async function start() {
  const app = await createServer()

  try {
    await app.listen({
      port: Number(process.env.PORT) || 3001,
      host: "0.0.0.0",
    })
    console.log(
      `🚀 Servidor rodando em http://localhost:${process.env.PORT || 3001}`
    )
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

if (require.main === module) {
  start()
}
