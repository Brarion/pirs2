/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp =
    (relativePath) =>
        (relativeSubpath = '') =>
            path.resolve(appDirectory, relativePath, relativeSubpath);

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': resolveApp('src/styles')(),
    };

    return config;
  },
};

module.exports = nextConfig;
