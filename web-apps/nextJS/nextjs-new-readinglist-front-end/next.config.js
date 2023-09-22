/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output:'standalone',
  publicRuntimeConfig: {
    NEXT_PUBLIC_SERVICE_URL: process.env.NEXT_PUBLIC_SERVICE_URL,
  },
}

module.exports = nextConfig
