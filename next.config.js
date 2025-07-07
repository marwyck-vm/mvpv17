/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Performance optimizations
  experimental: {
      optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react']
  },
  
  // Webpack config (consider if you need both webpack and turbopack)
  webpack: (config, { dev, isServer }) => {
      if (dev && !isServer) {
          config.watchOptions = {
              poll: 1000,
              aggregateTimeout: 300,
          }
      }
      return config
  },

    async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "*",
          },
        ],
      },
    ];
  },
    serverExternalPackages: ['mongodb']
  }
  
  module.exports = nextConfig