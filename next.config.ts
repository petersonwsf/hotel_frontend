import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9003',
            }
        ]
    }
};

export default nextConfig;
