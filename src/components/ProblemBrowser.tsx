'use client';

import React, { useState, useMemo } from 'react';
import { ConsolidatedMensaQuestion, getProblemsByCategory, getProblemsByDifficulty } from '@/data/consolidatedQuestions';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ProblemBrowserProps {
  problems: ConsolidatedMensaQuestion[];
  onProblemSelect?: (problem: ConsolidatedMensaQuestion) => void;
  compact?: boolean;
}

interface FilterState {
  category: string;
  difficulty: string;
  subtype: string;
  search: string;
}

export const ProblemBrowser: React.FC<ProblemBrowserProps> = ({
  problems,
  onProblemSelect,
  compact = false
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    difficulty: 'all', 
    subtype: 'all',
    search: ''
  });

  const [selectedProblem, setSelectedProblem] = useState<ConsolidatedMensaQuestion | null>(null);

  // Get unique values for filters
  const { categories, subtypes, difficultyLevels } = useMemo(() => {
    const categorySet = new Set(problems.map(p => p.category));
    const subtypeSet = new Set(problems.map(p => p.subtype));
    
    return {
      categories: Array.from(categorySet),
      subtypes: Array.from(subtypeSet),
      difficultyLevels: [
        { label: '簡単 (1-7)', value: 'easy', min: 1, max: 7 },
        { label: '普通 (8-14)', value: 'medium', min: 8, max: 14 },
        { label: '難しい (15-18)', value: 'hard', min: 15, max: 18 },
        { label: '超難問 (19-20)', value: 'expert', min: 19, max: 20 }
      ]
    };
  }, [problems]);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      // Category filter
      if (filters.category !== 'all' && problem.category !== filters.category) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== 'all') {
        const diffLevel = difficultyLevels.find(d => d.value === filters.difficulty);
        if (diffLevel && (problem.difficulty < diffLevel.min || problem.difficulty > diffLevel.max)) {
          return false;
        }
      }

      // Subtype filter
      if (filters.subtype !== 'all' && problem.subtype !== filters.subtype) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          problem.question.toLowerCase().includes(searchLower) ||
          problem.title.toLowerCase().includes(searchLower) ||
          problem.id.toLowerCase().includes(searchLower) ||
          problem.subtype.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [problems, filters, difficultyLevels]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleProblemClick = (problem: ConsolidatedMensaQuestion) => {
    setSelectedProblem(problem);
    onProblemSelect?.(problem);
  };

  const getDifficultyBadgeVariant = (difficulty: number) => {
    if (difficulty <= 7) return 'success';
    if (difficulty <= 14) return 'warning';  
    if (difficulty <= 18) return 'error';
    return 'secondary';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      logical: '🧠',
      numerical: '🔢',
      spatial: '🎯',
      matrix: '⚡',
      pattern: '🔍'
    };
    return icons[category] || '❓';
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

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <select 
            value={filters.category}
            onChange={e => handleFilterChange('category', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">すべてのカテゴリ</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {getCategoryIcon(cat)} {getCategoryName(cat)}
              </option>
            ))}
          </select>

          <select
            value={filters.difficulty}
            onChange={e => handleFilterChange('difficulty', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">すべての難易度</option>
            {difficultyLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          {filteredProblems.slice(0, 10).map(problem => (
            <div
              key={problem.id}
              onClick={() => handleProblemClick(problem)}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{getCategoryIcon(problem.category)}</span>
                <div>
                  <div className="font-medium text-sm">問題 {problem.problemNumber}</div>
                  <div className="text-xs text-gray-600 truncate max-w-[200px]">
                    {problem.question}
                  </div>
                </div>
              </div>
              <Badge variant={getDifficultyBadgeVariant(problem.difficulty)}>
                {problem.difficulty}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MENSA問題ブラウザー
        </h1>
        <p className="text-gray-600">
          全{problems.length}問の本格的なMENSA IQテスト問題を体系的に管理・表示
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ
              </label>
              <select
                value={filters.category}
                onChange={e => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">すべて</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {getCategoryIcon(cat)} {getCategoryName(cat)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                難易度
              </label>
              <select
                value={filters.difficulty}
                onChange={e => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">すべて</option>
                {difficultyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                サブタイプ
              </label>
              <select
                value={filters.subtype}
                onChange={e => handleFilterChange('subtype', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">すべて</option>
                {subtypes.map(subtype => (
                  <option key={subtype} value={subtype}>
                    {subtype}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                検索
              </label>
              <input
                type="text"
                placeholder="問題を検索..."
                value={filters.search}
                onChange={e => handleFilterChange('search', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              表示中: {filteredProblems.length}問 / 総問題数: {problems.length}問
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({ category: 'all', difficulty: 'all', subtype: 'all', search: '' })}
            >
              フィルターをリセット
            </Button>
          </div>
        </div>
      </Card>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map(problem => (
          <Card
            key={problem.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            onClick={() => handleProblemClick(problem)}
          >
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(problem.category)}</span>
                  <Badge variant="secondary">
                    問題 {problem.problemNumber}
                  </Badge>
                </div>
                <Badge variant={getDifficultyBadgeVariant(problem.difficulty)}>
                  難易度 {problem.difficulty}
                </Badge>
              </div>

              {/* Category & Subtype */}
              <div className="space-y-1">
                <div className="text-sm text-gray-600">
                  {getCategoryName(problem.category)} - {problem.subtype}
                </div>
                <h3 className="font-semibold text-lg line-clamp-2">
                  {problem.title}
                </h3>
              </div>

              {/* Question Preview */}
              <p className="text-gray-700 text-sm line-clamp-3">
                {problem.question}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  正解: {problem.answerKey}
                </div>
                <Button size="sm" variant="primary">
                  問題を表示
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProblems.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            条件に一致する問題が見つかりません
          </h3>
          <p className="text-gray-600 mb-4">
            フィルター条件を調整して再度お試しください
          </p>
          <Button 
            variant="outline"
            onClick={() => setFilters({ category: 'all', difficulty: 'all', subtype: 'all', search: '' })}
          >
            フィルターをリセット
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ProblemBrowser;