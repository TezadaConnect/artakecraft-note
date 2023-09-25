/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      }
    ],
    domains: ['source.unsplash.com', 'lh3.googleusercontent.com', 'res.cloudinary.com']
  }
};

module.exports = nextConfig;
