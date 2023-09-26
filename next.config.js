/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  nextConfig,
  env: {
    OPENWEATHER_API_URL: process.env.OPENWEATHER_API_URL,
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  }
}
