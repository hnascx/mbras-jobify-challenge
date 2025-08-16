import { Metadata } from "next"

// Parte do conteúdo presente aqui é meramente ilustrativo, apenas para exemplificar as características de aplicação de uma estratégia básica de SEO
export const metadata: Metadata = {
  title: "Vagas Favoritadas | Jobify",
  description:
    "Gerencie e acompanhe todas as vagas que você salvou para consultar depois. Encontre as melhores oportunidades de trabalho remoto em um só lugar.",
  openGraph: {
    title: "Vagas Favoritadas | Jobify",
    description:
      "Gerencie e acompanhe todas as vagas que você salvou para consultar depois. Encontre as melhores oportunidades de trabalho remoto em um só lugar.",
    url: "https://jobify.vercel.app/favorited-jobs",
    siteName: "Jobify",
    type: "website",
    images: [
      {
        url: "https://jobify.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jobify - Vagas Favoritadas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vagas Favoritadas | Jobify",
    description:
      "Gerencie e acompanhe todas as vagas que você salvou para consultar depois. Encontre as melhores oportunidades de trabalho remoto em um só lugar.",
    images: ["https://jobify.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://jobify.vercel.app/favorited-jobs",
  },
  keywords: [
    "vagas favoritadas",
    "trabalho remoto",
    "emprego remoto",
    "vagas salvas",
    "oportunidades",
    "tecnologia",
    "desenvolvimento",
    "favoritos",
  ],
}
