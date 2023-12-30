/** @type {import('next').NextConfig} */

import Module from "node:module";

const require = Module.createRequire(import.meta.url);
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  images: {
    domains: ["storage.googleapis.com", "ik.imagekit.io"],
  },
  // rewrites: async () => [
  //   {
  //     source: "/public/myfile.html",
  //     destination: "/pages/api/myfile.js",
  //   },
  // ],
};

// module.exports = nextConfig;
export default withPWA(nextConfig);
