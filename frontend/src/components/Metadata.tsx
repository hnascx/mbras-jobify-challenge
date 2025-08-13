import type { Metadata } from "next"

interface GenerateMetadataParams {
  title: string
  description: string
  image?: string
  type?: "website" | "article"
}

export function generateMetadata({
  title,
  description,
  image,
  type = "website",
}: GenerateMetadataParams): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://jobify.vercel.app"
  const imageUrl = image || `${baseUrl}/og-image.png`

  return {
    title: `${title} | Jobify`,
    description,
    openGraph: {
      title: `${title} | Jobify`,
      description,
      url: baseUrl,
      siteName: "Jobify",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Jobify`,
      description,
      images: [imageUrl],
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
    icons: {
      shortcut: "/favicon.ico",
    },
  }
}
