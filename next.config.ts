import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'personal_website';

const nextConfig: NextConfig = {
  output: isGithubPages ? 'export' : 'standalone',
  basePath: isGithubPages ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
