"use client"

import { Header } from "@/components/Header"
import { ScrollToTop } from "@/components/ScrollToTop"
import { UserProvider } from "@/contexts/UserContext"
import { queryClient } from "@/lib/query"
import { QueryClientProvider } from "@tanstack/react-query"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </body>
    </html>
  )
}
