// IQスコアとパーセンタイル計算の統一ユーティリティ

export function calculateIQScore(correctAnswers: number, totalQuestions: number): number {
  const percentageScore = (correctAnswers / totalQuestions) * 100;
  
  if (percentageScore >= 97) return Math.round(145 + (percentageScore - 97) * 2);
  if (percentageScore >= 90) return Math.round(130 + (percentageScore - 90) * 2.14);
  if (percentageScore >= 80) return Math.round(115 + (percentageScore - 80) * 1.5);
  if (percentageScore >= 70) return Math.round(100 + (percentageScore - 70) * 1.5);
  if (percentageScore >= 50) return Math.round(85 + (percentageScore - 50) * 0.75);
  return Math.round(60 + percentageScore * 0.5);
}

export function calculatePercentile(iqScore: number): number {
  // IQスコアからパーセンタイルへの変換（正規分布に基づく）
  const percentileMap: [number, number][] = [
    [160, 99.99],
    [155, 99.98],
    [150, 99.96],
    [145, 99.87],
    [140, 99.62],
    [135, 99.0],
    [130, 98.0],
    [125, 95.0],
    [120, 91.0],
    [115, 84.0],
    [110, 75.0],
    [105, 63.0],
    [100, 50.0],
    [95, 37.0],
    [90, 25.0],
    [85, 16.0],
    [80, 9.0],
    [75, 5.0],
    [70, 2.0],
    [65, 1.0],
    [60, 0.4]
  ];

  // 最も近い値を見つける
  for (let i = 0; i < percentileMap.length; i++) {
    if (iqScore >= percentileMap[i][0]) {
      return percentileMap[i][1];
    }
  }
  
  // 60未満の場合
  return Math.max(0.1, (iqScore - 55) * 0.32);
}

export function getIQClassification(iqScore: number): {
  classification: string;
  description: string;
  color: string;
} {
  if (iqScore >= 145) {
    return {
      classification: '天才',
      description: '人口の0.13%未満',
      color: 'purple'
    };
  }
  if (iqScore >= 130) {
    return {
      classification: '非常に優秀',
      description: 'MENSA入会資格あり（上位2%）',
      color: 'indigo'
    };
  }
  if (iqScore >= 120) {
    return {
      classification: '優秀',
      description: '上位9%',
      color: 'blue'
    };
  }
  if (iqScore >= 110) {
    return {
      classification: '平均以上',
      description: '上位25%',
      color: 'green'
    };
  }
  if (iqScore >= 90) {
    return {
      classification: '平均',
      description: '人口の50%',
      color: 'yellow'
    };
  }
  if (iqScore >= 80) {
    return {
      classification: '平均以下',
      description: '下位25%',
      color: 'orange'
    };
  }
  return {
    classification: '低い',
    description: '下位9%',
    color: 'red'
  };
}

export function calculateCategoryScores(
  answers: (number | null)[],
  questions: Array<{ category: string; correctAnswer: number }>
): Record<string, { correct: number; total: number; percentage: number }> {
  const categoryScores: Record<string, { correct: number; total: number; percentage: number }> = {};
  const categories = new Set(questions.map(q => q.category));

  categories.forEach(category => {
    const categoryQuestions = questions
      .map((q, index) => ({ ...q, index }))
      .filter(q => q.category === category);
    
    const correctCount = categoryQuestions.reduce((count, question) => {
      return count + (answers[question.index] === question.correctAnswer ? 1 : 0);
    }, 0);

    categoryScores[category] = {
      correct: correctCount,
      total: categoryQuestions.length,
      percentage: categoryQuestions.length > 0 
        ? Math.round((correctCount / categoryQuestions.length) * 100)
        : 0
    };
  });

  return categoryScores;
}

// 難易度に基づくスコア調整
export function adjustScoreByDifficulty(
  baseScore: number,
  averageDifficulty: number,
  maxDifficulty: number = 20
): number {
  // 難易度による重み付け（難しい問題ほど高いスコア）
  const difficultyFactor = averageDifficulty / maxDifficulty;
  const adjustment = 1 + (difficultyFactor * 0.2); // 最大20%のボーナス
  
  return Math.round(baseScore * adjustment);
}