/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

module.exports = {
  nextConfig,
  env: {
    OPENWEATHER_API_URL: process.env.OPENWEATHER_API_URL,
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    WEATHER_API_URL: process.env.WEATHER_API_URL,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    IPGEOLOCATION_API_KEY: process.env.IPGEOLOCATION_API_KEY,
    IPGEOLOCATION_API_URL: process.env.IPGEOLOCATION_API_URL,
    IPIFY_URL: process.env.IPIFY_URL,
  },
};
