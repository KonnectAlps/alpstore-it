import type { NextConfig } from 'next'

// Sito statico: `next build` produce la cartella `out/`, pubblicabile su Vercel o su qualsiasi hosting statico.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  agentRules: false,
}

export default nextConfig
