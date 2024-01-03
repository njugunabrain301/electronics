/** @type {import('next').NextConfig} */

import Module from "node:module";
const require = Module.createRequire(import.meta.url);
const withPWA = require("next-pwa")({
  dest: "public",
});
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
  rewrites: async () => [
    {
      source: "/public/myfile.html",
      destination: "/pages/api/myfile.js",
    },
  ],
};

// module.exports = nextConfig;

export default withPWA(nextConfig);
