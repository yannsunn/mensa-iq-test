'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // エラーログの記録（本番環境では外部サービスに送信）
    console.error('Error caught by boundary:', error, errorInfo);
    
    // 開発環境でのデバッグ情報
    if (process.env.NODE_ENV === 'development') {
      console.group('ErrorBoundary Debug Info');
      console.log('Error:', error);
      console.log('Error Info:', errorInfo);
      console.log('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback && this.state.error) {
        return <Fallback error={this.state.error} retry={this.handleRetry} />;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              問題が発生しました
            </h1>
            
            <p className="text-white/70 mb-8 leading-relaxed">
              申し訳ございません。予期しないエラーが発生しました。
              <br />
              ページを再読み込みするか、ホームページに戻ってお試しください。
            </p>
            
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;