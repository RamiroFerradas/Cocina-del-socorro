/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["example.com", "https://example.com"], // Solo el nombre de dominio, sin "https://"
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
