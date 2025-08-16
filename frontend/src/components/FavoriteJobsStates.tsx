import { JobCard } from "@/components/JobCard"
import { SingleJobSkeleton } from "@/components/SingleJobSkeleton"
import { Card } from "@/components/ui/card"
import { FavoriteJob } from "@/types/favorites"

export function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SingleJobSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function EmptyState() {
  return (
    <Card className="p-6 border-none">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Nenhuma vaga favoritada :(</h2>
        <p className="text-muted-foreground">
          As vagas que você favoritar aparecerão aqui.
        </p>
      </div>
    </Card>
  )
}

interface FavoriteJobsListProps {
  favorites: FavoriteJob[]
  onUnfavorite: (jobId: string) => Promise<void>
}

export function FavoriteJobsList({
  favorites,
  onUnfavorite,
}: FavoriteJobsListProps) {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-green-400">
        Vagas favoritadas
      </h1>
      <div className="grid gap-5.75 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => (
          <JobCard
            key={favorite.jobId}
            id={favorite.jobData.id}
            title={favorite.jobData.title}
            companyName={favorite.jobData.company_name}
            companyLogo={favorite.jobData.company_logo || undefined}
            category={favorite.jobData.category}
            location={favorite.jobData.candidate_required_location}
            description={favorite.jobData.description}
            isFavorited={true}
            onFavoriteClick={() => onUnfavorite(favorite.jobId)}
          />
        ))}
      </div>
    </div>
  )
}
