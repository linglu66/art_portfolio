/** @type {import('next').NextConfig} */


const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // No `output: 'export'` on this branch — Vercel serves this dynamically so
  // API routes and server rendering work. `main` keeps static export for the
  // GitHub Pages build.
  trailingSlash: true,
  // basePath: isProd ? '/art_portfolio' : '' used to be for github pages
  basePath: '',
  assetPrefix: '',


  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    })
    return config
  },
}


export default nextConfig;
