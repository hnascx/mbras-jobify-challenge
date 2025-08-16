"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-2xl",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-lg md:text-2xl font-bold text-green-400"
          >
            Jobify<span className="text-sm text-green-400">®</span>
          </Link>
        </div>

        <nav>
          <ul className="flex items-center md:gap-4">
            <li>
              <Button variant="link" asChild className="text-xs md:text-sm">
                <Link href="/">Vagas</Link>
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                className="text-xs md:text-sm text-green-400 border-green-400 hover:text-green-500 hover:border-green-500"
                asChild
              >
                <Link href="/favorited-jobs">Vagas Favoritadas</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
