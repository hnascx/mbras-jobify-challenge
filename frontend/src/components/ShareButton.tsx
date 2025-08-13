"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Copy, Linkedin, Share2, Twitter } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const shareOnTwitter = () => {
    const text = `Check out this job: ${title}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank")
  }

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`
    window.open(linkedInUrl, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Share job">
          <Share2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Job</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Input value={url} readOnly aria-label="Job URL" />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              aria-label="Copy link to clipboard"
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div
            className="flex justify-center space-x-2"
            role="group"
            aria-label="Share on social media"
          >
            <Button
              variant="outline"
              onClick={shareOnTwitter}
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4 mr-2" aria-hidden="true" />
              Twitter
            </Button>
            <Button
              variant="outline"
              onClick={shareOnLinkedIn}
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4 mr-2" aria-hidden="true" />
              LinkedIn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
