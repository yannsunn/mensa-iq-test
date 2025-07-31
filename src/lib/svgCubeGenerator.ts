// 立方体専用のSVG生成ライブラリ

interface CubeFace {
  label: string;
  color?: string;
  pattern?: 'solid' | 'striped' | 'dotted';
}

interface CubeState {
  front: CubeFace;
  top: CubeFace;
  right: CubeFace;
  back?: CubeFace;
  bottom?: CubeFace;
  left?: CubeFace;
}

export class CubeSVGGenerator {
  private size: number;
  private perspective: number;

  constructor(size: number = 200, perspective: number = 0.7) {
    this.size = size;
    this.perspective = perspective;
  }

  // 立方体の等角投影図を生成
  generateIsometricCube(state: CubeState): string {
    const unit = this.size / 4;
    const cx = this.size / 2;
    const cy = this.size / 2;

    let svg = `<svg width="${this.size}" height="${this.size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${this.size}" height="${this.size}" fill="white"/>`;
    
    // 立方体の3つの可視面を描画
    svg += `<g transform="translate(${cx},${cy})">`;
    
    // 上面
    const topPoints = [
      [-unit, -unit * 1.5],
      [0, -unit * 2],
      [unit, -unit * 1.5],
      [0, -unit]
    ];
    svg += this.drawFace(topPoints, state.top, 'top');
    
    // 前面
    const frontPoints = [
      [-unit, -unit],
      [0, -unit * 0.5],
      [unit, -unit],
      [unit, 0],
      [0, unit * 0.5],
      [-unit, 0]
    ];
    svg += this.drawFace(frontPoints, state.front, 'front');
    
    // 右面
    const rightPoints = [
      [0, -unit * 0.5],
      [unit, -unit],
      [unit, 0],
      [0, unit * 0.5]
    ];
    svg += this.drawFace(rightPoints, state.right, 'right');
    
    svg += `</g>`;
    svg += `</svg>`;
    
    return svg;
  }

  // 立方体の回転状態を生成
  generateRotatedCube(state: CubeState, rotationX: number, rotationY: number): string {
    // 簡略化された回転表現
    const unit = this.size / 4;
    const cx = this.size / 2;
    const cy = this.size / 2;

    let svg = `<svg width="${this.size}" height="${this.size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${this.size}" height="${this.size}" fill="white"/>`;
    
    svg += `<g transform="translate(${cx},${cy}) rotate(${rotationY})">`;
    
    // 回転を示す矢印
    svg += `<path d="M ${-unit * 1.5},0 A ${unit * 1.5},${unit * 1.5} 0 0,1 0,${-unit * 1.5}" 
            fill="none" stroke="gray" stroke-width="2" stroke-dasharray="5,5" 
            marker-end="url(#arrowhead)"/>`;
    
    // 矢印の先端
    svg += `<defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="gray"/>
      </marker>
    </defs>`;
    
    // 立方体本体（簡略表示）
    svg += this.drawSimpleCube(state);
    
    svg += `</g>`;
    svg += `</svg>`;
    
    return svg;
  }

  // 立方体の展開図を生成
  generateCubeNet(faces: CubeFace[]): string {
    const unit = this.size / 6;
    
    let svg = `<svg width="${this.size * 1.5}" height="${this.size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${this.size * 1.5}" height="${this.size}" fill="white"/>`;
    
    // 十字型展開図の座標
    const positions = [
      { x: unit * 2, y: unit },      // 上
      { x: unit, y: unit * 2 },      // 左
      { x: unit * 2, y: unit * 2 },  // 前
      { x: unit * 3, y: unit * 2 },  // 右
      { x: unit * 4, y: unit * 2 },  // 後
      { x: unit * 2, y: unit * 3 }   // 下
    ];
    
    positions.forEach((pos, index) => {
      if (faces[index]) {
        svg += this.drawNetFace(pos.x, pos.y, unit, faces[index]);
      }
    });
    
    // 折り線
    svg += this.drawFoldLines(unit);
    
    svg += `</svg>`;
    
    return svg;
  }

