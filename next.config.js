/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint warnings or errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignores typescript errors
    ignoreBuildErrors: true,
  },
  // Automatically fix some hanging issues in API routes
  experimental: {
    serverComponentsExternalPackages: ['nodemailer']
  }
}

module.exports = nextConfig;
