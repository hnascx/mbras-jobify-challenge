-- CreateTable
CREATE TABLE "public"."favorite_jobs" (
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "jobData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_jobs_pkey" PRIMARY KEY ("userId","jobId")
);
