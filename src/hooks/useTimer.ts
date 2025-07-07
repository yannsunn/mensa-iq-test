'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  initialTime?: number;
  onTimeUp?: () => void;
  countDown?: boolean;
  autoStart?: boolean;
}

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setTime: (time: number) => void;
}

export function useTimer({
  initialTime = 0,
  onTimeUp,
  countDown = false,
  autoStart = false
}: UseTimerOptions = {}): UseTimerReturn {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedRef.current * 1000;
      
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
        const newTime = countDown ? Math.max(0, initialTime - elapsed) : elapsed;
        
        setTime(newTime);
        
        if (countDown && newTime === 0 && onTimeUp) {
          onTimeUp();
          setIsRunning(false);
        }
      }, 100); // 100msごとに更新で精度向上
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, countDown, initialTime, onTimeUp]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (isRunning && startTimeRef.current) {
      elapsedRef.current = Math.floor((Date.now() - startTimeRef.current) / 1000);
    }
    setIsRunning(false);
  }, [isRunning]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(initialTime);
    elapsedRef.current = 0;
    startTimeRef.current = null;
  }, [initialTime]);

  const setTimeValue = useCallback((newTime: number) => {
    setTime(newTime);
    if (countDown) {
      elapsedRef.current = initialTime - newTime;
    } else {
      elapsedRef.current = newTime;
    }
  }, [countDown, initialTime]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    setTime: setTimeValue
  };
}

// 時間フォーマットユーティリティ
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 時間の警告レベルを取得
export function getTimeWarningLevel(timeRemaining: number, totalTime: number): 'normal' | 'warning' | 'danger' {
  const percentage = (timeRemaining / totalTime) * 100;
  
  if (percentage <= 10) return 'danger';
  if (percentage <= 25) return 'warning';
  return 'normal';
}