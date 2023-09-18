/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig :{
    ASGARDEO_CLIENT_ID: process.env.ASGARDEO_CLIENT_ID,
    ASGARDEO_CLIENT_SECRET: process.env.ASGARDEO_CLIENT_SECRET,
    ASGARDEO_ORGANIZATION_NAME: process.env.ASGARDEO_ORGANIZATION_NAME,
    ASGARDEO_SCOPES: process.env.ASGARDEO_SCOPES,
    NEXT_PUBLIC_SERVICE_URL: process.env.NEXT_PUBLIC_SERVICE_URL,
  },
  publicRuntimeConfig: {
    ASGARDEO_CLIENT_ID: process.env.ASGARDEO_CLIENT_ID,
    ASGARDEO_CLIENT_SECRET: process.env.ASGARDEO_CLIENT_SECRET,
    ASGARDEO_ORGANIZATION_NAME: process.env.ASGARDEO_ORGANIZATION_NAME,
    ASGARDEO_SCOPES: process.env.ASGARDEO_SCOPES,
    NEXT_PUBLIC_SERVICE_URL: process.env.NEXT_PUBLIC_SERVICE_URL,
    SECRET:process.env.SECRET,
  }
}

module.exports = nextConfig
