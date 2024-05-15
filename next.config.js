/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config({
  path: './.env.local',
});
const nextConfig = {
  env: {
    ...localEnv,
  },
};

module.exports = nextConfig;
