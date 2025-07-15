// 生成された画像表示コンポーネント

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { ImageGenerationResponse } from '@/types/image';
import { useImageCache } from '@/hooks/useImageCache';

interface GeneratedImageProps {
  questionId: string;
  category: string;
  description: string;
  style?: 'minimal' | 'detailed' | 'abstract' | 'geometric';
  fallbackComponent?: React.ReactNode;
  className?: string;
}

export default function GeneratedImage({ 
  questionId, 
  category, 
  description, 
  style = 'minimal', 
  fallbackComponent,
  className = ''
}: GeneratedImageProps) {
  const [imageData, setImageData] = useState<ImageGenerationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const { getCachedImage, setCachedImage } = useImageCache();

  // 画像生成リクエスト
  const generateImage = async (isRetry = false) => {
    // キャッシュから確認（再試行でない場合のみ）
    if (!isRetry) {
      const cachedImage = getCachedImage(questionId);
      if (cachedImage) {
        setImageData(cachedImage);
        return;
      }
    }

    if (isRetry) {
      setIsRetrying(true);
    } else {
      setIsLoading(true);
    }
    
    setError(null);

    try {
      const response = await fetch(`/api/images/generate?questionId=${questionId}&category=${category}&description=${encodeURIComponent(description)}&style=${style}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ImageGenerationResponse = await response.json();
      
      if (data.success && data.imageUrl) {
        setImageData(data);
        setCachedImage(questionId, data); // キャッシュに保存
        setError(null);
      } else {
        setError(data.error || 'Image generation failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Image generation error:', err);
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  };

  // 初回読み込み
  useEffect(() => {
    generateImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId, category, description, style]);

  // 再試行ハンドラ
  const handleRetry = () => {
    generateImage(true);
  };

  // ローディング状態
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 bg-gray-50 rounded-lg ${className}`}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">画像を生成しています...</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className={`p-6 bg-red-50 rounded-lg border border-red-200 ${className}`}>
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <span className="text-red-700 font-medium">画像生成に失敗しました</span>
        </div>
        <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        <div className="flex justify-center space-x-2">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isRetrying ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            再試行
          </button>
        </div>
        {fallbackComponent && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600 mb-2">フォールバック表示:</p>
            {fallbackComponent}
          </div>
        )}
      </div>
    );
  }

  // 画像表示成功
  if (imageData?.imageUrl) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={imageData.imageUrl}
            alt={`Generated image for question ${questionId}`}
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            priority
            onError={() => {
              setError('Image failed to load');
            }}
          />
        </div>
        
        {/* 画像情報 */}
        <div className="mt-2 text-xs text-gray-500">
          <p>スタイル: {imageData.style}</p>
          <p>生成日時: {new Date(imageData.generatedAt).toLocaleString('ja-JP')}</p>
        </div>
        
        {/* 再生成ボタン */}
        <div className="mt-2 flex justify-center">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex items-center px-3 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
          >
            {isRetrying ? (
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
            ) : (
              <RefreshCw className="h-3 w-3 mr-1" />
            )}
            再生成
          </button>
        </div>
      </div>
    );
  }

  // フォールバック表示
  return (
    <div className={`p-6 bg-gray-50 rounded-lg ${className}`}>
      <p className="text-sm text-gray-600 text-center mb-4">画像を生成できませんでした</p>
      {fallbackComponent || (
        <div className="text-center text-gray-400">
          <p>代替画像なし</p>
        </div>
      )}
    </div>
  );
}