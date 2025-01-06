/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 忽略 punycode 警告
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];
    return config;
  },
  // 添加图片域名配置
  images: {
    domains: [
      'ai-logo-generator.s3.us-west-1.amazonaws.com'
    ]
  }
}

module.exports = nextConfig;
