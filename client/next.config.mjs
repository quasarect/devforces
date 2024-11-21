/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cssbattle.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
