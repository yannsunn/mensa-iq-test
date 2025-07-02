'use client';

// Visual Matrix component for pattern recognition questions

interface VisualMatrixProps {
  pattern: string[][];
  options: string[];
  onSelect: (index: number) => void;
  selectedAnswer: number | null;
}

export default function VisualMatrix({ pattern, options, onSelect, selectedAnswer }: VisualMatrixProps) {
  const renderCell = (cell: string, index: number) => {
    if (cell === '?') {
      return (
        <div key={index} className="w-16 h-16 border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-2xl">?</span>
        </div>
      );
    }

    return (
      <div key={index} className="w-16 h-16 border border-gray-300 bg-white flex items-center justify-center">
        {renderSymbol(cell)}
      </div>
    );
  };

  const renderSymbol = (symbol: string) => {
    const symbolMap: { [key: string]: React.ReactElement } = {
      '○': <div className="w-8 h-8 border-2 border-black rounded-full" />,
      '●': <div className="w-8 h-8 bg-black rounded-full" />,
      '△': <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-black" />,
      '▲': <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-black bg-black" />,
      '□': <div className="w-8 h-8 border-2 border-black" />,
      '■': <div className="w-8 h-8 bg-black" />,
      '↑': <div className="text-2xl">↑</div>,
      '→': <div className="text-2xl">→</div>,
      '↓': <div className="text-2xl">↓</div>,
      '←': <div className="text-2xl">←</div>,
      '大': <div className="w-10 h-10 border-2 border-black rounded-full" />,
      '中': <div className="w-6 h-6 border-2 border-black rounded-full" />,
      '小': <div className="w-4 h-4 border-2 border-black rounded-full" />,
    };

    return symbolMap[symbol] || <span className="text-lg">{symbol}</span>;
  };

  return (
    <div className="space-y-6">
      {/* 3x3 Matrix */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">パターンを分析してください：</h3>
        <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
          {pattern.flat().map((cell, index) => renderCell(cell, index))}
        </div>
      </div>

      {/* Options */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">選択肢：</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-center h-20
                ${selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {renderSymbol(option)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}