import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Copy, Linkedin, Mail, Twitter } from "lucide-react"

interface ShareDialogProps {
  onCopy: () => void
  onWhatsApp: () => void
  onEmail: () => void
  onTwitter: () => void
  onLinkedIn: () => void
}

export function ShareDialog({
  onCopy,
  onWhatsApp,
  onEmail,
  onTwitter,
  onLinkedIn,
}: ShareDialogProps) {
  return (
    <DialogContent className="w-[85%] rounded-lg md:w-full bg-black backdrop-blur-0">
      <DialogHeader>
        <DialogTitle>Compartilhar vaga</DialogTitle>
        <DialogDescription className="mt-2">
          Compartilhe a vaga em suas redes sociais
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <Input
            value={window.location.href}
            readOnly
            className="flex-1 focus-visible:ring-1 text-xs md:text-base"
            aria-label="URL da vaga"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={onCopy}
            aria-label="Copiar link"
            className="text-green-400 hover:text-green-500 border-green-400 hover:border-green-500 cursor-pointer"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:text-green-500 hover:border-green-500 hover:transition-colors duration-200 cursor-pointer"
            onClick={onWhatsApp}
            aria-label="Compartilhar no WhatsApp"
          >
            <svg
              className="h-4 w-4 hover:text-green-500 hover:transition-colors duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Infelizmente não existe o ícone do WhatsApp no Lucide, então utilizei o SVG do WhatsApp */}
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:text-green-500 hover:border-green-500 hover:transition-colors duration-200 cursor-pointer"
            onClick={onEmail}
            aria-label="Compartilhar por E-mail"
          >
            <Mail className="h-4 w-4" />
            E-mail
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:text-green-500 hover:border-green-500 hover:transition-colors duration-200 cursor-pointer"
            onClick={onTwitter}
            aria-label="Compartilhar no Twitter"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:text-green-500 hover:border-green-500 hover:transition-colors duration-200 cursor-pointer"
            onClick={onLinkedIn}
            aria-label="Compartilhar no LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}
