import { Header } from "@/components/Header"
import { ScrollToTop } from "@/components/ScrollToTop"
import { UserProvider } from "@/contexts/UserContext"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jobify - Encontre seu próximo emprego remoto",
  description: "Encontre e salve vagas de emprego remoto.",
  openGraph: {
    title: "Jobify - Encontre seu próximo emprego remoto",
    description: "Encontre e salve vagas de emprego remoto.",
    url: "https://jobify.vercel.app",
    siteName: "Jobify",
    images: [
      {
        url: "https://jobify.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobify - Encontre seu próximo emprego remoto",
    description: "Encontre e salve vagas de emprego remoto.",
    images: ["https://jobify.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-10 py-8">
              {children}
            </main>
          </div>
          <ScrollToTop />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  )
}
