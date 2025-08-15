import type { NextConfig } from "next"

const config: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "remotive.com",
        pathname: "**",
      },
    ],
  },
}

export default config
