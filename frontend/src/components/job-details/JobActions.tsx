import { ShareButton } from "@/components/ShareButton"
import { FavoriteButton } from "@/components/job-card/FavoriteButton"
import { useState } from "react"

interface JobActionsProps {
  title: string
  isFavorited: boolean
  onFavoriteClick: () => Promise<void>
}

export function JobActions({
  title,
  isFavorited,
  onFavoriteClick,
}: JobActionsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteClick = async () => {
    try {
      setIsLoading(true)
      await onFavoriteClick()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="absolute top-16 right-0 flex items-center gap-3">
      <FavoriteButton
        title={title}
        isFavorited={isFavorited}
        isLoading={isLoading}
        onClick={handleFavoriteClick}
      />
      <ShareButton className="h-10 w-10 shrink-0 text-green-400 hover:text-green-500 border-green-400 hover:border-green-500 cursor-pointer" />
    </div>
  )
}
