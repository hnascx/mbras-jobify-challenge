import { Button } from "@/components/ui/button"
import { Heart, Loader2 } from "lucide-react"

interface FavoriteButtonProps {
  title: string
  isFavorited: boolean
  isLoading: boolean
  onClick: () => void
}

export function FavoriteButton({
  title,
  isFavorited,
  isLoading,
  onClick,
}: FavoriteButtonProps) {
  return (
    <Button
      variant={isFavorited ? "default" : "outline"}
      size="icon"
      onClick={onClick}
      className="shrink-0 ml-2 cursor-pointer w-10 h-10"
      disabled={isLoading}
      aria-label={
        isFavorited
          ? `Remover ${title} dos favoritos`
          : `Adicionar ${title} aos favoritos`
      }
      aria-pressed={isFavorited}
    >
      {isLoading && !isFavorited ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Heart
          className={`h-4 w-4 ${
            isFavorited ? "fill-current text-red-500" : ""
          }`}
          aria-hidden="true"
        />
      )}
    </Button>
  )
}
