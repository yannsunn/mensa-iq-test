// SVG図形生成ライブラリ - 数学的・幾何学的な図形を正確に生成

import { logger } from '@/utils/logger';

export type DiagramType = 
  | 'cross-section'  // 断面図
  | '3d-shapes'      // 立体図形
  | 'transformations' // 幾何学的変換
  | 'patterns'       // パターン
  | 'matrix'         // マトリックス
  | 'geometric'      // 幾何学図形
  | 'numerical'      // 数値図形
  | 'spatial';       // 空間図形

export interface SVGDiagramOptions {
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  backgroundColor?: string;
  style?: 'minimal' | 'detailed' | 'abstract' | 'geometric';
}

export interface DiagramElement {
  type: 'circle' | 'rect' | 'line' | 'path' | 'polygon' | 'ellipse' | 'text';
  attributes: Record<string, string | number>;
  children?: DiagramElement[];
}

export class SVGDiagramGenerator {
  private defaultOptions: SVGDiagramOptions = {
    width: 400,
    height: 400,
    strokeWidth: 2,
    strokeColor: '#000000',
    fillColor: 'none',
    backgroundColor: '#ffffff',
    style: 'minimal'
  };

  constructor(private options: SVGDiagramOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  // 球の断面図を生成
  generateSphereCrossSection(planeAngle: number = 0, planeHeight: number = 0): string {
    const { width, height, strokeWidth, strokeColor } = this.options;
    const centerX = width! / 2;
    const centerY = height! / 2;
    const radius = Math.min(width!, height!) * 0.4;
    
    // 断面円の半径を計算
    const crossSectionRadius = Math.sqrt(Math.max(0, radius * radius - planeHeight * planeHeight));
    
    const elements: DiagramElement[] = [
      // 背景
      {
        type: 'rect',
        attributes: {
          x: 0,
          y: 0,
          width: width!,
          height: height!,
          fill: this.options.backgroundColor!
        }
      },
      // 球の輪郭（大円）
      {
        type: 'circle',
        attributes: {
          cx: centerX,
          cy: centerY,
          r: radius,
          stroke: strokeColor!,
          'stroke-width': strokeWidth!,
          fill: 'none',
          opacity: 0.3
        }
      },
      // 断面円
      {
        type: 'ellipse',
        attributes: {
          cx: centerX,
          cy: centerY - planeHeight * Math.sin(planeAngle * Math.PI / 180),
          rx: crossSectionRadius,
          ry: crossSectionRadius * Math.cos(planeAngle * Math.PI / 180),
          stroke: strokeColor!,
          'stroke-width': strokeWidth! * 1.5,
          fill: '#e0e0e0',
          opacity: 0.8
        }
      },
      // 断面の中心点
      {
        type: 'circle',
        attributes: {
          cx: centerX,
          cy: centerY - planeHeight * Math.sin(planeAngle * Math.PI / 180),
          r: 3,
          fill: strokeColor!
        }
      }
    ];

    // 補助線（オプション）
    if (this.options.style === 'detailed') {
      // 垂直補助線
      elements.push({
        type: 'line',
        attributes: {
          x1: centerX,
          y1: centerY - radius,
          x2: centerX,
          y2: centerY + radius,
          stroke: strokeColor!,
          'stroke-width': 1,
          'stroke-dasharray': '5,5',
          opacity: 0.3
        }
      });
      // 水平補助線
      elements.push({
        type: 'line',
        attributes: {
          x1: centerX - radius,
          y1: centerY,
          x2: centerX + radius,
          y2: centerY,
          stroke: strokeColor!,
          'stroke-width': 1,
          'stroke-dasharray': '5,5',
          opacity: 0.3
        }
      });
    }

    return this.renderSVG(elements);
  }

  // 立方体の投影図を生成
  generateCubeProjection(rotationX: number = 30, rotationY: number = 45, rotationZ: number = 0): string {
    const { width, height, strokeWidth, strokeColor } = this.options;
    const centerX = width! / 2;
    const centerY = height! / 2;
    const size = Math.min(width!, height!) * 0.3;
    
    // 立方体の頂点を定義
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], // 背面
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]     // 前面
    ].map(v => v.map(coord => coord * size));
    
    // 回転行列を適用
    const rotatedVertices = vertices.map(vertex => 
      this.rotate3D(vertex, rotationX, rotationY, rotationZ)
    );
    
    // 投影（透視投影）
    const projectedVertices = rotatedVertices.map(vertex => {
      const perspective = 1 / (1 + vertex[2] / (size * 4));
      return [
        centerX + vertex[0] * perspective,
        centerY - vertex[1] * perspective
      ];
    });
    
    // エッジの定義
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // 背面
      [4, 5], [5, 6], [6, 7], [7, 4], // 前面
      [0, 4], [1, 5], [2, 6], [3, 7]  // 側面
    ];
    
    const elements: DiagramElement[] = [
      // 背景
      {
        type: 'rect',
        attributes: {
          x: 0,
          y: 0,
          width: width!,
          height: height!,
          fill: this.options.backgroundColor!
        }
      }
    ];
    
    // エッジを描画（奥行きに応じて透明度を調整）
    edges.forEach(([start, end]) => {
      const depth = (rotatedVertices[start][2] + rotatedVertices[end][2]) / 2;
      const opacity = 0.3 + 0.7 * (1 - (depth + size) / (2 * size));
      
      elements.push({
        type: 'line',
        attributes: {
          x1: projectedVertices[start][0],
          y1: projectedVertices[start][1],
          x2: projectedVertices[end][0],
          y2: projectedVertices[end][1],
          stroke: strokeColor!,
          'stroke-width': strokeWidth!,
          opacity: opacity
        }
      });
    });
    
    // 頂点を描画（オプション）
    if (this.options.style === 'detailed') {
      projectedVertices.forEach((vertex, i) => {
        const depth = rotatedVertices[i][2];
        const opacity = 0.3 + 0.7 * (1 - (depth + size) / (2 * size));
        
        elements.push({
          type: 'circle',
          attributes: {
            cx: vertex[0],
            cy: vertex[1],
            r: 3,
            fill: strokeColor!,
            opacity: opacity
          }
        });
      });
    }
    
    return this.renderSVG(elements);
  }

  // 幾何学的パターンを生成
  generateGeometricPattern(patternType: 'tessellation' | 'fractal' | 'symmetry', iterations: number = 3): string {
    const { width, height } = this.options;
    const elements: DiagramElement[] = [
      // 背景
      {
        type: 'rect',
        attributes: {
          x: 0,
          y: 0,
          width: width!,
          height: height!,
          fill: this.options.backgroundColor!
        }
      }
    ];
    
    switch (patternType) {
      case 'tessellation':
        elements.push(...this.generateTessellation());
        break;
      case 'fractal':
        elements.push(...this.generateFractal(iterations));
        break;
      case 'symmetry':
        elements.push(...this.generateSymmetryPattern());
        break;
    }
    
    return this.renderSVG(elements);
  }

  // マトリックスパターンを生成
  generateMatrixPattern(rows: number = 3, cols: number = 3, pattern: string[][]): string {
    const { width, height, strokeWidth, strokeColor } = this.options;
    const cellWidth = width! / (cols + 1);
    const cellHeight = height! / (rows + 1);
    const margin = Math.min(cellWidth, cellHeight) * 0.1;
    
    const elements: DiagramElement[] = [
      // 背景
      {
        type: 'rect',
        attributes: {
          x: 0,
          y: 0,
          width: width!,
          height: height!,
          fill: this.options.backgroundColor!
        }
      }
    ];
    
    // グリッドを描画
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col + 0.5) * cellWidth + cellWidth / 2;
        const y = (row + 0.5) * cellHeight + cellHeight / 2;
        
        // セルの枠
        elements.push({
          type: 'rect',
          attributes: {
            x: x - cellWidth / 2 + margin,
            y: y - cellHeight / 2 + margin,
            width: cellWidth - 2 * margin,
            height: cellHeight - 2 * margin,
            stroke: strokeColor!,
            'stroke-width': strokeWidth!,
            fill: 'none'
          }
        });
        
        // パターンに応じた図形を描画
        if (pattern[row] && pattern[row][col]) {
          const shapeElement = this.getShapeFromPattern(pattern[row][col], x, y, cellWidth - 2 * margin, cellHeight - 2 * margin);
          if (shapeElement) {
            elements.push(shapeElement);
          }
        }
      }
    }
    
    return this.renderSVG(elements);
  }

  // ヘルパーメソッド：3D回転
  private rotate3D(vertex: number[], angleX: number, angleY: number, angleZ: number): number[] {
    const radX = angleX * Math.PI / 180;
    const radY = angleY * Math.PI / 180;
    const radZ = angleZ * Math.PI / 180;
    
    let [x, y, z] = vertex;
    
    // X軸回転
    const y1 = y * Math.cos(radX) - z * Math.sin(radX);
    const z1 = y * Math.sin(radX) + z * Math.cos(radX);
    y = y1;
    z = z1;
    
    // Y軸回転
    const x2 = x * Math.cos(radY) + z * Math.sin(radY);
    const z2 = -x * Math.sin(radY) + z * Math.cos(radY);
    x = x2;
    z = z2;
    
    // Z軸回転
    const x3 = x * Math.cos(radZ) - y * Math.sin(radZ);
    const y3 = x * Math.sin(radZ) + y * Math.cos(radZ);
    x = x3;
    y = y3;
    
    return [x, y, z];
  }

  // テッセレーションパターンを生成
  private generateTessellation(): DiagramElement[] {
    const { width, height } = this.options;
    const elements: DiagramElement[] = [];
    const hexSize = 30;
    const rows = Math.ceil(height! / (hexSize * Math.sqrt(3)));
    const cols = Math.ceil(width! / (hexSize * 1.5));
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexSize * 1.5 + hexSize;
        const y = row * hexSize * Math.sqrt(3) + (col % 2) * hexSize * Math.sqrt(3) / 2 + hexSize;
        
        if (x < width! + hexSize && y < height! + hexSize) {
          elements.push(this.createHexagon(x, y, hexSize * 0.9));
        }
      }
    }
    
    return elements;
  }

  // フラクタルパターンを生成（シェルピンスキーの三角形）
  private generateFractal(iterations: number): DiagramElement[] {
    const { width, height } = this.options;
    const elements: DiagramElement[] = [];
    const size = Math.min(width!, height!) * 0.8;
    const centerX = width! / 2;
    const centerY = height! / 2;
    
    const generateSierpinski = (x: number, y: number, size: number, depth: number) => {
      if (depth === 0) {
        elements.push({
          type: 'polygon',
          attributes: {
            points: `${x},${y - size / 2} ${x - size / 2},${y + size / 2} ${x + size / 2},${y + size / 2}`,
            fill: this.options.strokeColor!,
            stroke: 'none'
          }
        });
      } else {
        const newSize = size / 2;
        generateSierpinski(x, y - newSize / 2, newSize, depth - 1);
        generateSierpinski(x - newSize / 2, y + newSize / 2, newSize, depth - 1);
        generateSierpinski(x + newSize / 2, y + newSize / 2, newSize, depth - 1);
      }
    };
    
    generateSierpinski(centerX, centerY, size, iterations);
    return elements;
  }

  // 対称パターンを生成
  private generateSymmetryPattern(): DiagramElement[] {
    const { width, height } = this.options;
    const elements: DiagramElement[] = [];
    const centerX = width! / 2;
    const centerY = height! / 2;
    const radius = Math.min(width!, height!) * 0.4;
    
    // 8回対称のパターン
    const symmetryCount = 8;
    for (let i = 0; i < symmetryCount; i++) {
      const angle = (i * 360 / symmetryCount) * Math.PI / 180;
      const x1 = centerX + radius * 0.3 * Math.cos(angle);
      const y1 = centerY + radius * 0.3 * Math.sin(angle);
      const x2 = centerX + radius * 0.8 * Math.cos(angle);
      const y2 = centerY + radius * 0.8 * Math.sin(angle);
      
      elements.push({
        type: 'line',
        attributes: {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          stroke: this.options.strokeColor!,
          'stroke-width': this.options.strokeWidth!
        }
      });
      
      // 装飾的な円
      elements.push({
        type: 'circle',
        attributes: {
          cx: x2,
          cy: y2,
          r: 5,
          fill: this.options.strokeColor!
        }
      });
    }
    
    // 中心の装飾
    elements.push({
      type: 'circle',
      attributes: {
        cx: centerX,
        cy: centerY,
        r: radius * 0.2,
        stroke: this.options.strokeColor!,
        'stroke-width': this.options.strokeWidth!,
        fill: 'none'
      }
    });
    
    return elements;
  }

  // 六角形を作成
  private createHexagon(x: number, y: number, size: number): DiagramElement {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60 - 30) * Math.PI / 180;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      points.push(`${px},${py}`);
    }
    
    return {
      type: 'polygon',
      attributes: {
        points: points.join(' '),
        stroke: this.options.strokeColor!,
        'stroke-width': this.options.strokeWidth!,
        fill: 'none'
      }
    };
  }

  // パターン文字列から図形を生成
  private getShapeFromPattern(pattern: string, x: number, y: number, width: number, height: number): DiagramElement | null {
    const { strokeColor, strokeWidth, fillColor } = this.options;
    
    switch (pattern) {
      case 'circle':
        return {
          type: 'circle',
          attributes: {
            cx: x,
            cy: y,
            r: Math.min(width, height) * 0.4,
            stroke: strokeColor!,
            'stroke-width': strokeWidth!,
            fill: fillColor!
          }
        };
      case 'square':
        return {
          type: 'rect',
          attributes: {
            x: x - width * 0.4,
            y: y - height * 0.4,
            width: width * 0.8,
            height: height * 0.8,
            stroke: strokeColor!,
            'stroke-width': strokeWidth!,
            fill: fillColor!
          }
        };
      case 'triangle':
        return {
          type: 'polygon',
          attributes: {
            points: `${x},${y - height * 0.4} ${x - width * 0.4},${y + height * 0.4} ${x + width * 0.4},${y + height * 0.4}`,
            stroke: strokeColor!,
            'stroke-width': strokeWidth!,
            fill: fillColor!
          }
        };
      case 'cross':
        return {
          type: 'path',
          attributes: {
            d: `M ${x - width * 0.3} ${y} L ${x + width * 0.3} ${y} M ${x} ${y - height * 0.3} L ${x} ${y + height * 0.3}`,
            stroke: strokeColor!,
            'stroke-width': strokeWidth! * 1.5,
            fill: 'none'
          }
        };
      default:
        return null;
    }
  }

  // SVGを文字列として生成
  private renderSVG(elements: DiagramElement[]): string {
    const { width, height } = this.options;
    
    const svgContent = elements.map(element => this.renderElement(element)).join('\n');
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${svgContent}
</svg>`;
  }

  // 要素を文字列として生成
  private renderElement(element: DiagramElement): string {
    const attributes = Object.entries(element.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    if (element.children && element.children.length > 0) {
      const childrenContent = element.children.map(child => this.renderElement(child)).join('\n');
      return `  <${element.type} ${attributes}>\n${childrenContent}\n  </${element.type}>`;
    } else {
      return `  <${element.type} ${attributes} />`;
    }
  }

  // カスタム図形生成（プロンプトベース）
  generateFromDescription(description: string, diagramType: DiagramType): string {
    logger.log(`Generating SVG diagram: ${diagramType} - ${description}`);
    
    // 説明文を解析して適切な図形を生成
    const lowerDesc = description.toLowerCase();
    
    switch (diagramType) {
      case 'cross-section':
        if (lowerDesc.includes('sphere') || lowerDesc.includes('球')) {
          const planeHeight = lowerDesc.includes('center') || lowerDesc.includes('中心') ? 0 : 0.5;
          const planeAngle = lowerDesc.includes('diagonal') || lowerDesc.includes('斜め') ? 45 : 0;
          return this.generateSphereCrossSection(planeAngle, planeHeight);
        }
        break;
        
      case '3d-shapes':
        if (lowerDesc.includes('cube') || lowerDesc.includes('立方体')) {
          return this.generateCubeProjection(30, 45, 0);
        }
        break;
        
      case 'patterns':
        if (lowerDesc.includes('tessellation') || lowerDesc.includes('タイル')) {
          return this.generateGeometricPattern('tessellation');
        } else if (lowerDesc.includes('fractal') || lowerDesc.includes('フラクタル')) {
          return this.generateGeometricPattern('fractal', 4);
        } else if (lowerDesc.includes('symmetry') || lowerDesc.includes('対称')) {
          return this.generateGeometricPattern('symmetry');
        }
        break;
        
      case 'matrix':
        // デフォルトの3x3マトリックス
        const defaultPattern = [
          ['circle', 'square', 'triangle'],
          ['square', 'triangle', 'circle'],
          ['triangle', 'circle', 'square']
        ];
        return this.generateMatrixPattern(3, 3, defaultPattern);
        
      default:
        // デフォルトは幾何学的パターン
        return this.generateGeometricPattern('symmetry');
    }
    
    // デフォルト：シンプルな円
    return this.generateSphereCrossSection(0, 0);
  }
}

// エクスポート用のヘルパー関数
export function generateSVGDiagram(
  description: string,
  diagramType: DiagramType,
  options?: SVGDiagramOptions
): string {
  const generator = new SVGDiagramGenerator(options);
  return generator.generateFromDescription(description, diagramType);
}

// Base64エンコード
export function svgToBase64(svg: string): string {
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}