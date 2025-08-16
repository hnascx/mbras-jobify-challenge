"use client"

import { ShareDialog } from "@/components/share/ShareDialog"
import { shareHandlers } from "@/components/share/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Share2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ShareButtonProps {
  className?: string
}

export function ShareButton({ className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCopyLink = async () => {
    try {
      await shareHandlers.copyLink()
      toast.success("Link copiado com sucesso.")
      setIsOpen(false)
    } catch (error) {
      toast.error("Erro ao copiar link.")
    }
  }

  const handleShare = (handler: () => void) => {
    handler()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={className}
          aria-label="Compartilhar vaga"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <ShareDialog
        onCopy={handleCopyLink}
        onWhatsApp={() => handleShare(shareHandlers.whatsApp)}
        onEmail={() => handleShare(shareHandlers.email)}
        onTwitter={() => handleShare(shareHandlers.twitter)}
        onLinkedIn={() => handleShare(shareHandlers.linkedIn)}
      />
    </Dialog>
  )
}
