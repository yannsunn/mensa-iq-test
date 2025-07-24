#!/usr/bin/env python3
"""
MENSA問題データをproblems-index.jsonに変換するスクリプト
"""

import json
import os
from pathlib import Path

def convert_questions():
    """抽出されたMENSA問題をproblems-index.jsonに変換"""
    
    # 抽出されたデータを読み込み
    source_path = Path("/mnt/c/Users/march/MENSA攻略ツール/extracted_mensa_questions.json")
    target_path = Path("/mnt/c/Users/march/MENSA攻略ツール/mensa-problems/data/problems-index.json")
    
    with open(source_path, "r", encoding="utf-8") as f:
        source_data = json.load(f)
    
    # 既存のproblems-index.jsonを読み込み
    with open(target_path, "r", encoding="utf-8") as f:
        problems_index = json.load(f)
    
    # 全問題を変換
    problems_list = []
    
    for q in source_data["mensa_test_questions"]:
        # 問題タイプの分類
        problem_type = classify_problem_type(q["type"], q["question"])
        subtype = classify_subtype(q["type"], q["question"], q.get("visual_data"))
        
        # 問題IDを3桁の文字列に変換
        problem_id = f"{q['id']:03d}"
        
        # 画像ファイル名を生成
        image_file = f"problem-{problem_id}-{subtype}.html"
        
        # 選択肢をA,B,C,D形式に変換
        option_letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
        answer_letter = option_letters[q["correct_answer"]]
        
        problem_data = {
            "id": problem_id,
            "type": problem_type,
            "subtype": subtype,
            "difficulty": q["difficulty"],
            "title": f"{get_type_title(problem_type)} - {subtype}",
            "description": q["question"],
            "image_file": image_file,
            "answer": answer_letter,
            "options": q["options"],
            "explanation": generate_explanation(q),
            "visual_data": q.get("visual_data"),
            "original_id": q["question_id"]
        }
        
        problems_list.append(problem_data)
    
    # problems-index.jsonを更新
    problems_index["problems"] = problems_list
    
    # ファイルに保存
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(problems_index, f, ensure_ascii=False, indent=2)
    
    print(f"全{len(problems_list)}問を変換してproblems-index.jsonに保存しました")
    return problems_list

def classify_problem_type(question_type, question_text):
    """問題タイプを分類"""
    type_mapping = {
        "logical": "logical-deduction",
        "numerical": "sequence-completion", 
        "spatial": "spatial-reasoning",
        "matrix": "matrix-reasoning",
        "verbal": "pattern-recognition",
        "abstract": "matrix-reasoning",
        "memory": "pattern-recognition"
    }
    return type_mapping.get(question_type, "pattern-recognition")

def classify_subtype(question_type, question_text, visual_data):
    """問題サブタイプを分類"""
    if question_type == "logical":
        if "すべて" in question_text or "いくつか" in question_text:
            return "set-theory"
        elif ">" in question_text or "より" in question_text:
            return "conditional-logic"
        else:
            return "boolean-operations"
    
    elif question_type == "numerical":
        if any(x in question_text for x in ["数列", "次の数", "パターン"]):
            return "numerical"
        else:
            return "mixed"
    
    elif question_type == "spatial":
        if "立方体" in question_text or "cube" in str(visual_data):
            return "3d-rotation"
        elif "展開" in question_text or "net" in str(visual_data):
            return "folding"
        elif "鏡" in question_text or "mirror" in str(visual_data):
            return "mirror-reflection"
        else:
            return "projection"
    
    elif question_type == "matrix":
        if "点対称" in question_text:
            return "point-symmetry"
        elif "回転" in question_text:
            return "rotation"
        elif "進行" in question_text or "progression" in question_text:
            return "progression"
        else:
            return "distribution"
    
    elif question_type == "verbal":
        return "classification"
    
    elif question_type == "abstract":
        return "progression"
    
    elif question_type == "memory":
        return "shape-counting"
    
    else:
        return "odd-one-out"

def get_type_title(problem_type):
    """問題タイプの日本語タイトルを取得"""
    titles = {
        "matrix-reasoning": "行列推論",
        "sequence-completion": "数列完成",
        "spatial-reasoning": "空間認識", 
        "pattern-recognition": "パターン認識",
        "logical-deduction": "論理推論"
    }
    return titles.get(problem_type, "認知推論")

def generate_explanation(question_data):
    """問題の解説を生成"""
    q_type = question_data["type"]
    answer_idx = question_data["correct_answer"]
    answer_text = question_data["options"][answer_idx]
    
    if q_type == "logical":
        return f"三段論法の基本原理により、正解は「{answer_text}」"
    elif q_type == "numerical":
        return f"数列のパターンを分析すると、正解は「{answer_text}」"
    elif q_type == "spatial":
        return f"空間変換を考慮すると、正解は「{answer_text}」"
    else:
        return f"問題の規則性から、正解は「{answer_text}」"

if __name__ == "__main__":
    convert_questions()