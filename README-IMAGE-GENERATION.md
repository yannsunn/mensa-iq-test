# 画像生成機能 - セットアップガイド

## 概要

このプロジェクトでは、MidJourneyのAPIを使用してIQ問題に対応する画像を自動生成する機能を実装しています。ImagineAPIを通じてMidJourneyの画像生成機能を利用し、問題ごとに適切な画像を生成・キャッシュします。

## 機能

### 主な機能
- **自動画像生成**: 問題の内容に基づいて適切な画像を生成
- **問題ID別管理**: 各問題に固有の画像を紐付け
- **キャッシュシステム**: 生成された画像を24時間キャッシュ
- **フォールバック処理**: 生成失敗時の代替表示
- **複数スタイル対応**: minimal, detailed, abstract, geometric

### 対応カテゴリ
- **pattern**: パターン認識問題
- **spatial**: 空間認識問題  
- **abstract**: 抽象推論問題
- **geometric**: 幾何学問題

## セットアップ

### 1. APIキーの取得

1. [ImagineAPI](https://www.imagineapi.dev/)にアクセス
2. アカウントを作成してAPIキーを取得
3. `.env.local`ファイルを作成し、APIキーを設定

```bash
# .env.local
IMAGINE_API_KEY=your_api_key_here
NEXT_PUBLIC_ENABLE_IMAGE_GENERATION=true
```

### 2. 環境変数の設定

```bash
# コピーして設定
cp .env.example .env.local

# APIキーを設定
IMAGINE_API_KEY=your_imagine_api_key_here
```

### 3. 依存関係のインストール

```bash
npm install
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

## 使用方法

### 基本的な使用方法

```tsx
import GeneratedImage from '@/components/ui/GeneratedImage';

// 問題コンポーネント内で使用
<GeneratedImage
  questionId="q001"
  category="pattern"
  description="geometric pattern sequence with triangles and circles"
  style="minimal"
  className="max-w-md mx-auto"
/>
```

### カスタムプロンプト

```tsx
// 直接APIを呼び出す場合
const response = await fetch('/api/images/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    questionId: 'q001',
    prompt: 'Create a minimalist geometric pattern for IQ test',
    style: 'minimal'
  })
});
```

## API仕様

### 画像生成エンドポイント

#### GET `/api/images/generate`

問題カテゴリに基づいた画像生成

**パラメータ:**
- `questionId` (required): 問題ID
- `category` (required): 問題カテゴリ
- `description` (required): 画像の説明
- `style` (optional): 画像スタイル (default: minimal)

#### POST `/api/images/generate`

カスタムプロンプトでの画像生成

**リクエストボディ:**
```json
{
  "questionId": "q001",
  "prompt": "Create a geometric pattern",
  "style": "minimal",
  "aspectRatio": "1:1",
  "quality": "standard"
}
```

#### GET `/api/images/cache`

キャッシュ統計の取得

#### DELETE `/api/images/cache`

キャッシュのクリア

## 設定

### 画像スタイル

```typescript
type ImageStyle = 'minimal' | 'detailed' | 'abstract' | 'geometric';
```

- **minimal**: シンプルで清潔なデザイン
- **detailed**: 詳細で複雑なパターン
- **abstract**: 抽象的で芸術的
- **geometric**: 幾何学的で数学的

### プロンプトテンプレート

カテゴリ別のプロンプトテンプレートは `src/types/image.ts` で定義されています。

```typescript
export const PROMPT_TEMPLATES = {
  matrix: "Create a minimalist geometric pattern matrix for IQ test...",
  pattern: "Generate an abstract pattern sequence for cognitive testing...",
  // ...
} as const;
```

## キャッシュ管理

### 自動キャッシュ
- 生成された画像は24時間自動でキャッシュ
- 最大50件まで保存
- 容量制限に達すると古いものから削除

### 手動管理
```tsx
import { useImageCache } from '@/hooks/useImageCache';

const { getCachedImage, setCachedImage, clearCache } = useImageCache();
```

### 管理画面
```tsx
import ImageCacheManager from '@/components/admin/ImageCacheManager';

// 管理画面で使用
<ImageCacheManager />
```

## トラブルシューティング

### よくある問題

1. **API キーエラー**
   ```
   Error: API key not configured
   ```
   - `.env.local`でAPIキーが設定されているか確認
   - APIキーの権限を確認

2. **画像生成失敗**
   ```
   Error: Image generation failed
   ```
   - プロンプトが適切か確認
   - API制限に達していないか確認

3. **キャッシュ問題**
   - ブラウザのローカルストレージをクリア
   - キャッシュ管理画面で手動クリア

### デバッグ方法

```bash
# 開発者コンソールでキャッシュ確認
localStorage.getItem('mensa-image-cache')

# API呼び出しのログ確認
console.log('Image generation request:', requestData);
```

## 料金について

ImagineAPIの料金体系：
- 無料プラン: 月50枚まで
- 有料プラン: $30/月で無制限
- 詳細は [ImagineAPI料金ページ](https://www.imagineapi.dev/pricing) を参照

## 開発者向け情報

### ディレクトリ構造

```
src/
├── types/image.ts              # 画像関連の型定義
├── lib/imageGeneration.ts      # 画像生成サービス
├── hooks/useImageCache.ts      # キャッシュフック
├── components/
│   ├── ui/GeneratedImage.tsx   # 画像表示コンポーネント
│   └── admin/ImageCacheManager.tsx # 管理画面
└── app/api/images/             # API エンドポイント
    ├── generate/route.ts
    └── cache/route.ts
```

### 拡張方法

1. **新しいプロンプトテンプレート追加**
   ```typescript
   // src/types/image.ts
   export const PROMPT_TEMPLATES = {
     // 新しいテンプレート
     newCategory: "Create a new type of visualization...",
   } as const;
   ```

2. **画像生成プロバイダー追加**
   ```typescript
   // src/lib/imageGeneration.ts
   class ImageGenerationService {
     // 新しいプロバイダーのメソッド追加
   }
   ```

## 注意事項

1. **利用規約**: MidJourneyおよびImagineAPIの利用規約を遵守してください
2. **画像権利**: 生成された画像の著作権について確認してください
3. **API制限**: レート制限や月間制限に注意してください
4. **キャッシュ**: 重要な画像は別途バックアップを取ってください

## サポート

問題が発生した場合：
1. このドキュメントのトラブルシューティングを確認
2. [ImagineAPI ドキュメント](https://docs.imagineapi.dev/)を参照
3. プロジェクトのIssueで報告

---

© 2024 MENSA攻略ツール - 画像生成機能