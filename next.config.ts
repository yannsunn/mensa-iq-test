import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // パフォーマンス最適化
  
  // 実験的機能でパフォーマンス向上
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
  },
  
  // 画像最適化強化
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24時間キャッシュ
  },
  
  // 高度なバンドル最適化と分析
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // クライアントサイドのバンドル最適化
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Reactコアライブラリ
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // アニメーションライブラリ(分離最適化)
          animations: {
            name: 'animations',
            test: /[\\/]node_modules[\\/](framer-motion|lottie-react)[\\/]/,
            chunks: 'all',
            priority: 35,
            enforce: true,
          },
          // アイコンライブラリ
          icons: {
            name: 'icons',
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            chunks: 'all',
            priority: 32,
            enforce: true,
          },
          // 大きなライブラリ
          lib: {
            test(module: any) {
              return module.size() > 160000 &&
                /node_modules[\\/]/.test(module.identifier()) &&
                !/[\\/](react|react-dom|framer-motion|lucide-react)[\\/]/.test(module.identifier());
            },
            name(module: any) {
              const packageName = module.context?.match(/[\\/]node_modules[\\/](.*?)[\\/]/);
              return packageName ? `vendor-${packageName[1].replace('@', '')}` : 'vendor';
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
            maxSize: 200000,
          },
          // 質問データ(カテゴリ別分離)
          questions: {
            name(module: any) {
              const match = module.identifier().match(/[\\/]src[\\/]data[\\/](.*?)Questions\.ts$/);
              return match ? `questions-${match[1].toLowerCase()}` : 'questions';
            },
            test: /[\\/]src[\\/]data[\\/].*Questions\.ts$/,
            chunks: 'all',
            priority: 15,
            minSize: 0,
          },
          // UIコンポーネント
          ui: {
            name: 'ui-components',
            test: /[\\/]src[\\/]components[\\/]ui[\\/]/,
            chunks: 'all',
            priority: 10,
          },
        },
      };
      
      // Tree shaking最適化
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // バンドル分析用(開発時のみ)
    if (dev && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
    }
    
    return config;
  },
  
  // コンパイル最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // パフォーマンスメトリクス
  poweredByHeader: false,
  compress: true,
  
  // 静的ファイルの最適化
  staticPageGenerationTimeout: 120,
};

// バンドル分析用スクリプトをpackage.jsonに追加することを推奨:
// "analyze": "ANALYZE=true npm run build"

export default nextConfig;