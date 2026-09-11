import path from "node:path";

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(process.cwd(), "client/src");
    config.resolve.alias["@shared"] = path.resolve(process.cwd(), "shared");
    config.resolve.alias["@assets"] = path.resolve(process.cwd(), "attached_assets");
    return config;
  },
  transpilePackages: ["@/client"],
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/certifications/index.html", destination: "/certifications/", permanent: true },
      { source: "/e-catalogue.html", destination: "/resources/", permanent: true },
      { source: "/about/index.html", destination: "/about/", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "X-Frame-Options", value: "DENY" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }, { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] }];
  },
};
export default nextConfig;
