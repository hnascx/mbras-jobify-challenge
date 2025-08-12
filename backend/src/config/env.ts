import "dotenv/config"

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  HOST: process.env.HOST || "0.0.0.0",
  FRONTEND_URL: process.env.FRONTEND_URL,
} as const
