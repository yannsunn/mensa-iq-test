// 画像キャッシュ管理コンポーネント

'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Trash2, RefreshCw, BarChart3, Image as ImageIcon } from 'lucide-react';
import { useImageCache } from '@/hooks/useImageCache';

export default function ImageCacheManager() {
  const { getCacheStats, clearCache } = useImageCache();
  const [isClearing, setIsClearing] = useState(false);
  const [cacheStats, setCacheStats] = useState(getCacheStats());

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      clearCache();
      setCacheStats(getCacheStats());
    } finally {
      setIsClearing(false);
    }
  };

  const refreshStats = () => {
    setCacheStats(getCacheStats());
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('ja-JP');
  };

  return (
    <div className="space-y-6">
      <Card variant="glass" className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            画像キャッシュ管理
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            生成された画像のキャッシュ状況を管理します
          </p>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">キャッシュ画像数</span>
                <BarChart3 className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {cacheStats.totalImages}
              </div>
              <div className="text-xs text-gray-500">
                画像
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">キャッシュサイズ</span>
                <ImageIcon className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {formatBytes(cacheStats.totalSize)}
              </div>
              <div className="text-xs text-gray-500">
                推定サイズ
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">最古のエントリ</span>
                <RefreshCw className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-sm font-medium text-purple-600">
                {formatDate(cacheStats.oldestEntry)}
              </div>
              <div className="text-xs text-gray-500">
                生成日時
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={refreshStats}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              統計を更新
            </Button>
            
            <Button
              variant="danger"
              onClick={handleClearCache}
              disabled={isClearing || cacheStats.totalImages === 0}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {isClearing ? 'クリア中...' : 'キャッシュをクリア'}
            </Button>
          </div>
        </div>
      </Card>

      <Card variant="glass" className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">キャッシュについて</h3>
        </div>
        <div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="default">自動管理</Badge>
              <span className="text-sm text-gray-600">
                画像は24時間自動でキャッシュされます
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">最大50件</Badge>
              <span className="text-sm text-gray-600">
                キャッシュサイズが上限に達すると古いものから削除されます
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">ローカル保存</Badge>
              <span className="text-sm text-gray-600">
                キャッシュはブラウザのローカルストレージに保存されます
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}