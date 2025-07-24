# MENSA問題画像管理システム

## 概要
MENSA IQテストの問題を体系的に管理し、再利用可能な形で画像を生成・保存するシステムです。

## ディレクトリ構造
```
mensa-problems/
├── images/          # 生成された問題画像（HTML）
├── templates/       # 問題タイプ別のテンプレート
├── data/           # 問題データベース（JSON）
└── generate-problem.py  # 画像生成スクリプト
```

## 問題タイプ
1. **行列推論 (matrix-reasoning)**
   - 点対称 (point-symmetry)
   - 回転 (rotation)
   - 進行 (progression)
   - 加減算 (addition-subtraction)
   - 分布 (distribution)

2. **数列完成 (sequence-completion)**
   - 数値 (numerical)
   - 図形 (geometric)
   - 混合 (mixed)

3. **空間認識 (spatial-reasoning)**
   - 3D回転 (3d-rotation)
   - 折り畳み (folding)
   - 鏡面反射 (mirror-reflection)
   - 投影 (projection)

4. **パターン認識 (pattern-recognition)**
   - 図形カウント (shape-counting)
   - 仲間外れ (odd-one-out)
   - 分類 (classification)

5. **論理推論 (logical-deduction)**
   - ブール演算 (boolean-operations)
   - 集合論 (set-theory)
   - 条件論理 (conditional-logic)

## 使用方法
1. 問題データを`data/problems-index.json`に追加
2. `generate-problem.py`を実行して画像を生成
3. 生成された画像は`images/`ディレクトリに保存され、再利用可能

## 問題データフォーマット
```json
{
  "id": "009",
  "type": "matrix-reasoning",
  "subtype": "point-symmetry",
  "difficulty": 7,
  "title": "行列推論 - 点対称パターン",
  "description": "3×3行列で、点対称のパターン。右下の要素は？",
  "image_file": "problem-009-matrix-point-symmetry.html",
  "answer": "B",
  "options": ["▲", "▼", "◀", "▶"],
  "explanation": "点対称では中心点を基準に180度回転"
}
```