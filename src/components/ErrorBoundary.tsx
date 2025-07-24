'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home, Send } from 'lucide-react';
import { logger } from '@/utils/logger';
import { createAppError, ErrorTypes, ErrorCodes } from '@/types/error';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string;
  isReporting: boolean;
  reportSent: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void; errorId: string }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo, errorId: string) => void;
  enableErrorReporting?: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: '',
      isReporting: false,
      reportSent: false
    };
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { 
      hasError: true, 
      error, 
      errorInfo: null,
      errorId,
      isReporting: false,
      reportSent: false
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = this.state.errorId || this.generateErrorId();
    
    this.setState({ error, errorInfo, errorId });
    
    // 構造化されたエラー情報を作成
    const structuredError = {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      errorType: this.categorizeError(error)
    };
    
    // エラーログの記録
    logger.error('Error caught by boundary:', structuredError);
    
    // カスタムエラーハンドラーを呼び出し
    if (this.props.onError) {
      this.props.onError(error, errorInfo, errorId);
    }
    
    // 開発環境でのデバッグ情報
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 ErrorBoundary Debug Info');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.error('Structured Error:', structuredError);
      console.groupEnd();
    }
  }

  private categorizeError(error: Error): string {
    // エラーの種類を分類
    if (error.message.includes('ChunkLoadError') || error.message.includes('Loading chunk')) {
      return 'chunk_load_error';
    }
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      return 'network_error';
    }
    if (error.message.includes('timeout')) {
      return 'timeout_error';
    }
    if (error.name === 'TypeError') {
      return 'type_error';
    }
    if (error.name === 'ReferenceError') {
      return 'reference_error';
    }
    return 'unknown_error';
  }

  private async reportError() {
    if (!this.props.enableErrorReporting || this.state.reportSent) {
      return;
    }

    this.setState({ isReporting: true });

    try {
      // エラー報告APIにデータを送信（実装は環境に応じて調整）
      const errorReport = {
        errorId: this.state.errorId,
        message: this.state.error?.message,
        stack: process.env.NODE_ENV === 'development' ? this.state.error?.stack : undefined,
        componentStack: process.env.NODE_ENV === 'development' ? this.state.errorInfo?.componentStack : undefined,
        timestamp: new Date().toISOString(),
        userAgent: window.navigator.userAgent,
        url: window.location.href,
        errorType: this.state.error ? this.categorizeError(this.state.error) : 'unknown'
      };

      // ここで実際のエラー報告サービスに送信
      // 例: Sentry, LogRocket, 独自のエラー報告APIなど
      logger.log('Error report would be sent:', errorReport);
      
      this.setState({ reportSent: true });
    } catch (reportError) {
      logger.error('Failed to report error:', reportError);
    } finally {
      this.setState({ isReporting: false });
    }
  }

  handleRetry = () => {
    logger.log(`Retrying after error: ${this.state.errorId}`);
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: '',
      isReporting: false,
      reportSent: false 
    });
  };

  handleReportError = () => {
    this.reportError();
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback && this.state.error) {
        return <Fallback error={this.state.error} retry={this.handleRetry} errorId={this.state.errorId} />;
      }

      // エラーの種類に応じて異なるメッセージを表示
      const getErrorMessage = () => {
        const errorType = this.state.error ? this.categorizeError(this.state.error) : 'unknown_error';
        
        switch (errorType) {
          case 'chunk_load_error':
            return {
              title: 'アプリケーションの読み込みに失敗しました',
              description: 'ページを再読み込みしてください。問題が続く場合は、ブラウザのキャッシュをクリアしてみてください。'
            };
          case 'network_error':
            return {
              title: 'ネットワークエラーが発生しました',
              description: 'インターネット接続を確認して、再度お試しください。'
            };
          case 'timeout_error':
            return {
              title: 'リクエストがタイムアウトしました',
              description: '処理に時間がかかっています。しばらく待ってから再度お試しください。'
            };
          default:
            return {
              title: '問題が発生しました',
              description: '申し訳ございません。予期しないエラーが発生しました。ページを再読み込みするか、ホームページに戻ってお試しください。'
            };
        }
      };

      const errorMessage = getErrorMessage();

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              {errorMessage.title}
            </h1>
            
            <p className="text-white/70 mb-4 leading-relaxed">
              {errorMessage.description}
            </p>
            
            {this.state.errorId && (
              <p className="text-white/50 text-sm mb-8">
                エラーID: {this.state.errorId}
              </p>
            )}
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-4 mb-6 text-left">
                <h3 className="text-red-400 font-semibold mb-2">開発者向けエラー情報:</h3>
                <pre className="text-red-300 text-sm overflow-x-auto whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="text-red-400 cursor-pointer">詳細なスタックトレース</summary>
                    <pre className="text-red-300 text-xs mt-2 overflow-x-auto whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={this.handleRetry}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                <span>再試行</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span>ホームに戻る</span>
              </button>
            </div>
            
            {this.props.enableErrorReporting && !this.state.reportSent && (
              <div className="mb-6">
                <button
                  onClick={this.handleReportError}
                  disabled={this.state.isReporting}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {this.state.isReporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>エラーレポートを送信</span>
                    </>
                  )}
                </button>
              </div>
            )}
            
            {this.state.reportSent && (
              <div className="mb-6 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  ✓ エラーレポートを送信しました。ご報告ありがとうございます。
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-Order Component for easy wrapping
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  // Display name for debugging
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Hook for error reporting in functional components
export function useErrorHandler() {
  const reportError = (error: Error, errorInfo?: Record<string, unknown>) => {
    const structuredError = createAppError(
      ErrorTypes.SERVER,
      ErrorCodes.INTERNAL_SERVER_ERROR,
      error.message,
      500,
      {
        originalError: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString(),
        ...errorInfo
      }
    );
    
    logger.error('Manual error report:', structuredError);
    
    // ここで実際のエラー報告サービスに送信
    if (process.env.NODE_ENV === 'production') {
      // 本番環境でのエラー報告処理
    }
  };
  
  return { reportError };
}

export default ErrorBoundary;