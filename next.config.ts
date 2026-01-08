import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'replicate.delivery',
      'cloudinary.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'eggxrokpuajvojeniygr.supabase.co',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
