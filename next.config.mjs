/** @type {import('next').NextConfig} */


const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',  // enables static export mode
  trailingSlash: true, // optional, makes routing cleaner on GitHub Pages
  // basePath: isProd ? '/art_portfolio' : '' used to be for github pages
  basePath: '',
  assetPrefix: isProd ? '/art_portfolio' : '',


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
