"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  id: number
  title: string
  companyName: string
  category: string
  location: string
  type: string
  isFavorited: boolean
  onFavoriteClick: () => void
}

export function JobCard({
  id,
  title,
  companyName,
  category,
  location,
  type,
  isFavorited,
  onFavoriteClick,
}: JobCardProps) {
  return (
    <Card
      className="p-4 sm:p-6 flex flex-col h-full hover:shadow-lg transition-shadow"
      role="article"
      aria-labelledby={`job-title-${id}`}
    >
      <div className="flex-1 space-y-3 sm:space-y-4">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/job/${id}`}
              id={`job-title-${id}`}
              className="text-base sm:text-lg font-semibold hover:underline line-clamp-2"
              aria-label={`View details for ${title} at ${companyName}`}
            >
              {title}
            </Link>
            <Button
              variant={isFavorited ? "default" : "outline"}
              size="icon"
              onClick={onFavoriteClick}
              className="shrink-0 h-8 w-8 sm:h-10 sm:w-10"
              aria-label={
                isFavorited
                  ? `Remove ${title} from favorites`
                  : `Add ${title} to favorites`
              }
              aria-pressed={isFavorited}
            >
              <Heart
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  isFavorited ? "fill-current" : ""
                }`}
                aria-hidden="true"
              />
            </Button>
          </div>
          <p
            className="text-xs sm:text-sm text-muted-foreground"
            aria-label="Company name"
          >
            {companyName}
          </p>
        </div>

        <div
          className="flex flex-wrap gap-1.5 sm:gap-2"
          role="list"
          aria-label="Job details"
        >
          <Badge
            variant="outline"
            role="listitem"
            aria-label={`Category: ${category}`}
            className="text-xs sm:text-sm px-2 py-0.5"
          >
            {category}
          </Badge>
          <Badge
            variant="secondary"
            role="listitem"
            aria-label={`Location: ${location}`}
            className="text-xs sm:text-sm px-2 py-0.5"
          >
            {location}
          </Badge>
          <Badge
            role="listitem"
            aria-label={`Job type: ${type}`}
            className="text-xs sm:text-sm px-2 py-0.5"
          >
            {type}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
