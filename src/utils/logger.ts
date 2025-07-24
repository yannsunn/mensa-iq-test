/**
 * Enhanced logger utility with production error logging and monitoring
 */

import { AppError, createAppError, ErrorTypes, ErrorCodes } from '@/types/error';

const isDevelopment = process.env.NODE_ENV !== 'production';
const isProduction = process.env.NODE_ENV === 'production';

// ログレベル定義
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// ログエントリの型定義
interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  context?: {
    userId?: string;
    sessionId?: string;
    userAgent?: string;
    url?: string;
    ip?: string;
  };
  stack?: string;
}

// ログストレージ（メモリ内、本番環境では外部サービスに送信）
class LogStorage {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // メモリ内に保持する最大ログ数
  private flushInterval = 30000; // 30秒ごとにフラッシュ
  private flushTimer: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined' && isProduction) {
      this.startAutoFlush();
    }
  }

  add(entry: LogEntry) {
    this.logs.push(entry);
    
    // メモリ使用量を制限
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
    
    // 本番環境でのエラーは即座に送信
    if (isProduction && entry.level === LogLevel.ERROR) {
      this.flushImmediate([entry]);
    }
  }

  private startAutoFlush() {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  private async flush() {
    if (this.logs.length === 0) return;
    
    const logsToSend = [...this.logs];
    this.logs = [];
    
    await this.flushImmediate(logsToSend);
  }

  private async flushImmediate(logs: LogEntry[]) {
    if (!isProduction) return;
    
    try {
      // 本番環境では外部ログサービスに送信
      // 例: Vercel Analytics, Sentry, LogRocket, DataDog など
      
      // ここではコンソールに出力（実際の実装では外部サービスのAPIを呼び出し）
      console.error('[PRODUCTION LOG]', {
        timestamp: new Date().toISOString(),
        logs: logs.map(log => ({
          level: LogLevel[log.level],
          message: log.message,
          timestamp: log.timestamp,
          // 本番環境では機密情報を除去
          data: this.sanitizeData(log.data),
          context: this.sanitizeContext(log.context),
          stack: log.stack
        }))
      });
      
      // 外部サービスへの送信例（実装時に有効化）
      /*
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs })
      });
      */
    } catch (error) {
      // ログ送信に失敗した場合でも、アプリケーションの動作には影響しない
      console.error('Failed to send logs:', error);
    }
  }

  private sanitizeData(data: unknown): unknown {
    if (!data) return data;
    
    // 機密情報を除去
    const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'authorization', 'cookie'];
    
    if (typeof data === 'object' && data !== null) {
      const sanitized = { ...data } as Record<string, unknown>;
      
      for (const key in sanitized) {
        if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
          sanitized[key] = '[REDACTED]';
        }
      }
      
      return sanitized;
    }
    
    return data;
  }

  private sanitizeContext(context?: LogEntry['context']): LogEntry['context'] {
    if (!context) return context;
    
    return {
      ...context,
      // IPアドレスの一部をマスク
      ip: context.ip ? this.maskIP(context.ip) : undefined
    };
  }

  private maskIP(ip: string): string {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
    return 'xxx.xxx.xxx.xxx';
  }

  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    this.flush(); // 最後のログをフラッシュ
  }
}

// グローバルログストレージインスタンス
const logStorage = new LogStorage();

// ログコンテキストの取得
function getLogContext(): LogEntry['context'] {
  if (typeof window === 'undefined') {
    return {}; // サーバーサイドでは最小限の情報
  }
  
  return {
    userAgent: window.navigator.userAgent,
    url: window.location.href,
    // セッションIDやユーザーIDは実装に応じて追加
  };
}

// 構造化ログ作成
function createLogEntry(
  level: LogLevel,
  message: string,
  data?: unknown,
  error?: Error
): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
    context: getLogContext(),
    stack: error?.stack
  };
}

