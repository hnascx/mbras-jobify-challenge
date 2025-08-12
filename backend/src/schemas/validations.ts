import { z } from "zod"
import { jobSchema } from "./jobs"

// URL Parameters Validation
export const jobIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a numeric value")
    .transform((val) => parseInt(val, 10)),
})

export const userIdParamSchema = z.object({
  userId: z
    .string()
    .min(1, "User ID is required")
    .max(100, "User ID is too long"),
})

// Query Parameters Validation
export const jobsQuerySchema = z
  .object({
    category: z.string().optional(),
    search: z.string().optional(),
    page: z
      .string()
      .regex(/^\d+$/, "Page must be a numeric value")
      .transform((val) => parseInt(val, 10))
      .optional(),
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a numeric value")
      .transform((val) => parseInt(val, 10))
      .optional(),
  })
  .strict()

// Request Body Validation
export const toggleFavoriteSchema = z
  .object({
    userId: z
      .string()
      .min(1, "User ID is required")
      .max(100, "User ID is too long"),
    jobId: z.string().min(1, "Job ID is required"),
    jobData: jobSchema,
  })
  .strict()
