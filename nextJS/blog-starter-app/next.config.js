/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    output: 'export',
    images: {
        unoptimized: true
    },
    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    trailingSlash: true,
  }
   
  module.exports = nextConfig