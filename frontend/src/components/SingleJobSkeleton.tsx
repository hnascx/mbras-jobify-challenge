"use client"

export function SingleJobSkeleton() {
  return (
    <div className="rounded-xl border p-6 flex flex-col h-full hover:shadow-lg transition-shadow bg-card">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0" />

            <div className="min-w-0 flex-1">
              <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />

              <div className="mt-2 flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0" />
                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
          </div>

          <div className="h-9 w-9 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0 ml-2" />
        </div>

        <div className="space-y-4">
          <div className="h-6 w-[85%] bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />

          <div className="space-y-1">
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-[90%] bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>

          <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function JobSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <SingleJobSkeleton key={i} />
      ))}
    </div>
  )
}
