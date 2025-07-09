# MENSA攻略ツール

## プロジェクト概要
このプロジェクトは、MENSAのIQテスト対策をサポートするツールと、エージェント通信システムを統合したものです。

## ディレクトリ構造
```
MENSA攻略ツール/
├── CLAUDE.md              # エージェント通信システムの設定
├── README.md              # プロジェクト概要（このファイル）
├── agent-send.sh          # エージェント間通信スクリプト
├── instructions/          # 各エージェントロールの指示書
│   ├── president.md       # PRESIDENT役の指示
│   ├── boss.md           # boss1役の指示
│   └── worker.md         # worker役の指示
├── logs/                 # 通信ログ保存ディレクトリ
└── mensa-iq-test/        # MENSAテスト対策アプリ（Next.js）
    ├── src/              # ソースコード
    ├── public/           # 静的ファイル
    └── package.json      # Node.js依存関係
```

## エージェント通信システム
### 役割分担
- **PRESIDENT**: プロジェクト統括責任者
- **boss1**: チームリーダー（タスク管理）
- **worker1,2,3**: 実装担当者

### 使用方法
```bash
# エージェントへメッセージ送信
./agent-send.sh [相手] "[メッセージ]"

# 例：
./agent-send.sh boss1 "新機能の実装を開始してください"
```

## MENSAテスト対策アプリ
### 技術スタック
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

### セットアップ
```bash
cd mensa-iq-test
npm install
npm run dev
```

## Git管理
このプロジェクトは2つのGitリポジトリで管理されています：
1. ルートディレクトリ: エージェント通信システム
2. mensa-iq-test/: Next.jsアプリケーション

## 今後の拡張予定
- エージェント間の実時間通信機能
- テスト問題の自動生成
- 学習進捗の可視化