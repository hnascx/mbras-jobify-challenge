import type { Metadata } from "next"

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
    locale: "pt-BR",
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
