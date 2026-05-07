/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { 
    ignoreDuringBuilds: true 
  },
  typescript: { 
    ignoreBuildErrors: true 
  },
  // This completely stops the build from generating heavy source maps
  // which saves a massive amount of RAM on Vercel
  productionBrowserSourceMaps: false,
  // Disables the aggressive compiler that causes the worker to crash
  swcMinify: false,
  experimental: {
    serverComponentsExternalPackages:['nodemailer']
  }
}

module.exports = nextConfig;
