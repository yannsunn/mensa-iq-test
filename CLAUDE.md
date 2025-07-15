# Agent Communication System

## エージェント構成
- **PRESIDENT** (別セッション): 統括責任者
- **boss1** (multiagent:0.0): チームリーダー
- **worker1,2,3** (multiagent:0.1-3): 実行担当

## あなたの役割
- **PRESIDENT**: @instructions/president.md
- **boss1**: @instructions/boss.md
- **worker1,2,3**: @instructions/worker.md

## メッセージ送信
```bash
./agent-send.sh [相手] "[メッセージ]"
```

## 基本フロー
PRESIDENT → boss1 → workers → boss1 → PRESIDENT

## Git管理ルール
### 重要な原則
1. **変更完了後は必ずプッシュする**
   - すべての作業が完了したら、必ずgit add, commit, pushを実行
   - 作業を中断して放置しない

2. **不要なファイルは追加しない**
   - 現時点で必要のないファイルは作成・追加しない
   - 将来の拡張予定があっても、実際に必要になるまで追加しない

3. **影響範囲の確認**
   - 変更が他に影響する可能性がある場合は、必ずファイル全体を確認
   - 上から下まですべてのコードを確認してから実施
   - 依存関係のあるファイルも合わせて確認 