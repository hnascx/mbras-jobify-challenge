import Link from "next/link"
import { Button } from "./ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Jobify
        </Link>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/">Jobs</Link>
              </Button>
            </li>
            <li>
              <Button variant="outline" asChild>
                <Link href="/favorited-jobs">Favorited Jobs</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
