// 画像キャッシュフック

'use client';

import { useState, useEffect, useCallback } from 'react';
import { ImageGenerationResponse } from '@/types/image';
import { logger } from '@/utils/logger';

interface ImageCacheItem {
  questionId: string;
  imageData: ImageGenerationResponse;
  timestamp: number;
}

interface UseImageCacheReturn {
  getCachedImage: (questionId: string) => ImageGenerationResponse | null;
  setCachedImage: (questionId: string, imageData: ImageGenerationResponse) => void;
  clearCache: () => void;
  getCacheSize: () => number;
  getCacheStats: () => {
    totalImages: number;
    totalSize: number;
    oldestEntry: number | null;
  };
}

const CACHE_KEY = 'mensa-image-cache';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24時間
const MAX_CACHE_SIZE = 50; // 最大キャッシュ数

export function useImageCache(): UseImageCacheReturn {
  const [cache, setCache] = useState<Map<string, ImageCacheItem>>(new Map());

  // ローカルストレージからキャッシュを読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const newCache = new Map<string, ImageCacheItem>();
        
        // 期限切れのアイテムを除外
        const now = Date.now();
        Object.entries(parsed).forEach(([key, item]) => {
          const cacheItem = item as ImageCacheItem;
          if (now - cacheItem.timestamp < CACHE_EXPIRATION) {
            newCache.set(key, cacheItem);
          }
        });
        
        setCache(newCache);
      }
    } catch (error) {
      logger.error('Failed to load image cache:', error);
    }
  }, []);

  // キャッシュをローカルストレージに保存
  const saveToStorage = useCallback((newCache: Map<string, ImageCacheItem>) => {
    try {
      const obj = Object.fromEntries(newCache);
      localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
    } catch (error) {
      logger.error('Failed to save image cache:', error);
    }
  }, []);

  // キャッシュサイズを制限
  const limitCacheSize = useCallback((newCache: Map<string, ImageCacheItem>) => {
    if (newCache.size > MAX_CACHE_SIZE) {
      // 古い順にソートして削除
      const entries = Array.from(newCache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
      
      toRemove.forEach(([key]) => {
        newCache.delete(key);
      });
    }
    return newCache;
  }, []);

  // キャッシュから画像を取得
  const getCachedImage = useCallback((questionId: string): ImageGenerationResponse | null => {
    const item = cache.get(questionId);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > CACHE_EXPIRATION) {
      // 期限切れの場合は削除
      setCache(prevCache => {
        const newCache = new Map(prevCache);
        newCache.delete(questionId);
        saveToStorage(newCache);
        return newCache;
      });
      return null;
    }

    return item.imageData;
  }, [cache, saveToStorage]);

  // キャッシュに画像を保存
  const setCachedImage = useCallback((questionId: string, imageData: ImageGenerationResponse) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.set(questionId, {
        questionId,
        imageData,
        timestamp: Date.now()
      });
      
      // サイズ制限を適用
      const limitedCache = limitCacheSize(newCache);
      saveToStorage(limitedCache);
      
      return limitedCache;
    });
  }, [saveToStorage, limitCacheSize]);

  // キャッシュをクリア
  const clearCache = useCallback(() => {
    setCache(new Map());
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (error) {
      logger.error('Failed to clear image cache:', error);
    }
  }, []);

  // キャッシュサイズを取得
  const getCacheSize = useCallback(() => {
    return cache.size;
  }, [cache]);

  // キャッシュ統計を取得
  const getCacheStats = useCallback(() => {
    const entries = Array.from(cache.values());
    const totalImages = entries.length;
    const totalSize = entries.reduce((sum, item) => {
      // 概算サイズ（JSON文字列の長さ）
      return sum + JSON.stringify(item.imageData).length;
    }, 0);
    
    const oldestEntry = entries.length > 0 ? 
      Math.min(...entries.map(item => item.timestamp)) : 
      null;

    return {
      totalImages,
      totalSize,
      oldestEntry
    };
  }, [cache]);

  return {
    getCachedImage,
    setCachedImage,
    clearCache,
    getCacheSize,
    getCacheStats
  };
}