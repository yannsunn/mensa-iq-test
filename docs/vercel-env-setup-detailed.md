# Vercel環境変数設定 詳細手順

## 問題の確認
現在、`STABILITY_API_KEY`が設定されていないため、画像生成が失敗しています。

## 設定手順

### 1. Vercelにアクセス
1. ブラウザで https://vercel.com を開く
2. GitHubアカウントでログイン

### 2. プロジェクトページへ移動
1. ダッシュボードで「mensa-iq-test」プロジェクトをクリック
2. プロジェクトのページが開きます

### 3. Settings（設定）ページへ
1. ページ上部のメニューバーで「Settings」をクリック
   - Home, Analytics, Speed Insights, Logs, **Settings** という並びです

### 4. Environment Variables（環境変数）へ
1. 左側のサイドバーで「Environment Variables」をクリック
   - General
   - Domains
   - Integrations
   - Git
   - Functions
   - **Environment Variables** ← これをクリック
   - ...

### 5. 新しい環境変数を追加
1. 「Add New」ボタンをクリック（緑色のボタン）

2. 以下の情報を入力：
   - **Key (Name)**: `STABILITY_API_KEY`
   - **Value**: `sk-UdV4Y6kiwUp2HfKfKWm6WajTEgop6MFVy3YCDrxnhY5dhfvS`
   - **Environment**: 
     - ☑ Production
     - ☑ Preview  
     - ☑ Development
     （3つすべてにチェックを入れる）

3. 「Save」ボタンをクリック

### 6. 確認
環境変数のリストに「STABILITY_API_KEY」が表示されることを確認

### 7. 再デプロイ（重要！）
環境変数は再デプロイしないと反映されません：

1. 上部メニューの「Deployments」タブをクリック
2. 一番上の最新のデプロイメント（Latest）を見つける
3. その行の右端にある「...」（3点メニュー）をクリック
4. 「Redeploy」を選択
5. ポップアップで「Redeploy」ボタンをクリック

### 8. デプロイ完了を待つ
- 通常2-3分で完了します
- 「Ready」と表示されたら完了

### 9. 動作確認
再度以下のURLにアクセス：
- https://mensa-iq-test.vercel.app/api/env-check
- https://mensa-iq-test.vercel.app/api/test-stability

成功した場合の表示：
```json
{
  "hasStabilityKey": true,
  "stabilityKeyLength": 51,
  "stabilityKeyPrefix": "sk-UdV4Y6k..."
}
```

## トラブルシューティング
- 環境変数が反映されない場合は、ブラウザのキャッシュをクリアしてください
- それでも反映されない場合は、プロジェクトの「Settings」→「Environment Variables」で設定を確認してください