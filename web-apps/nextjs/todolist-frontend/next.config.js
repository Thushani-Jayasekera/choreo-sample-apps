/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_TODO_API_BASE_URL: process.env.NEXT_PUBLIC_TODO_API_BASE_URL,
  }
}

module.exports = nextConfig
