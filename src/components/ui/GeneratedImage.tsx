// 生成された画像表示コンポーネント（強化エラーハンドリング版）

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Loader2, RefreshCw, AlertCircle, Image as ImageIcon, WifiOff } from 'lucide-react';
import { ImageGenerationResponse } from '@/types/image';
import { useImageCache } from '@/hooks/useImageCache';
import { logger } from '@/utils/logger';
import { isApiErrorResponse, ApiErrorResponse } from '@/types/error';
import { useErrorHandler } from '@/components/ErrorBoundary';

interface GeneratedImageProps {
  questionId: string;
  category: string;
  description: string;
  style?: 'minimal' | 'detailed' | 'abstract' | 'geometric';
  fallbackComponent?: React.ReactNode;
  className?: string;
  maxRetries?: number;
  retryDelay?: number;
  showFallbackOnError?: boolean;
  onError?: (error: string, errorType: string) => void;
  onSuccess?: (imageData: ImageGenerationResponse) => void;
}

export default function GeneratedImage({ 
  questionId, 
  category, 
  description, 
  style = 'minimal', 
  fallbackComponent,
  className = '',
  maxRetries = 3,
  retryDelay = 1000,
  showFallbackOnError = true,
  onError,
  onSuccess
}: GeneratedImageProps) {
  const [imageData, setImageData] = useState<ImageGenerationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string>('unknown');
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>('online');
  const { getCachedImage, setCachedImage } = useImageCache();
  const { reportError } = useErrorHandler();
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ネットワーク状態監視
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // エラー分類ヘルパー
  const categorizeError = useCallback((error: unknown, response?: Response): string => {
    if (networkStatus === 'offline') return 'network_offline';
    
    if (response) {
      if (response.status === 429) return 'rate_limit';
      if (response.status === 403) return 'forbidden';
      if (response.status === 500) return 'server_error';
      if (response.status === 408) return 'timeout';
    }
    
    if (error instanceof Error) {
      if (error.message.includes('timeout')) return 'timeout';
      if (error.message.includes('network') || error.message.includes('fetch')) return 'network_error';
      if (error.message.includes('abort')) return 'aborted';
    }
    
    return 'unknown';
  }, [networkStatus]);

  // 画像生成リクエスト
  const generateImage = useCallback(async (isRetry = false) => {
    // オフライン時の処理
    if (networkStatus === 'offline') {
      setError('インターネット接続を確認してください');
      setErrorType('network_offline');
      return;
    }

    // キャッシュから確認（再試行でない場合のみ）
    if (!isRetry) {
      const cachedImage = getCachedImage(questionId);
      if (cachedImage) {
        setImageData(cachedImage);
        setError(null);
        setErrorType('');
        if (onSuccess) {
          onSuccess(cachedImage);
        }
        return;
      }
    }

    if (isRetry) {
      setIsRetrying(true);
    } else {
      setIsLoading(true);
    }
    
    setError(null);
    setErrorType('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒タイムアウト

      const response = await fetch(`/api/images/generate?questionId=${questionId}&category=${category}&description=${encodeURIComponent(description)}&style=${style}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseData = await response.json();

      if (!response.ok) {
        const errorType = categorizeError(null, response);
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        if (isApiErrorResponse(responseData)) {
          errorMessage = responseData.error.message;
        }
        
        throw new Error(errorMessage);
      }
      
      // 新しいAPIレスポンス形式に対応
      let imageData: ImageGenerationResponse;
      if (responseData.success === true && responseData.data) {
        imageData = responseData.data;
      } else if (responseData.success && responseData.imageUrl) {
        imageData = responseData;
      } else {
        throw new Error(responseData.error?.message || 'Image generation failed');
      }
      
      if (imageData.imageUrl) {
        setImageData(imageData);
        setCachedImage(questionId, imageData);
        setError(null);
        setErrorType('');
        setRetryCount(0);
        
        if (onSuccess) {
          onSuccess(imageData);
        }
      } else {
        throw new Error('No image URL in response');
      }
    } catch (err) {
      const currentErrorType = categorizeError(err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      setError(errorMessage);
      setErrorType(currentErrorType);
      
      // エラー報告
      reportError(err instanceof Error ? err : new Error(errorMessage), {
        questionId,
        category,
        retryCount,
        errorType: currentErrorType
      });
      
      if (onError) {
        onError(errorMessage, currentErrorType);
      }
      
      logger.error('Image generation error:', {
        error: err,
        questionId,
        category,
        retryCount,
        errorType: currentErrorType
      });
      
      // 自動再試行（条件を満たす場合）
      if (retryCount < maxRetries && ['timeout', 'network_error', 'server_error'].includes(currentErrorType)) {
        setRetryCount(prev => prev + 1);
        retryTimeoutRef.current = setTimeout(() => {
          generateImage(true);
        }, retryDelay * Math.pow(2, retryCount)); // 指数バックオフ
      }
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, [questionId, category, description, style, retryCount, maxRetries, retryDelay, networkStatus, getCachedImage, setCachedImage, categorizeError, reportError, onError, onSuccess]);

  // 初回読み込み
  useEffect(() => {
    generateImage();
    
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [generateImage]);

  // 再試行ハンドラ
  const handleRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    setRetryCount(0);
    generateImage(true);
  }, [generateImage]);

  // エラーメッセージの取得
  const getErrorMessage = useCallback(() => {
    switch (errorType) {
      case 'network_offline':
        return 'インターネット接続がありません。接続を確認してから再試行してください。';
      case 'network_error':
        return 'ネットワークエラーが発生しました。しばらく待ってから再試行してください。';
      case 'timeout':
        return 'リクエストがタイムアウトしました。サーバーが混雑している可能性があります。';
      case 'rate_limit':
        return 'リクエスト制限に達しました。しばらく待ってから再試行してください。';
      case 'server_error':
        return 'サーバーエラーが発生しました。しばらく待ってから再試行してください。';
      case 'forbidden':
        return '画像生成の権限がありません。設定を確認してください。';
      default:
        return error || '画像生成に失敗しました。';
    }
  }, [error, errorType]);

  // フォールバック画像コンポーネント
  const FallbackImage = useCallback(() => {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
        <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-2">{category}</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </p>
        </div>
      </div>
    );
  }, [fallbackComponent, category, description]);

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
    const canRetry = retryCount < maxRetries;
    const isNetworkError = ['network_offline', 'network_error'].includes(errorType);
    
    return (
      <div className={`p-6 rounded-lg border ${isNetworkError ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'} ${className}`}>
        <div className="flex items-center justify-center mb-4">
          {errorType === 'network_offline' ? (
            <WifiOff className="h-6 w-6 text-orange-500 mr-2" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          )}
          <span className={`font-medium ${isNetworkError ? 'text-orange-700' : 'text-red-700'}`}>
            画像生成に失敗しました
          </span>
        </div>
        
        <p className={`text-sm mb-4 text-center ${isNetworkError ? 'text-orange-600' : 'text-red-600'}`}>
          {getErrorMessage()}
        </p>
        
        {retryCount > 0 && (
          <p className="text-xs text-gray-500 text-center mb-4">
            再試行回数: {retryCount}/{maxRetries}
          </p>
        )}
        
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={handleRetry}
            disabled={isRetrying || (!canRetry && errorType !== 'network_offline')}
            className={`flex items-center px-4 py-2 text-white rounded hover:opacity-90 disabled:opacity-50 transition-opacity ${
              isNetworkError ? 'bg-orange-500 hover:bg-orange-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isRetrying ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {errorType === 'network_offline' ? '再接続' : '再試行'}
          </button>
        </div>
        
        {showFallbackOnError && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600 mb-2">代替表示:</p>
            <FallbackImage />
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
          {(imageData as any).cacheMetadata?.cached && (
            <p className="text-green-600">キャッシュから読み込み</p>
          )}
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
      <FallbackImage />
    </div>
  );
}