// SVG生成テスト用API

import { NextRequest } from 'next/server';
import { generateSVGDiagram, svgToBase64 } from '@/lib/svgDiagramGenerator';
import { 
  withErrorHandling,
  createSuccessResponse
} from '@/lib/apiErrorHandler';

export const GET = withErrorHandling(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'sphere';
  
  let svg: string;
  let description: string;
  
  switch (type) {
    case 'sphere':
      svg = generateSVGDiagram('球を平面で切った断面', 'cross-section', {
        style: 'detailed',
        strokeWidth: 2
      });
      description = '球の断面図（詳細スタイル）';
      break;
      
    case 'cube':
      svg = generateSVGDiagram('立方体の投影図', '3d-shapes', {
        style: 'minimal'
      });
      description = '立方体の3D投影';
      break;
      
    case 'pattern':
      svg = generateSVGDiagram('六角形のテッセレーション', 'patterns', {
        style: 'geometric'
      });
      description = '幾何学的パターン';
      break;
      
    case 'matrix':
      svg = generateSVGDiagram('3x3のマトリックスパターン', 'matrix', {
        style: 'minimal'
      });
      description = 'マトリックス図形';
      break;
      
    default:
      svg = generateSVGDiagram('対称パターン', 'patterns', {
        style: 'abstract'
      });
      description = '対称性パターン';
  }
  
  const base64 = svgToBase64(svg);
  
  return createSuccessResponse({
    type,
    description,
    svg,
    base64,
    imageUrl: base64
  });
});