export const logger = {
  debug: (message: string, data?: unknown) => {
    const entry = createLogEntry(LogLevel.DEBUG, message, data);
    
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data);
    }
    
    logStorage.add(entry);
  },
  
  info: (message: string, data?: unknown) => {
    const entry = createLogEntry(LogLevel.INFO, message, data);
    
    if (isDevelopment) {
      console.info(`[INFO] ${message}`, data);
    }
    
    logStorage.add(entry);
  },
  
  log: (message: string, data?: unknown) => {
    // log は info のエイリアスとして扱う
    logger.info(message, data);
  },
  
  warn: (message: string, data?: unknown) => {
    const entry = createLogEntry(LogLevel.WARN, message, data);
    
    if (isDevelopment) {
      console.warn(`[WARN] ${message}`, data);
    }
    
    // 本番環境でも警告は記録
    logStorage.add(entry);
  },
  
  error: (message: string, error?: Error | unknown, data?: unknown) => {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const entry = createLogEntry(LogLevel.ERROR, message, data, errorObj);
    
    if (isDevelopment) {
      console.error(`[ERROR] ${message}`, error, data);
    }
    
    // 本番環境でもエラーは必ず記録
    logStorage.add(entry);
  },
  
  // 構造化エラーログ専用メソッド
  logError: (appError: AppError, additionalData?: unknown) => {
    const entry = createLogEntry(
      LogLevel.ERROR,
      `[${appError.type}] ${appError.message}`,
      {
        code: appError.code,
        statusCode: appError.statusCode,
        details: appError.details,
        requestId: appError.requestId,
        ...(additionalData && typeof additionalData === 'object' ? additionalData : {})
      }
    );
    
    if (isDevelopment) {
      console.error(`[ERROR] [${appError.type}] ${appError.message}`, appError);
    }
    
    logStorage.add(entry);
  },
  
  // パフォーマンス測定
  performance: (name: string, startTime: number, additionalData?: unknown) => {
    const duration = Date.now() - startTime;
    const message = `Performance: ${name} took ${duration}ms`;
    
    logger.info(message, {
      performanceMetric: {
        name,
        duration,
        timestamp: new Date().toISOString(),
        ...(additionalData && typeof additionalData === 'object' ? additionalData : {})
      }
    });
  },
  
  // ユーザーアクション記録
  userAction: (action: string, data?: unknown) => {
    logger.info(`User Action: ${action}`, {
      action,
      timestamp: new Date().toISOString(),
      ...(data && typeof data === 'object' ? data : {})
    });
  },
  
  // API呼び出し記録
  apiCall: (method: string, url: string, status: number, duration: number, error?: Error) => {
    const message = `API ${method} ${url} - ${status} (${duration}ms)`;
    const data = {
      api: {
        method,
        url,
        status,
        duration,
        timestamp: new Date().toISOString()
      }
    };
    
    if (error || status >= 400) {
      logger.error(message, error, data);
    } else {
      logger.info(message, data);
    }
  },
  
  // クリーンアップ
  destroy: () => {
    logStorage.destroy();
  }
};

// Export individual functions for convenience
export const log = logger.log;
export const error = logger.error;
export const warn = logger.warn;
export const info = logger.info;
export const debug = logger.debug;

// 高レベルヘルパー関数
export const logUserAction = logger.userAction;
export const logPerformance = logger.performance;
export const logApiCall = logger.apiCall;
export const logError = logger.logError;

// ブラウザ終了時のクリーンアップ
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    logger.destroy();
  });
  
  // エラーの自動キャッチ
  window.addEventListener('error', (event) => {
    logger.error('Uncaught Error', event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
  
  // Promise rejection の自動キャッチ
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection', event.reason, {
      type: 'unhandledrejection'
    });
  });
}

// Node.js環境でのプロセス終了時クリーンアップ
if (typeof process !== 'undefined' && process.on) {
  process.on('exit', () => {
    logger.destroy();
  });
  
  process.on('SIGINT', () => {
    logger.destroy();
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    logger.destroy();
    process.exit(0);
  });
}

// デフォルトエクスポート
export default logger;