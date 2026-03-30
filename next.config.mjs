/** @type {import('next').NextConfig} */


const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // output: 'export',  // disabled for Vercel (needs API routes)
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
  
  turbopack: {},
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    })
    return config
  },
}


export default nextConfig;
