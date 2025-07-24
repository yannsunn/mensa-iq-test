#!/usr/bin/env python3
"""
全44問のMENSA問題画像を一括生成するスクリプト
"""

import json
import os
from pathlib import Path
import shutil

class MensaProblemBulkGenerator:
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.templates_dir = self.base_dir / "templates"
        self.images_dir = self.base_dir / "images"
        self.data_dir = self.base_dir / "data"
        
        # 問題インデックスを読み込み
        with open(self.data_dir / "problems-index.json", "r", encoding="utf-8") as f:
            self.problems_data = json.load(f)
    
    def generate_all_problems(self):
        """全44問の画像を生成"""
        generated_count = 0
        
        for problem in self.problems_data["problems"]:
            try:
                output_path = self.generate_problem_image(problem)
                if output_path:
                    generated_count += 1
                    print(f"生成完了: {problem['id']} - {problem['title']}")
                else:
                    print(f"生成失敗: {problem['id']} - {problem['title']}")
            except Exception as e:
                print(f"エラー: {problem['id']} - {e}")
        
        print(f"\n全{generated_count}問の画像を生成しました")
        return generated_count
    
    def generate_problem_image(self, problem):
        """個別問題の画像を生成"""
        problem_type = problem["type"]
        
        if problem_type == "matrix-reasoning":
            return self.generate_matrix_problem(problem)
        elif problem_type == "sequence-completion":
            return self.generate_sequence_problem(problem)
        elif problem_type == "spatial-reasoning":
            return self.generate_spatial_problem(problem)
        elif problem_type == "pattern-recognition":
            return self.generate_pattern_problem(problem)
        elif problem_type == "logical-deduction":
            return self.generate_logical_problem(problem)
        else:
            return self.generate_generic_problem(problem)
    
    def generate_matrix_problem(self, problem):
        """行列推論問題を生成"""
        template_path = self.templates_dir / "matrix-template.html"
        with open(template_path, "r", encoding="utf-8") as f:
            template = f.read()
        
        # 基本情報を置換
        html = self.replace_basic_info(template, problem)
        
        # 行列パターンに応じた内容を生成
        subtype = problem["subtype"]
        if subtype == "point-symmetry":
            matrix_html = self.create_point_symmetry_matrix(problem)
        elif subtype == "rotation":
            matrix_html = self.create_rotation_matrix(problem)
        elif subtype == "distribution":
            matrix_html = self.create_distribution_matrix(problem)
        elif subtype == "progression":
            matrix_html = self.create_progression_matrix(problem)
        else:
            matrix_html = self.create_generic_matrix(problem)
        
        html = html.replace('<div id="matrix-container">', f'<div id="matrix-container">{matrix_html}')
        html = html.replace('<div class="options" id="options-container">', 
                          f'<div class="options" id="options-container">{self.create_options(problem)}')
        
        return self.save_html(html, problem["image_file"])
    
    def create_point_symmetry_matrix(self, problem):
        """点対称行列を生成"""
        # 問題9の既存パターンを参考に生成
        return '''
        <div class="matrix-3x3">
            <div class="cell"><span class="arrow arrow-up"></span></div>
            <div class="cell"><span class="arrow arrow-left"></span></div>
            <div class="cell"><span class="arrow arrow-down"></span></div>
            <div class="cell"><span class="arrow arrow-left"></span></div>
            <div class="cell"><span class="arrow arrow-up"></span></div>
            <div class="cell"><span class="arrow arrow-right"></span></div>
            <div class="cell"><span class="arrow arrow-down"></span></div>
            <div class="cell"><span class="arrow arrow-right"></span></div>
            <div class="cell missing">?</div>
        </div>
        '''
    
    def create_rotation_matrix(self, problem):
        """回転行列を生成"""
        return '''
        <div class="matrix-3x3">
            <div class="cell"><span class="triangle"></span></div>
            <div class="cell"><span class="triangle rotate-90"></span></div>
            <div class="cell"><span class="triangle rotate-180"></span></div>
            <div class="cell"><span class="triangle rotate-90"></span></div>
            <div class="cell"><span class="triangle rotate-180"></span></div>
            <div class="cell"><span class="triangle rotate-270"></span></div>
            <div class="cell"><span class="triangle rotate-180"></span></div>
            <div class="cell"><span class="triangle rotate-270"></span></div>
            <div class="cell missing">?</div>
        </div>
        '''
    
    def create_distribution_matrix(self, problem):
        """分布行列を生成"""
        return '''
        <div class="matrix-3x3">
            <div class="cell"><span class="circle"></span></div>
            <div class="cell"><span class="triangle"></span></div>
            <div class="cell"><span class="square"></span></div>
            <div class="cell"><span class="square"></span></div>
            <div class="cell"><span class="circle"></span></div>
            <div class="cell"><span class="triangle"></span></div>
            <div class="cell"><span class="triangle"></span></div>
            <div class="cell"><span class="square"></span></div>
            <div class="cell missing">?</div>
        </div>
        '''
    
    def create_progression_matrix(self, problem):
        """進行行列を生成"""
        return '''
        <div class="matrix-3x3">
            <div class="cell"><span class="circle small"></span></div>
            <div class="cell"><span class="circle medium"></span></div>
            <div class="cell"><span class="circle large"></span></div>
            <div class="cell"><span class="triangle small"></span></div>
            <div class="cell"><span class="triangle medium"></span></div>
            <div class="cell"><span class="triangle large"></span></div>
            <div class="cell"><span class="square small"></span></div>
            <div class="cell"><span class="square medium"></span></div>
            <div class="cell missing">?</div>
        </div>
        '''
    
    def create_generic_matrix(self, problem):
        """汎用行列を生成"""
        return '''
        <div class="matrix-3x3">
            <div class="cell">A</div>
            <div class="cell">B</div>
            <div class="cell">C</div>
            <div class="cell">D</div>
            <div class="cell">E</div>
            <div class="cell">F</div>
            <div class="cell">G</div>
            <div class="cell">H</div>
            <div class="cell missing">?</div>
        </div>
        '''
    
    def generate_sequence_problem(self, problem):
        """数列問題を生成"""
        template_path = self.templates_dir / "sequence-template.html"
        with open(template_path, "r", encoding="utf-8") as f:
            template = f.read()
        
        html = self.replace_basic_info(template, problem)
        sequence_html = self.create_sequence(problem)
        
        html = html.replace('<div class="sequence-container" id="sequence-container">', 
                          f'<div class="sequence-container" id="sequence-container">{sequence_html}')
        html = html.replace('<div class="options" id="options-container">', 
                          f'<div class="options" id="options-container">{self.create_options(problem)}')
        
        return self.save_html(html, problem["image_file"])
    
    def create_sequence(self, problem):
        """数列を生成"""
        # 数列パターンを問題文から抽出
        description = problem["description"]
        
        if "1, 4, 9, 16, 25" in description:
            sequence_items = ["1", "4", "9", "16", "25", "?"]
        elif "2, 6, 12, 20, 30" in description:
            sequence_items = ["2", "6", "12", "20", "30", "?"]
        elif "3, 7, 15, 31, 63" in description:
            sequence_items = ["3", "7", "15", "31", "63", "?"]
        elif "2, 3, 5, 8, 13" in description:
            sequence_items = ["2", "3", "5", "8", "13", "?"]
        else:
            # デフォルトの数列
            sequence_items = ["?", "?", "?", "?", "?", "?"]
        
        sequence_html = ""
        for i, item in enumerate(sequence_items):
            if item == "?":
                sequence_html += '<div class="sequence-item missing">?</div>'
            else:
                sequence_html += f'<div class="sequence-item"><span class="number">{item}</span></div>'
            
            if i < len(sequence_items) - 1:
                sequence_html += '<span class="arrow-between">→</span>'
        
        return sequence_html
    
    def generate_spatial_problem(self, problem):
        """空間認識問題を生成"""
        template_path = self.templates_dir / "spatial-template.html"
        with open(template_path, "r", encoding="utf-8") as f:
            template = f.read()
        
        html = self.replace_basic_info(template, problem)
        spatial_html = self.create_spatial_content(problem)
        
        html = html.replace('<div class="spatial-container" id="spatial-container">', 
                          f'<div class="spatial-container" id="spatial-container">{spatial_html}')
        html = html.replace('<div class="options" id="options-container">', 
                          f'<div class="options" id="options-container">{self.create_options(problem)}')
        
        return self.save_html(html, problem["image_file"])
    
    def create_spatial_content(self, problem):
        """空間認識コンテンツを生成"""
        subtype = problem["subtype"]
        
        if subtype == "3d-rotation":
            return self.create_cube_rotation()
        elif subtype == "folding":
            return self.create_folding_pattern()
        elif subtype == "projection":
            return self.create_projection_pattern()
        else:
            return '<div class="spatial-item">空間認識問題</div>'
    
    def create_cube_rotation(self):
        """立方体回転を生成"""
        return '''
        <div class="spatial-item">
            <div class="cube-net">
                <div class="cube-face" style="grid-column: 2; grid-row: 1;">A</div>
                <div class="cube-face" style="grid-column: 1; grid-row: 2;">B</div>
                <div class="cube-face" style="grid-column: 2; grid-row: 2;">C</div>
                <div class="cube-face" style="grid-column: 3; grid-row: 2;">D</div>
                <div class="cube-face" style="grid-column: 4; grid-row: 2;">E</div>
                <div class="cube-face" style="grid-column: 2; grid-row: 3;">F</div>
            </div>
        </div>
        '''
    
    def create_folding_pattern(self):
        """折り畳みパターンを生成"""
        return '''
        <div class="spatial-item">
            <div class="fold-pattern">
                <div class="fold-section">1</div>
                <div class="fold-section">2</div>
                <div class="fold-section">3</div>
            </div>
        </div>
        '''
    
    def create_projection_pattern(self):
        """投影パターンを生成"""
        return '<div class="spatial-item">立体図形の投影</div>'
    
    def generate_pattern_problem(self, problem):
        """パターン認識問題を生成"""
        return self.generate_generic_problem(problem)
    
    def generate_logical_problem(self, problem):
        """論理推論問題を生成"""
        return self.generate_generic_problem(problem)
    
    def generate_generic_problem(self, problem):
        """汎用問題を生成"""
        template_path = self.templates_dir / "matrix-template.html"
        with open(template_path, "r", encoding="utf-8") as f:
            template = f.read()
        
        html = self.replace_basic_info(template, problem)
        
        # シンプルな表示
        content_html = f'''
        <div style="text-align: center; padding: 40px; background: #f8f8f8; border-radius: 10px;">
            <h3>{problem['title']}</h3>
            <p style="margin: 20px 0; font-size: 16px; line-height: 1.5;">
                {problem['description']}
            </p>
        </div>
        '''
        
        html = html.replace('<div id="matrix-container">', f'<div id="matrix-container">{content_html}')
        html = html.replace('<div class="options" id="options-container">', 
                          f'<div class="options" id="options-container">{self.create_options(problem)}')
        
        return self.save_html(html, problem["image_file"])
    
    def replace_basic_info(self, template, problem):
        """基本情報を置換"""
        html = template.replace('<span id="problem-number">X</span>', f'<span id="problem-number">{problem["id"]}</span>')
        html = html.replace('<span id="difficulty">X</span>', f'<span id="difficulty">{problem["difficulty"]}</span>')
        html = html.replace('<span id="time">XX:XX</span>', '<span id="time">44:59</span>')
        html = html.replace('<strong id="instruction-text">問題の説明</strong>', 
                          f'<strong id="instruction-text">{problem["description"]}</strong>')
        return html
    
    def create_options(self, problem):
        """選択肢を生成"""
        options_html = ""
        letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
        
        for i, option in enumerate(problem["options"]):
            options_html += f'''
            <div class="option">
                <span class="option-letter">{letters[i]}</span>
                <span class="option-content">{option}</span>
            </div>
            '''
        
        return options_html
    
    def save_html(self, html, filename):
        """HTMLファイルを保存"""
        output_path = self.images_dir / filename
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html)
        return output_path

if __name__ == "__main__":
    generator = MensaProblemBulkGenerator()
    generator.generate_all_problems()