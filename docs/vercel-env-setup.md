# Vercel環境変数設定ガイド

## 1. Vercelダッシュボードにログイン
1. https://vercel.com にアクセス
2. GitHubアカウントでログイン

## 2. プロジェクトの環境変数設定
1. `mensa-iq-test`プロジェクトをクリック
2. 上部メニューの「Settings」タブをクリック
3. 左側メニューの「Environment Variables」をクリック

## 3. 環境変数の追加
以下の環境変数を追加してください：

### STABILITY_API_KEY
- **Key**: `STABILITY_API_KEY`
- **Value**: `[YOUR_STABILITY_API_KEY]` （Stability AIダッシュボードから取得）
- **Environment**: すべてにチェック
  - ✅ Production
  - ✅ Preview
  - ✅ Development

### 追加手順：
1. 「Add New」ボタンをクリック
2. Key欄に `STABILITY_API_KEY` を入力
3. Value欄にAPIキーを貼り付け
4. Environmentで3つすべてにチェック
5. 「Save」ボタンをクリック

## 4. 再デプロイ
環境変数を追加した後は、必ず再デプロイが必要です：

1. 「Deployments」タブをクリック
2. 最新のデプロイメントの右側にある「...」メニューをクリック
3. 「Redeploy」を選択
4. 「Redeploy」ボタンをクリック

## 5. 確認方法
デプロイ完了後、以下のURLで確認：
- https://mensa-iq-test.vercel.app/api/env-check
- https://mensa-iq-test.vercel.app/api/test-stability

正常に設定されていれば、`hasStabilityKey: true` と表示されます。