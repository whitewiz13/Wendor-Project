/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  images: {
    loader: 'akamai',
    path: '',
  }
}

module.exports = nextConfig