  private drawFace(points: number[][], face: CubeFace, faceName: string): string {
    const pointsStr = points.map(p => `${p[0]},${p[1]}`).join(' ');
    let fill = 'white';
    
    if (face.color) {
      fill = face.color;
    } else if (face.pattern === 'striped') {
      fill = `url(#${faceName}Stripes)`;
    } else if (face.pattern === 'dotted') {
      fill = `url(#${faceName}Dots)`;
    }
    
    let svg = '';
    
    // パターン定義
    if (face.pattern === 'striped') {
      svg += `<defs>
        <pattern id="${faceName}Stripes" patternUnits="userSpaceOnUse" width="4" height="4">
          <line x1="0" y1="0" x2="0" y2="4" stroke="black" stroke-width="1"/>
        </pattern>
      </defs>`;
    } else if (face.pattern === 'dotted') {
      svg += `<defs>
        <pattern id="${faceName}Dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="2" cy="2" r="1" fill="black"/>
        </pattern>
      </defs>`;
    }
    
    svg += `<polygon points="${pointsStr}" fill="${fill}" stroke="black" stroke-width="2"/>`;
    
    // ラベル
    const centerX = points.reduce((sum, p) => sum + p[0], 0) / points.length;
    const centerY = points.reduce((sum, p) => sum + p[1], 0) / points.length;
    svg += `<text x="${centerX}" y="${centerY}" text-anchor="middle" 
            font-size="16" font-weight="bold">${face.label}</text>`;
    
    return svg;
  }

  private drawNetFace(x: number, y: number, size: number, face: CubeFace): string {
    let fill = 'white';
    
    if (face.color) {
      fill = face.color;
    }
    
    let svg = `<rect x="${x}" y="${y}" width="${size}" height="${size}" 
                fill="${fill}" stroke="black" stroke-width="2"/>`;
    
    svg += `<text x="${x + size/2}" y="${y + size/2 + 5}" text-anchor="middle" 
            font-size="14" font-weight="bold">${face.label}</text>`;
    
    return svg;
  }

  private drawFoldLines(unit: number): string {
    const foldStyle = 'stroke="gray" stroke-width="1" stroke-dasharray="3,3"';
    
    let svg = '';
    // 横折り線
    svg += `<line x1="${unit}" y1="${unit * 2}" x2="${unit * 5}" y2="${unit * 2}" ${foldStyle}/>`;
    svg += `<line x1="${unit}" y1="${unit * 3}" x2="${unit * 5}" y2="${unit * 3}" ${foldStyle}/>`;
    // 縦折り線
    svg += `<line x1="${unit * 2}" y1="${unit}" x2="${unit * 2}" y2="${unit * 4}" ${foldStyle}/>`;
    svg += `<line x1="${unit * 3}" y1="${unit * 2}" x2="${unit * 3}" y2="${unit * 3}" ${foldStyle}/>`;
    
    return svg;
  }

  private drawSimpleCube(state: CubeState): string {
    const unit = this.size / 6;
    
    // 簡略化された立方体
    let svg = `<g>`;
    
    // 前面
    svg += `<rect x="${-unit}" y="${-unit}" width="${unit * 2}" height="${unit * 2}" 
            fill="none" stroke="black" stroke-width="2"/>`;
    svg += `<text x="0" y="5" text-anchor="middle" font-size="14">${state.front.label}</text>`;
    
    // 上辺と右辺（立体感）
    svg += `<line x1="${-unit}" y1="${-unit}" x2="${-unit * 0.5}" y2="${-unit * 1.3}" 
            stroke="black" stroke-width="2"/>`;
    svg += `<line x1="${unit}" y1="${-unit}" x2="${unit * 1.5}" y2="${-unit * 1.3}" 
            stroke="black" stroke-width="2"/>`;
    svg += `<line x1="${-unit * 0.5}" y1="${-unit * 1.3}" x2="${unit * 1.5}" y2="${-unit * 1.3}" 
            stroke="black" stroke-width="2"/>`;
    
    svg += `</g>`;
    
    return svg;
  }
}

// 便利な関数
interface CubeSVGData {
  state?: CubeState;
  rotationX?: number;
  rotationY?: number;
  faces?: CubeFace[];
}

export const generateCubeSVG = (
  type: 'isometric' | 'rotation' | 'net',
  cubeData: CubeSVGData
): string => {
  const generator = new CubeSVGGenerator();
  
  switch (type) {
    case 'isometric':
      return generator.generateIsometricCube(cubeData.state || {
        front: { label: 'F' },
        top: { label: 'T' },
        right: { label: 'R' }
      });
    case 'rotation':
      return generator.generateRotatedCube(
        cubeData.state || {
          front: { label: 'F' },
          top: { label: 'T' },
          right: { label: 'R' }
        },
        cubeData.rotationX || 0,
        cubeData.rotationY || 0
      );
    case 'net':
      return generator.generateCubeNet(cubeData.faces || []);
    default:
      return generator.generateIsometricCube(cubeData.state || {
        front: { label: 'F' },
        top: { label: 'T' },
        right: { label: 'R' }
      });
  }
};