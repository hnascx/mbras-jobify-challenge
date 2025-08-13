import { afterEach, beforeAll, vi } from "vitest"

beforeAll(() => {
  // Setup mock para o Prisma
  vi.mock("../src/lib/prisma", () => ({
    prisma: {
      favoriteJob: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
      },
    },
  }))

  // Setup mock para o Axios
  vi.mock("axios", () => ({
    default: {
      get: vi.fn(),
    },
  }))
})

afterEach(() => {
  vi.clearAllMocks()
})
