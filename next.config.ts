import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**', // อนุญาตทุก path ภายใต้ github.com
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**', // อนุญาตทุก path ภายใต้ raw.githubusercontent.com
      },
      // เพิ่มโดเมนของ POP MART ตรงนี้ครับ
      {
        protocol: 'https',
        hostname: 'prod-eurasian-res.popmart.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-thailand-res.popmart.com', // แก้ตาม Error ที่โชว์
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;