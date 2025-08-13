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
    <Card className="p-6 flex flex-col h-full">
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/job/${id}`}
              className="text-lg font-semibold hover:underline line-clamp-2"
            >
              {title}
            </Link>
            <Button
              variant={isFavorited ? "default" : "outline"}
              size="icon"
              onClick={onFavoriteClick}
              className="shrink-0"
            >
              <Heart
                className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`}
              />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{companyName}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{category}</Badge>
          <Badge variant="secondary">{location}</Badge>
          <Badge>{type}</Badge>
        </div>
      </div>
    </Card>
  )
}
