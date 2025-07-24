#!/usr/bin/env python3
"""
MENSA問題画像生成システム
各問題タイプに応じたHTML画像を生成し、再利用可能な形で保存
"""

import json
import os
import shutil
from pathlib import Path

class MensaProblemGenerator:
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.templates_dir = self.base_dir / "templates"
        self.images_dir = self.base_dir / "images"
        self.data_dir = self.base_dir / "data"
        
        # 問題インデックスを読み込み
        with open(self.data_dir / "problems-index.json", "r", encoding="utf-8") as f:
            self.problems_data = json.load(f)
    
    def generate_matrix_problem(self, problem_id, pattern_type, content):
        """行列推論問題を生成"""
        template_path = self.templates_dir / "matrix-template.html"
        with open(template_path, "r", encoding="utf-8") as f:
            template = f.read()
        
        # HTMLにコンテンツを挿入
        html = template.replace('<span id="problem-number">X</span>', f'<span id="problem-number">{problem_id}</span>')
        
        # パターンタイプに応じた行列を生成
        if pattern_type == "point-symmetry":
            matrix_html = self._generate_point_symmetry_matrix(content)
        elif pattern_type == "rotation":
            matrix_html = self._generate_rotation_matrix(content)
        elif pattern_type == "progression":
            matrix_html = self._generate_progression_matrix(content)
        else:
            matrix_html = self._generate_default_matrix(content)
        
        html = html.replace('<div id="matrix-container">', f'<div id="matrix-container">{matrix_html}')
        
        # オプションを生成
        options_html = self._generate_options(content.get("options", []))
        html = html.replace('<div class="options" id="options-container">', 
                          f'<div class="options" id="options-container">{options_html}')
        
        # ファイルを保存
        output_path = self.images_dir / f"problem-{problem_id}-{pattern_type}.html"
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html)
        
        return output_path
    
    def _generate_point_symmetry_matrix(self, content):
        """点対称パターンの行列を生成"""
        cells = content.get("cells", [])
        matrix_html = '<div class="matrix-3x3">\n'
        
        for i, cell in enumerate(cells):
            if i == 8:  # 右下は？マーク
                matrix_html += '    <div class="cell missing">?</div>\n'
            else:
                matrix_html += f'    <div class="cell">{self._render_shape(cell)}</div>\n'
        
        matrix_html += '</div>'
        return matrix_html
    
    def _render_shape(self, shape_def):
        """図形を描画"""
        if shape_def.startswith("arrow-"):
            direction = shape_def.split("-")[1]
            return f'<span class="arrow arrow-{direction}"></span>'
        elif shape_def == "circle":
            return '<div class="circle"></div>'
        elif shape_def == "square":
            return '<div class="square"></div>'
        elif shape_def == "triangle":
            return '<div class="triangle"></div>'
        elif shape_def == "diamond":
            return '<div class="diamond"></div>'
        else:
            return shape_def
    
    def _generate_options(self, options):
        """選択肢を生成"""
        options_html = ""
        letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
        
        for i, option in enumerate(options):
            options_html += f'''
            <div class="option">
                <span class="option-letter">{letters[i]}</span>
                <span class="option-content">{option}</span>
            </div>
            '''
        
        return options_html
    
    def get_or_create_problem(self, problem_id):
        """問題IDから既存の画像を取得、なければ生成"""
        # 既存の問題を検索
        for problem in self.problems_data["problems"]:
            if problem["id"] == problem_id:
                image_path = self.images_dir / problem["image_file"]
                if image_path.exists():
                    return image_path
                else:
                    # 画像がなければ生成
                    return self.generate_problem(problem)
        
        return None
    
    def generate_problem(self, problem_data):
        """問題データから画像を生成"""
        problem_type = problem_data["type"]
        
        if problem_type == "matrix-reasoning":
            return self.generate_matrix_problem(
                problem_data["id"],
                problem_data["subtype"],
                problem_data
            )
        # 他のタイプも同様に実装可能
        
        return None

# 使用例
if __name__ == "__main__":
    generator = MensaProblemGenerator()
    
    # 問題9の画像を取得または生成
    problem_path = generator.get_or_create_problem("009")
    if problem_path:
        print(f"問題画像: {problem_path}")