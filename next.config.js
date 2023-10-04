/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  nextConfig,
  env: {
    OPENWEATHER_API_URL: process.env.OPENWEATHER_API_URL,
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    WEATHER_API_URL: process.env.WEATHER_API_URL,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
};
