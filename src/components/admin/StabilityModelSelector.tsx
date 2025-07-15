// Stability AI モデル選択コンポーネント

'use client';

import { useState } from 'react';
import { STABILITY_AI_MODELS, StabilityAIModel } from '@/types/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { stabilityImageService } from '@/lib/stabilityImageGeneration';

export default function StabilityModelSelector() {
  const [selectedModel, setSelectedModel] = useState<StabilityAIModel>('sd-3.5-medium');
  const [questionsPerDay, setQuestionsPerDay] = useState(100);

  const models = Object.entries(STABILITY_AI_MODELS).map(([key, config]) => ({
    id: key as StabilityAIModel,
    ...config
  }));

  const calculateMonthlyCost = () => {
    return stabilityImageService.estimateMonthlyCost(questionsPerDay);
  };

  const costs = calculateMonthlyCost();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stability AI モデル選択</CardTitle>
          <CardDescription>
            用途に応じて最適なモデルを選択してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${selectedModel === model.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{model.name}</h3>
                  <Badge variant={selectedModel === model.id ? 'default' : 'outline'} className="text-xs">
                    ${model.cost}/画像
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{model.description}</p>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">最大解像度:</span>
                    <span className="font-medium">{model.maxResolution}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">生成時間:</span>
                    <span className="font-medium">
                      {model.cost >= 0.06 ? '8-15秒' : 
                       model.cost >= 0.03 ? '4-8秒' : 
                       '1-5秒'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-3">コスト試算</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 min-w-[120px]">1日の生成数:</label>
                <input
                  type="number"
                  value={questionsPerDay}
                  onChange={(e) => setQuestionsPerDay(Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded text-sm"
                  min="1"
                  max="10000"
                />
                <span className="text-sm text-gray-600">枚</span>
              </div>
              
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">開発環境（SDXL 1.0）:</span>
                  <span className="font-medium">${costs.development.toFixed(2)}/月</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">本番環境（SD 3.5 Medium）:</span>
                  <span className="font-medium">${costs.production.toFixed(2)}/月</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">推奨設定</h4>
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">開発</Badge>
                <span>SDXL 1.0 - コスト最小化</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">本番</Badge>
                <span>SD 3.5 Medium - バランス重視</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">高品質</Badge>
                <span>Stable Image Core - プロ仕様</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}