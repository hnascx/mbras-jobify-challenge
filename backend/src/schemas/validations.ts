import { z } from "zod"

// URL Parameters Validation
export const jobIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a numeric value")
    .transform((val) => parseInt(val, 10)),
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
      .optional()
      .default(1),
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a numeric value")
      .transform((val) => parseInt(val, 10))
      .optional()
      .default(20),
  })
  .strict()

// Request Body Validation
export const toggleFavoriteSchema = z
  .object({
    jobId: z.string().min(1, "Job ID is required"),
  })
  .strict()
