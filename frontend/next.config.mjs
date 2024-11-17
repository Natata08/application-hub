/** @type {import('next').NextConfig} */

const { NEXT_PUBLIC_UPSTREAM_API_URL } = process.env

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${NEXT_PUBLIC_UPSTREAM_API_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
