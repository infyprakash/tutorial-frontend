/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // Optional: you can further restrict paths for better security
        // port: '',
        // pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;
