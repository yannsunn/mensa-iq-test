'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface AnalyticsData {
  totalProblems: number;
  byCategory: Record<string, number>;
  byDifficulty: Record<string, number>;
  bySubtype: Record<string, number>;
  averageDifficulty: number;
  difficultyDistribution: Record<number, number>;
  timeEstimates: {
    total: number;
    average: number;
    byCategory: Record<string, { total: number; count: number }>;
  };
}

interface UserProgress {
  userId: string;
  totalAttempted: number;
  totalCorrect: number;
  accuracy: number;
  averageTime: number;
  categoryProgress: Record<string, { attempted: number; correct: number; accuracy: number }>;
  difficultyProgress: Record<string, { attempted: number; correct: number; accuracy: number }>;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'insights'>('overview');

  useEffect(() => {
    loadAnalytics();
    loadProgress();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'analytics' })
      });
      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const loadProgress = async () => {
    try {
      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'progress', 
          data: { userId: 'demo-user' }
        })
      });
      const data = await response.json();
      setProgress(data.progress);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      logical: '論理推論',
      numerical: '数列完成',
      spatial: '空間認識',
      matrix: '行列推論',
      pattern: 'パターン認識'
    };
    return names[category] || category;
  };

  const getDifficultyLabel = (level: string) => {
    const labels: Record<string, string> = {
      easy: '簡単 (1-7)',
      medium: '普通 (8-14)',
      hard: '難しい (15-18)',
      expert: '超難問 (19-20)'
    };
    return labels[level] || level;
  };

  const getProgressColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 bg-green-100';
    if (accuracy >= 70) return 'text-blue-600 bg-blue-100';
    if (accuracy >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">分析ダッシュボード</h2>
        <Button onClick={() => { loadAnalytics(); loadProgress(); }}>
          🔄 更新
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: '概要', icon: '📊' },
            { id: 'progress', label: '進捗', icon: '📈' },
            { id: 'insights', label: 'インサイト', icon: '💡' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'progress' | 'insights')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && analytics && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {analytics.totalProblems}
              </div>
              <div className="text-gray-600 mt-2">総問題数</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {analytics.averageDifficulty.toFixed(1)}
              </div>
              <div className="text-gray-600 mt-2">平均難易度</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.round(analytics.timeEstimates.average)}s
              </div>
              <div className="text-gray-600 mt-2">平均所要時間</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">
                {Object.keys(analytics.byCategory).length}
              </div>
              <div className="text-gray-600 mt-2">カテゴリ数</div>
            </Card>
          </div>

          {/* Category Distribution */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">カテゴリ別分布</h3>
            <div className="space-y-3">
              {Object.entries(analytics.byCategory).map(([category, count]) => {
                const percentage = (count / analytics.totalProblems) * 100;
                return (
                  <div key={category} className="flex items-center">
                    <div className="w-32 text-sm font-medium">
                      {getCategoryName(category)}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-600">
                      {count}問 ({percentage.toFixed(1)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Difficulty Distribution */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">難易度別分布</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(analytics.byDifficulty).map(([level, count]) => (
                <div key={level} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{count}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {getDifficultyLabel(level)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && progress && (
        <div className="space-y-6">
          {/* Overall Progress */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">全体的な進捗</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {progress.totalAttempted}
                </div>
                <div className="text-gray-600 mt-2">解答済み</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {progress.totalCorrect}
                </div>
                <div className="text-gray-600 mt-2">正解数</div>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold ${progress.accuracy >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {progress.accuracy}%
                </div>
                <div className="text-gray-600 mt-2">正解率</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {progress.averageTime}s
                </div>
                <div className="text-gray-600 mt-2">平均時間</div>
              </div>
            </div>
          </Card>

          {/* Category Progress */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">カテゴリ別進捗</h3>
            <div className="space-y-4">
              {Object.entries(progress.categoryProgress).map(([category, data]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{getCategoryName(category)}</h4>
                    <Badge className={getProgressColor(data.accuracy)}>
                      {data.accuracy}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>解答済み: {data.attempted}問</span>
                    <span>正解: {data.correct}問</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        data.accuracy >= 70 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${data.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Difficulty Progress */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">難易度別進捗</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(progress.difficultyProgress).map(([level, data]) => (
                <div key={level} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{getDifficultyLabel(level)}</h4>
                    <Badge className={getProgressColor(data.accuracy)}>
                      {data.accuracy}%
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {data.attempted}問中 {data.correct}問正解
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        data.accuracy >= 70 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${data.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && progress && (
        <div className="space-y-6">
          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-green-600">💪 得意分野</h3>
              <div className="space-y-2">
                {progress.strengths.map(strength => (
                  <Badge key={strength} variant="success" className="mr-2 mb-2">
                    {getCategoryName(strength)}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-red-600">🎯 改善分野</h3>
              <div className="space-y-2">
                {progress.weaknesses.map(weakness => (
                  <Badge key={weakness} variant="danger" className="mr-2 mb-2">
                    {getCategoryName(weakness)}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">📋 学習推奨</h3>
            <div className="space-y-3">
              {progress.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 font-bold">{index + 1}.</span>
                  <span className="text-blue-800">{recommendation}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Chart Placeholder */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">📈 パフォーマンス推移</h3>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-600">
                パフォーマンスチャートは今後のアップデートで追加予定
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Chart.js または Recharts を使用した詳細なグラフ表示
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;