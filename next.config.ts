import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // パフォーマンス最適化
  
  // 画像最適化
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // バンドルサイズ分析
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // クライアントサイドのバンドル最適化
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // 共通ライブラリ
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // アニメーションライブラリ
          lib: {
            test(module: any) {
              return module.size() > 160000 &&
                /node_modules[\\/]/.test(module.identifier());
            },
            name(module: any) {
              const hash = require('crypto').createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // 共通コンポーネント
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          // 質問データ
          questions: {
            name: 'questions',
            test: /[\\/]src[\\/]data[\\/].*Questions\.ts$/,
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
