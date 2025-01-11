/** @type {import('next').NextConfig} */

const { NEXT_PUBLIC_UPSTREAM_API_URL } = process.env

console.log('API URL:', NEXT_PUBLIC_UPSTREAM_API_URL) 

const nextConfig = {
  transpilePackages: ['mui-tel-input'],
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
