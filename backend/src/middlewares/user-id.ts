import { FastifyReply, FastifyRequest } from "fastify"

export async function userIdMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.headers["x-user-id"]

  if (!userId || Array.isArray(userId)) {
    return reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
      message: "User ID is required",
    })
  }

  // Adiciona o userId ao request para uso nas rotas
  request.userId = userId
}

// Extend FastifyRequest to include userId
declare module "fastify" {
  interface FastifyRequest {
    userId: string
  }
}
