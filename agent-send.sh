#!/bin/bash

# エージェント通信システム
# 使用方法: ./agent-send.sh [相手] "[メッセージ]"

if [ $# -ne 2 ]; then
    echo "使用方法: $0 [相手] \"[メッセージ]\""
    echo "例: $0 boss1 \"タスクを開始します\""
    exit 1
fi

RECIPIENT=$1
MESSAGE=$2
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_DIR="/mnt/c/Users/march/MENSA攻略ツール/logs"
LOG_FILE="$LOG_DIR/agent_communication.log"

# ログディレクトリの作成
mkdir -p "$LOG_DIR"

# メッセージをログに記録
echo "[$TIMESTAMP] FROM: $USER TO: $RECIPIENT - $MESSAGE" >> "$LOG_FILE"

# メッセージを表示
echo "📨 メッセージ送信完了"
echo "  宛先: $RECIPIENT"
echo "  内容: $MESSAGE"
echo "  時刻: $TIMESTAMP"

# TODO: 実際のエージェント間通信メカニズムを実装
# 現在はログファイルへの記録のみ