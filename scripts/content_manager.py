#!/usr/bin/env python3
"""
MDM Support Site Content Manager
用於管理 glossary.ts 和 QA 文件的 GUI 工具
"""

HELP_TEXT = """
# 內容管理工具使用說明 ✨

## 🚀 核心功能

### 1. 術語表管理 (Glossary)
- **新增/編輯**: 填寫術語名稱、分類、定義與白話解釋。
- **自動分類**: 提供 11 種標準分類供複選。
- **自動排序**: 儲存後會自動執行 `sort_glossary.js` 進行字母排序。

### 2. 問答管理 (QA Files)
- **管理 8 個文件**: 帳號、註冊、App、課堂、數位學習、硬體、Mac、教育場域。
- **ID 規範**: 請遵循各文件的 ID 命名慣例 (如 edu-01, acc-01)。
- **標籤**: 使用逗號分隔多個標籤。
- **答案**: 支援 Markdown 格式，可直接貼上課表或列表。

## 🛠️ 操作指南

- **雙擊項目**: 快速載入到編輯器開始編輯。
- **上移/下移**: 手動調整列表中的項目順序。
- **複製項目**: 快速複製現有內容並自動生成新 ID/名稱，適合批量建立相似項目。
- **儲存變更**: 點擊儲存後，系統會自動建立備份檔 (帶時間戳)。

## 🛡️ 安全機制

1. **自動備份**: 每次點擊「儲存變更」前，原文件會自動備份為 `*.backup.YYYYMMDD_HHMMSS`。
2. **刪除確認**: 刪除操作需經過雙重確認，防止手滑誤刪。
3. **效能優化**: 採用增量解析技術，流暢處理大型文件。

## ⌨️ 快捷操作

- **Tab**: 在不同欄位間切換。
- **鼠標滾輪**: 滾動左側列表或右側編輯區。

---
*版本: v1.1 | 最後更新: 2026-01-09*
"""

import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import json
import re
import os
import subprocess
from datetime import datetime
from pathlib import Path

class ContentManager:
    def __init__(self, root):
        self.root = root
        self.root.title("MDM Support Site - 內容管理工具")
        self.root.geometry("1400x900")
        
        # 設定項目根目錄
        self.project_root = Path(__file__).parent.parent
        self.data_dir = self.project_root / "docs" / "data"
        
        # 文件映射
        self.files = {
            "Glossary 術語表": self.data_dir / "glossary.ts",
            "01 - 帳號與伺服器": self.data_dir / "01-account.ts",
            "02 - 註冊": self.data_dir / "02-enrollment.ts",
            "03 - App": self.data_dir / "03-apps.ts",
            "04 - 課堂": self.data_dir / "04-classroom.ts",
            "05 - 數位學習": self.data_dir / "05-digital-learning.ts",
            "06 - 硬體": self.data_dir / "06-hardware.ts",
            "07 - Mac": self.data_dir / "07-mac.ts",
            "08 - 教育場域": self.data_dir / "08-qa-education.ts"
        }
        
        self.current_file = None
        self.current_data = []
        self.is_glossary = False
        
        self.setup_ui()
        
    def setup_ui(self):
        """設置UI界面"""
        # 主框架
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(0, weight=1)
        
        # 左側：文件選擇和列表
        left_frame = ttk.Frame(main_frame, width=350)
        left_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S), padx=(0, 10))
        left_frame.grid_propagate(False)
        
        ttk.Label(left_frame, text="選擇文件:", font=('Arial', 12, 'bold')).pack(pady=(0, 5))
        
        self.file_combo = ttk.Combobox(left_frame, values=list(self.files.keys()), state="readonly", width=35)
        self.file_combo.pack(pady=(0, 10), fill=tk.X)
        self.file_combo.bind('<<ComboboxSelected>>', self.on_file_selected)
        
        # 統計資訊
        self.stats_label = ttk.Label(left_frame, text="", font=('Arial', 9))
        self.stats_label.pack(pady=(0, 10))
        
        ttk.Label(left_frame, text="現有項目:", font=('Arial', 10, 'bold')).pack(pady=(5, 5))
        
        # 搜尋框
        search_frame = ttk.Frame(left_frame)
        search_frame.pack(fill=tk.X, pady=(0, 5))
        ttk.Label(search_frame, text="🔍").pack(side=tk.LEFT)
        self.search_var = tk.StringVar()
        self.search_var.trace('w', self.filter_list)
        search_entry = ttk.Entry(search_frame, textvariable=self.search_var)
        search_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(5, 0))
        
        # 列表框架
        list_frame = ttk.Frame(left_frame)
        list_frame.pack(fill=tk.BOTH, expand=True)
        
        scrollbar = ttk.Scrollbar(list_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.item_listbox = tk.Listbox(list_frame, yscrollcommand=scrollbar.set, font=('Arial', 10))
        self.item_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.item_listbox.yview)
        
        self.item_listbox.bind('<<ListboxSelect>>', self.on_item_selected)
        self.item_listbox.bind('<Double-Button-1>', lambda e: self.edit_item())
        
        # 操作按鈕組
        button_frame = ttk.LabelFrame(left_frame, text="操作", padding="5")
        button_frame.pack(fill=tk.X, pady=(10, 0))
        
        # 主要操作
        main_ops = ttk.Frame(button_frame)
        main_ops.pack(fill=tk.X)
        ttk.Button(main_ops, text="➕ 新增", command=self.add_item, width=12).pack(side=tk.LEFT, padx=2, pady=2)
        ttk.Button(main_ops, text="✏️ 編輯", command=self.edit_item, width=12).pack(side=tk.LEFT, padx=2, pady=2)
        ttk.Button(main_ops, text="🗑️ 刪除", command=self.delete_item, width=12).pack(side=tk.LEFT, padx=2, pady=2)
        
        # 排序與輔助操作
        extra_ops = ttk.Frame(button_frame)
        extra_ops.pack(fill=tk.X)
        ttk.Button(extra_ops, text="⬆️ 上移", command=self.move_up, width=12).pack(side=tk.LEFT, padx=2, pady=2)
        ttk.Button(extra_ops, text="⬇️ 下移", command=self.move_down, width=12).pack(side=tk.LEFT, padx=2, pady=2)
        ttk.Button(extra_ops, text="📋 複製", command=self.duplicate_item, width=12).pack(side=tk.LEFT, padx=2, pady=2)
        
        # 輔助與儲存
        bottom_ops = ttk.Frame(button_frame)
        bottom_ops.pack(fill=tk.X)
        ttk.Button(bottom_ops, text="🔄 重新排列", command=self.resort_data, width=12).pack(side=tk.LEFT, padx=2, pady=2)
        ttk.Button(bottom_ops, text="❓ 說明", command=self.show_help, width=12).pack(side=tk.LEFT, padx=2, pady=2)
        
        # 儲存按鈕（突出顯示）
        save_frame = ttk.Frame(button_frame)
        save_frame.pack(fill=tk.X, pady=(5, 0))
        ttk.Button(save_frame, text="💾 儲存變更", command=self.save_changes).pack(fill=tk.X)
        
        # 右側：編輯區域（使用Canvas和Scrollbar實現整體滾動）
        right_frame = ttk.Frame(main_frame)
        right_frame.grid(row=0, column=1, sticky=(tk.W, tk.E, tk.N, tk.S))
        right_frame.columnconfigure(0, weight=1)
        right_frame.rowconfigure(1, weight=1)
        
        # 標題和工具列
        header_frame = ttk.Frame(right_frame)
        header_frame.grid(row=0, column=0, sticky=(tk.W, tk.E), pady=(0, 5))
        
        self.edit_title = ttk.Label(header_frame, text="請選擇文件開始編輯", font=('Arial', 14, 'bold'))
        self.edit_title.pack(side=tk.LEFT)
        
        # 編輯區Canvas（支援滾動）
        edit_canvas_frame = ttk.Frame(right_frame)
        edit_canvas_frame.grid(row=1, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        edit_canvas_frame.columnconfigure(0, weight=1)
        edit_canvas_frame.rowconfigure(0, weight=1)
        
        # Canvas和Scrollbar
        self.edit_canvas = tk.Canvas(edit_canvas_frame, highlightthickness=0)
        edit_scrollbar = ttk.Scrollbar(edit_canvas_frame, orient="vertical", command=self.edit_canvas.yview)
        self.edit_canvas.configure(yscrollcommand=edit_scrollbar.set)
        
        self.edit_canvas.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        edit_scrollbar.grid(row=0, column=1, sticky=(tk.N, tk.S))
        
        # 編輯內容容器
        self.edit_container = ttk.Frame(self.edit_canvas)
        self.canvas_window = self.edit_canvas.create_window((0, 0), window=self.edit_container, anchor="nw")
        
        # 綁定滾動事件
        self.edit_container.bind('<Configure>', lambda e: self.edit_canvas.configure(scrollregion=self.edit_canvas.bbox("all")))
        self.edit_canvas.bind('<Configure>', self._on_canvas_configure)
        
        # 鼠標滾輪支援
        self.edit_canvas.bind_all("<MouseWheel>", self._on_mousewheel)
        
        # 建立編輯頁面
        self.create_edit_pages()
        
        # 狀態列
        status_frame = ttk.Frame(main_frame)
        status_frame.grid(row=1, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(5, 0))
        
        self.status_label = ttk.Label(status_frame, text="就緒", relief=tk.SUNKEN, anchor=tk.W)
        self.status_label.pack(fill=tk.X)
    
    def _on_canvas_configure(self, event):
        """Canvas 大小變化時調整內容寬度"""
        self.edit_canvas.itemconfig(self.canvas_window, width=event.width)
    
    def _on_mousewheel(self, event):
        """鼠標滾輪滾動"""
        self.edit_canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        
    def create_edit_pages(self):
        """創建編輯頁面"""
        # 清空容器
        for widget in self.edit_container.winfo_children():
            widget.destroy()
        
        # Glossary 術語編輯表單
        self.glossary_frame = ttk.Frame(self.edit_container, padding="10")
        
        row = 0
        # Term
        ttk.Label(self.glossary_frame, text="術語名稱 (Term):", font=('Arial', 11, 'bold')).grid(row=row, column=0, sticky=tk.W, pady=(0, 5))
        row += 1
        self.term_entry = ttk.Entry(self.glossary_frame, font=('Arial', 11))
        self.term_entry.grid(row=row, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        row += 1
        
        # Category
        ttk.Label(self.glossary_frame, text="分類 (Category):", font=('Arial', 11, 'bold')).grid(row=row, column=0, sticky=tk.W, pady=(0, 5))
        row += 1
        category_frame = ttk.Frame(self.glossary_frame)
        category_frame.grid(row=row, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        
        self.category_vars = {}
        categories = ["Core", "Enrollment", "Apple", "Network", "Security", "Hardware", "Apps", "Other", "Education", "Jamf", "macOS"]
        for i, cat in enumerate(categories):
            var = tk.BooleanVar()
            self.category_vars[cat] = var
            ttk.Checkbutton(category_frame, text=cat, variable=var).grid(row=i//4, column=i%4, sticky=tk.W, padx=10, pady=2)
        row += 1
        
        # Definition
        ttk.Label(self.glossary_frame, text="定義 (Definition):", font=('Arial', 11, 'bold')).grid(row=row, column=0, sticky=tk.W, pady=(0, 5))
        row += 1
        self.definition_text = scrolledtext.ScrolledText(self.glossary_frame, height=10, wrap=tk.WORD, font=('Arial', 10))
        self.definition_text.grid(row=row, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        row += 1
        
        # Analogy
        ttk.Label(self.glossary_frame, text="白話解釋 (Analogy):", font=('Arial', 11, 'bold')).grid(row=row, column=0, sticky=tk.W, pady=(0, 5))
        row += 1
        self.analogy_text = scrolledtext.ScrolledText(self.glossary_frame, height=10, wrap=tk.WORD, font=('Arial', 10))
        self.analogy_text.grid(row=row, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        
        self.glossary_frame.columnconfigure(0, weight=1)
        
        # QA 問答編輯表單
        self.qa_frame = ttk.Frame(self.edit_container, padding="10")
        
        row = 0
        # ID and Important
        id_frame = ttk.Frame(self.qa_frame)
        id_frame.grid(row=row, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        
        ttk.Label(id_frame, text="ID:", font=('Arial', 11, 'bold')).pack(side=tk.LEFT)
        self.qa_id_entry = ttk.Entry(id_frame, width=20, font=('Arial', 11))
        self.qa_id_entry.pack(side=tk.LEFT, padx=(10, 20))
        
        self.qa_important_var = tk.BooleanVar()
        ttk.Checkbutton(id_frame, text="⭐ 重要問題 (Important)", variable=self.qa_important_var).pack(side=tk.LEFT)
        row += 1
        
        # Question
        ttk.Label(self.qa_frame, text="問題 (Question):", font=('Arial', 11, 'bold')).grid(row=row, column=0, sticky=tk.W, pady=(0, 5))
        row += 1
        self.qa_question_text = scrolledtext.ScrolledText(self.qa_frame, height=5, wrap=tk.WORD, font=('Arial', 10))
        self.qa_question_text.grid(row=row, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        row += 1
        
        # Tags
        ttk.Label(self.qa_frame, text="標籤 (Tags) - 用逗號分隔:", font=('Arial', 11, 'bold')).grid(row=row, column=0, sticky=tk.W, pady=(0, 5))
        row += 1
        self.qa_tags_entry = ttk.Entry(self.qa_frame, font=('Arial', 10))
        self.qa_tags_entry.grid(row=row, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        row += 1
        
        # Answer
        ttk.Label(self.qa_frame, text="答案 (Answer) - 支援 Markdown:", font=('Arial', 11, 'bold')).grid(row=row, column=0, sticky=tk.W, pady=(0, 5))
        row += 1
        self.qa_answer_text = scrolledtext.ScrolledText(self.qa_frame, height=20, wrap=tk.WORD, font=('Arial', 10))
        self.qa_answer_text.grid(row=row, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        
        self.qa_frame.columnconfigure(0, weight=1)
        
    def on_file_selected(self, event=None):
        """文件選擇事件"""
        selected = self.file_combo.get()
        if not selected:
            return
            
        self.current_file = self.files[selected]
        self.is_glossary = "Glossary" in selected
        
        # 載入數據
        self.load_data()
        
        # 更新UI
        self.update_item_list()
        self.update_stats()
        self.edit_title.config(text=f"編輯: {selected}")
        
        # 顯示對應的編輯頁面
        if self.is_glossary:
            self.glossary_frame.pack(fill=tk.BOTH, expand=True)
            self.qa_frame.pack_forget()
        else:
            self.qa_frame.pack(fill=tk.BOTH, expand=True)
            self.glossary_frame.pack_forget()
            
        self.status_label.config(text=f"已載入: {selected} ({len(self.current_data)} 項)")
    
    def update_stats(self):
        """更新統計資訊"""
        if not self.current_data:
            self.stats_label.config(text="")
            return
        
        count = len(self.current_data)
        if self.is_glossary:
            # 統計分類
            categories = {}
            for item in self.current_data:
                for cat in item.get('category', []):
                    categories[cat] = categories.get(cat, 0) + 1
            stats_text = f"📊 總計: {count} 個術語"
        else:
            # 統計重要問題
            important_count = sum(1 for item in self.current_data if item.get('important', False))
            stats_text = f"📊 總計: {count} 個問答 (⭐{important_count}個重要)"
        
        self.stats_label.config(text=stats_text)
        
    def load_data(self):
        """載入文件數據"""
        try:
            self.status_label.config(text="正在載入文件...")
            self.root.update()  # 強制更新UI
            
            with open(self.current_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if self.is_glossary:
                self.current_data = self.parse_glossary(content)
            else:
                self.current_data = self.parse_qa(content)
            
            self.status_label.config(text=f"載入完成: {len(self.current_data)} 項")
                
        except Exception as e:
            messagebox.showerror("錯誤", f"載入文件失敗: {str(e)}")
            self.current_data = []
    
    def parse_glossary(self, content):
        """解析 glossary.ts - 使用更高效的逐項解析"""
        terms = []
        
        # 找到陣列開始位置
        start_marker = 'export const glossaryData: Term[] = ['
        start_idx = content.find(start_marker)
        if start_idx == -1:
            return terms
        
        # 從陣列開始到結束
        content = content[start_idx + len(start_marker):]
        end_idx = content.rfind('];')
        if end_idx != -1:
            content = content[:end_idx]
        
        # 逐個解析對象
        brace_count = 0
        current_obj = []
        in_string = False
        escape_next = False
        
        for i, char in enumerate(content):
            if escape_next:
                current_obj.append(char)
                escape_next = False
                continue
                
            if char == '\\':
                escape_next = True
                current_obj.append(char)
                continue
            
            if char == '"' and not in_string:
                in_string = True
            elif char == '"' and in_string:
                in_string = False
            
            if not in_string:
                if char == '{':
                    brace_count += 1
                    if brace_count == 1:
                        current_obj = [char]
                        continue
                elif char == '}':
                    brace_count -= 1
                    current_obj.append(char)
                    if brace_count == 0:
                        # 完整的對象
                        obj_str = ''.join(current_obj)
                        parsed = self.parse_single_glossary_item(obj_str)
                        if parsed:
                            terms.append(parsed)
                        current_obj = []
                    continue
            
            if brace_count > 0:
                current_obj.append(char)
        
        return terms
    
    def parse_single_glossary_item(self, obj_str):
        """解析單個 glossary 項目"""
        try:
            # 使用更強健的方法提取欄位
            def extract_field(field_name, content):
                # 尋找 field_name: "..."
                # 使用 [\s\S]*? 來匹配包含換行的內容
                pattern = f'{field_name}:\\s*"([\\s\\S]*?)"(?=\\s*,?\\s*(?:\\w+:|\\}))'
                match = re.search(pattern, content)
                if match:
                    return match.group(1).replace('\\"', '"').replace('\\n', '\n').strip()
                return ""

            term = extract_field("term", obj_str)
            if not term:
                # 備用正則
                term_match = re.search(r'term:\s*"([^"]+)"', obj_str)
                term = term_match.group(1) if term_match else ""

            if not term: return None

            # 提取 category
            category_match = re.search(r'category:\s*\[(.*?)\]', obj_str, re.DOTALL)
            categories = []
            if category_match:
                cat_str = category_match.group(1)
                categories = re.findall(r'"([^"]+)"', cat_str)
            
            definition = extract_field("definition", obj_str)
            analogy = extract_field("analogy", obj_str)

            # 如果 analogy 還是空的，嘗試抓取最後一個欄位
            if not analogy:
                analogy_match = re.search(r'analogy:\s*"([\s\S]*?)"\s*\}?\s*$', obj_str.strip())
                if analogy_match:
                    analogy = analogy_match.group(1).replace('\\"', '"').replace('\\n', '\n').strip()
                else:
                    # 極限備用
                    all_matches = re.findall(r'analogy:\s*"([\s\S]*?)"', obj_str)
                    if all_matches:
                        analogy = all_matches[-1].replace('\\"', '"').replace('\\n', '\n').strip()
            
            return {
                'term': term,
                'category': categories,
                'definition': definition.strip(),
                'analogy': analogy.strip()
            }
        except Exception as e:
            print(f"解析項目失敗: {e}")
            return None
    
    def parse_qa(self, content):
        """解析 QA 文件 - 使用更高效的逐項解析"""
        items = []
        
        # 找到 items 陣列
        items_marker = 'items: ['
        start_idx = content.find(items_marker)
        if start_idx == -1:
            return items
        
        content = content[start_idx + len(items_marker):]
        
        # 找到對應的結束位置（通常是 ],\n  },）
        # 使用括號計數來找到正確的結束位置
        brace_count = 0
        bracket_count = 1  # 已經進入一個 [
        end_idx = 0
        
        for i, char in enumerate(content):
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
            elif char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    end_idx = i
                    break
        
        if end_idx > 0:
            content = content[:end_idx]
        
        # 逐個解析 QA 項目
        brace_count = 0
        current_obj = []
        in_backtick = False
        in_string = False
        escape_next = False
        
        for i, char in enumerate(content):
            if escape_next:
                current_obj.append(char)
                escape_next = False
                continue
            
            if char == '\\':
                escape_next = True
                current_obj.append(char)
                continue
            
            # 處理 backtick string (answer 部分)
            if char == '`' and not in_string:
                in_backtick = not in_backtick
                current_obj.append(char)
                continue
            
            if char == '"' and not in_backtick:
                in_string = not in_string
            
            if not in_string and not in_backtick:
                if char == '{':
                    brace_count += 1
                    if brace_count == 1:
                        current_obj = [char]
                        continue
                elif char == '}':
                    current_obj.append(char)
                    brace_count -= 1
                    if brace_count == 0:
                        obj_str = ''.join(current_obj)
                        parsed = self.parse_single_qa_item(obj_str)
                        if parsed:
                            items.append(parsed)
                        current_obj = []
                    continue
            
            if brace_count > 0:
                current_obj.append(char)
        
        return items
    
    def parse_single_qa_item(self, obj_str):
        """解析單個 QA 項目"""
        try:
            # 提取 id
            id_match = re.search(r'id:\s*"([^"]+)"', obj_str)
            if not id_match:
                return None
            qa_id = id_match.group(1)
            
            # 提取 question
            question_match = re.search(r'question:\s*"(.*?)"', obj_str, re.DOTALL)
            question = ""
            if question_match:
                question = question_match.group(1).replace('\\"', '"').strip()
            
            # 提取 important
            important = 'important: true' in obj_str
            
            # 提取 tags
            tags_match = re.search(r'tags:\s*\[(.*?)\]', obj_str, re.DOTALL)
            tags = []
            if tags_match:
                tags_str = tags_match.group(1)
                tags = re.findall(r'"([^"]+)"', tags_str)
            
            # 提取 answer (backtick string)
            answer_match = re.search(r'answer:\s*`(.*?)`', obj_str, re.DOTALL)
            answer = ""
            if answer_match:
                answer = answer_match.group(1).strip()
            
            return {
                'id': qa_id,
                'question': question,
                'important': important,
                'tags': tags,
                'answer': answer
            }
        except Exception as e:
            print(f"解析 QA 項目失敗: {e}")
            return None
    
    def update_item_list(self, filtered_data=None):
        """更新項目列表"""
        self.item_listbox.delete(0, tk.END)
        
        data = filtered_data if filtered_data is not None else self.current_data
        
        for item in data:
            if self.is_glossary:
                display = f"{item['term']}"
            else:
                display = f"[{item['id']}] {item['question'][:50]}..."
                
            self.item_listbox.insert(tk.END, display)
    
    def filter_list(self, *args):
        """過濾列表"""
        search_term = self.search_var.get().lower()
        if not search_term:
            self.update_item_list()
            return
        
        filtered = []
        for item in self.current_data:
            if self.is_glossary:
                if search_term in item['term'].lower() or search_term in item['definition'].lower():
                    filtered.append(item)
            else:
                if search_term in item['question'].lower() or search_term in item['answer'].lower():
                    filtered.append(item)
        
        self.update_item_list(filtered)
    
    def on_item_selected(self, event=None):
        """項目選擇事件"""
        selection = self.item_listbox.curselection()
        if not selection:
            return
        
        index = selection[0]
        # 如果有過濾，需要找到原始索引
        search_term = self.search_var.get().lower()
        if search_term:
            filtered = []
            for i, item in enumerate(self.current_data):
                if self.is_glossary:
                    if search_term in item['term'].lower() or search_term in item['definition'].lower():
                        filtered.append((i, item))
                else:
                    if search_term in item['question'].lower() or search_term in item['answer'].lower():
                        filtered.append((i, item))
            if index < len(filtered):
                index, item = filtered[index]
            else:
                return
        else:
            item = self.current_data[index]
        
        # 載入到編輯區
        self.load_item_to_editor(item)
    
    def load_item_to_editor(self, item):
        """載入項目到編輯器"""
        if self.is_glossary:
            self.term_entry.delete(0, tk.END)
            self.term_entry.insert(0, item['term'])
            
            # 清空並設置categories
            for var in self.category_vars.values():
                var.set(False)
            for cat in item['category']:
                if cat in self.category_vars:
                    self.category_vars[cat].set(True)
            
            self.definition_text.delete('1.0', tk.END)
            self.definition_text.insert('1.0', item['definition'])
            
            self.analogy_text.delete('1.0', tk.END)
            self.analogy_text.insert('1.0', item['analogy'])
        else:
            self.qa_id_entry.delete(0, tk.END)
            self.qa_id_entry.insert(0, item['id'])
            
            self.qa_important_var.set(item['important'])
            
            self.qa_question_text.delete('1.0', tk.END)
            self.qa_question_text.insert('1.0', item['question'])
            
            self.qa_tags_entry.delete(0, tk.END)
            self.qa_tags_entry.insert(0, ', '.join(item['tags']))
            
            self.qa_answer_text.delete('1.0', tk.END)
            self.qa_answer_text.insert('1.0', item['answer'])
    
    def add_item(self):
        """新增項目"""
        if not self.current_file:
            messagebox.showwarning("警告", "請先選擇文件")
            return
        
        # 清空編輯器
        if self.is_glossary:
            self.term_entry.delete(0, tk.END)
            for var in self.category_vars.values():
                var.set(False)
            self.definition_text.delete('1.0', tk.END)
            self.analogy_text.delete('1.0', tk.END)
        else:
            self.qa_id_entry.delete(0, tk.END)
            self.qa_important_var.set(False)
            self.qa_question_text.delete('1.0', tk.END)
            self.qa_tags_entry.delete(0, tk.END)
            self.qa_answer_text.delete('1.0', tk.END)
        
        # 清除選擇
        self.item_listbox.selection_clear(0, tk.END)
        
        # 聚焦到第一個輸入框
        if self.is_glossary:
            self.term_entry.focus()
        else:
            self.qa_id_entry.focus()
        
        self.status_label.config(text="✨ 新增模式：填寫完成後點擊「儲存變更」")
    
    def edit_item(self):
        """編輯項目"""
        selection = self.item_listbox.curselection()
        if not selection:
            messagebox.showwarning("警告", "請先選擇要編輯的項目")
            return
        
        self.status_label.config(text="✏️ 編輯模式：修改完成後點擊「儲存變更」")
    
    def delete_item(self ):
        """刪除項目 - 加強確認"""
        selection = self.item_listbox.curselection()
        if not selection:
            messagebox.showwarning("警告", "請先選擇要刪除的項目")
            return
        
        index = selection[0]
        # 處理過濾情況
        actual_index, item = self._get_actual_item(index)
        
        if self.is_glossary:
            item_desc = f"術語「{item['term']}」"
        else:
            item_desc = f"問答 [{item['id']}]"
        
        # 雙重確認對話框
        confirm_msg = f"⚠️ 確定要刪除 {item_desc} 嗎？\n\n這個操作無法復原！"
        
        if messagebox.askyesno("確認刪除", confirm_msg, icon='warning'):
            # 第二次確認（防止誤操作）
            if messagebox.askyesno("最後確認", "真的要刪除嗎？此操作不可復原！", icon='warning'):
                self.current_data.pop(actual_index)
                self.update_item_list()
                self.update_stats()
                self.status_label.config(text=f"🗑️ 已刪除 {item_desc}（尚未儲存）")
    
    def move_up(self):
        """上移項目"""
        selection = self.item_listbox.curselection()
        if not selection:
            messagebox.showwarning("警告", "請先選擇要移動的項目")
            return
        
        index = selection[0]
        actual_index, item = self._get_actual_item(index)
        
        if actual_index == 0:
            messagebox.showinfo("提示", "已經是第一項，無法上移")
            return
        
        # 交換位置
        self.current_data[actual_index], self.current_data[actual_index - 1] = \
            self.current_data[actual_index - 1], self.current_data[actual_index]
        
        # 更新列表並保持選擇
        self.update_item_list()
        new_index = max(0, index - 1)
        self.item_listbox.selection_set(new_index)
        self.item_listbox.see(new_index)
        
        self.status_label.config(text="⬆️ 已上移（尚未儲存）")
    
    def move_down(self):
        """下移項目"""
        selection = self.item_listbox.curselection()
        if not selection:
            messagebox.showwarning("警告", "請先選擇要移動的項目")
            return
        
        index = selection[0]
        actual_index, item = self._get_actual_item(index)
        
        if actual_index >= len(self.current_data) - 1:
            messagebox.showinfo("提示", "已經是最後一項，無法下移")
            return
        
        # 交換位置
        self.current_data[actual_index], self.current_data[actual_index + 1] = \
            self.current_data[actual_index + 1], self.current_data[actual_index]
        
        # 更新列表並保持選擇
        self.update_item_list()
        new_index = min(len(self.current_data) - 1, index + 1)
        self.item_listbox.selection_set(new_index)
        self.item_listbox.see(new_index)
        
        self.status_label.config(text="⬇️ 已下移（尚未儲存）")
    
    def duplicate_item(self):
        """複製項目"""
        selection = self.item_listbox.curselection()
        if not selection:
            messagebox.showwarning("警告", "請先選擇要複製的項目")
            return
        
        index = selection[0]
        actual_index, item = self._get_actual_item(index)
        
        # 深拷貝項目
        import copy
        new_item = copy.deepcopy(item)
        
        # 修改ID/名稱以示區別
        if self.is_glossary:
            new_item['term'] = new_item['term'] + " (副本)"
        else:
            # 為QA生成新ID
            base_id = new_item['id']
            # 移除末尾的數字
            import re
            match = re.match(r'(.+?)-(\d+)$', base_id)
            if match:
                prefix = match.group(1)
                num = int(match.group(2))
                new_item['id'] = f"{prefix}-{num + 1}"
            else:
                new_item['id'] = base_id + "-copy"
        
        # 插入到原項目後面
        self.current_data.insert(actual_index + 1, new_item)
        
        # 更新列表並選擇新項目
        self.update_item_list()
        self.update_stats()
        self.item_listbox.selection_clear(0, tk.END)
        new_display_index = index + 1
        self.item_listbox.selection_set(new_display_index)
        self.item_listbox.see(new_display_index)
        self.on_item_selected()
        
        self.status_label.config(text="📋 已複製（尚未儲存，請修改內容）")
    
    def _get_actual_item(self, display_index):
        """獲取實際的項目（考慮過濾）"""
        search_term = self.search_var.get().lower()
        if search_term:
            filtered = []
            for i, item in enumerate(self.current_data):
                if self.is_glossary:
                    if search_term in item['term'].lower() or search_term in item['definition'].lower():
                        filtered.append((i, item))
                else:
                    if search_term in item['question'].lower() or search_term in item['answer'].lower():
                        filtered.append((i, item))
            if display_index < len(filtered):
                return filtered[display_index]
        
        return display_index, self.current_data[display_index]
    
    def save_changes(self):
        """儲存變更"""
        if not self.current_file:
            messagebox.showwarning("警告", "請先選擇文件")
            return
        
        # 從編輯器獲取當前數據
        current_item = self.get_current_editor_data()
        if not current_item:
            # 如果編輯器是空的，可能只是要儲存列表的順序變化
            if not messagebox.askyesno("確認", "編輯器內容為空。\n是否只儲存列表的順序變化？"):
                return
        else:
            # 檢查是新增還是修改
            selection = self.item_listbox.curselection()
            if selection:
                # 修改現有項目
                index = selection[0]
                actual_index, _ = self._get_actual_item(index)
                self.current_data[actual_index] = current_item
                action = "更新"
            else:
                # 新增項目
                self.current_data.append(current_item)
                action = "新增"
        
        # 寫入文件
        self.write_file()
        
        # 如果是glossary，執行排序
        if self.is_glossary:
            self.sort_glossary()
        
        # 更新列表和統計
        self.update_item_list()
        self.update_stats()
        
        # 清除選擇
        self.item_listbox.selection_clear(0, tk.END)
        
        self.status_label.config(text="✅ 儲存成功！")
        messagebox.showinfo("成功", "內容已成功儲存！")
        
    def get_current_editor_data(self):
        """從編輯器獲取數據"""
        if self.is_glossary:
            term = self.term_entry.get().strip()
            if not term:
                messagebox.showwarning("警告", "術語名稱不能為空")
                return None
            
            categories = [cat for cat, var in self.category_vars.items() if var.get()]
            if not categories:
                messagebox.showwarning("警告", "請至少選擇一個分類")
                return None
            
            definition = self.definition_text.get('1.0', tk.END).strip()
            analogy = self.analogy_text.get('1.0', tk.END).strip()
            
            if not definition or not analogy:
                messagebox.showwarning("警告", "定義和白話解釋不能為空")
                return None
            
            return {
                'term': term,
                'category': categories,
                'definition': definition,
                'analogy': analogy
            }
        else:
            qa_id = self.qa_id_entry.get().strip()
            if not qa_id:
                messagebox.showwarning("警告", "ID 不能為空")
                return None
            
            question = self.qa_question_text.get('1.0', tk.END).strip()
            answer = self.qa_answer_text.get('1.0', tk.END).strip()
            
            if not question or not answer:
                messagebox.showwarning("警告", "問題和答案不能為空")
                return None
            
            tags_str = self.qa_tags_entry.get().strip()
            tags = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
            
            return {
                'id': qa_id,
                'question': question,
                'important': self.qa_important_var.get(),
                'tags': tags,
                'answer': answer
            }
    
    def write_file(self):
        """寫入文件"""
        try:
            self.status_label.config(text="正在儲存...")
            self.root.update()
            
            # 備份原文件
            backup_path = str(self.current_file) + f".backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            with open(self.current_file, 'r', encoding='utf-8') as f:
                backup_content = f.read()
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(backup_content)
            
            # 讀取原文件獲取頭部
            with open(self.current_file, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            if self.is_glossary:
                content = self.generate_glossary_content(original_content)
            else:
                content = self.generate_qa_content(original_content)
            
            # 寫入文件
            with open(self.current_file, 'w', encoding='utf-8') as f:
                f.write(content)
                
        except Exception as e:
            messagebox.showerror("錯誤", f"儲存失敗: {str(e)}")
    
    def generate_glossary_content(self, original_content):
        """生成 glossary 文件內容"""
        # 提取頭部（到 export const glossaryData: Term[] = [）
        header_match = re.search(r'^([\s\S]*?export const glossaryData: Term\[\] = \[)', original_content)
        header = header_match.group(1) if header_match else ''
        footer = '\n];\n'
        
        # 生成術語內容
        items_content = []
        for item in self.current_data:
            categories_str = ', '.join([f'"{cat}"' for cat in item['category']])
            
            # 轉義特殊字符
            definition = item['definition'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
            analogy = item['analogy'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
            
            term_str = f'''  {{
    term: "{item['term']}",

    category: [{categories_str}],

    definition:
      "{definition}",

    analogy:
      "{analogy}",
  }}'''
            items_content.append(term_str)
        
        return header + '\n' + ',\n\n'.join(items_content) + footer
    
    def generate_qa_content(self, original_content):
        """生成 QA 文件內容"""
        # 提取頭部和標題
        header_match = re.search(r'^([\s\S]*?items: \[)', original_content)
        header = header_match.group(1) if header_match else ''
        footer = '\n    ],\n  },\n];\n'
        
        # 生成QA內容
        items_content = []
        for item in self.current_data:
            important_str = '\n        important: true,' if item['important'] else ''
            tags_str = ', '.join([f'"{tag}"' for tag in item['tags']])
            
            # 轉義 question 中的引號
            question = item['question'].replace('"', '\\"')
            
            # answer 使用 backtick，不需要轉義引號
            answer = item['answer']
            
            qa_str = f'''      {{
        id: "{item['id']}",
        question:
          "{question}",{important_str}
        tags: [{tags_str}],
        answer: `
{answer}
    `,
      }}'''
            items_content.append(qa_str)
        
        return header + '\n' + ',\n'.join(items_content) + footer
    
    def sort_glossary(self):
        """執行glossary排序腳本"""
        try:
            script_path = self.project_root / "scripts" / "sort_glossary.js"
            
            # 嘗試找到 node 的路徑
            node_cmd = 'node'
            # 檢查常見路徑 (macOS)
            common_paths = ['/usr/local/bin/node', '/opt/homebrew/bin/node', '/usr/bin/node']
            for p in common_paths:
                if os.path.exists(p):
                    node_cmd = p
                    break
            
            result = subprocess.run(
                [node_cmd, str(script_path)],
                cwd=str(self.project_root),
                capture_output=True,
                text=True
            )
            if result.returncode == 0:
                # 重新載入排序後的數據
                self.load_data()
                self.update_item_list()
                self.status_label.config(text="✅ 已儲存並自動排序!")
            else:
                error_msg = result.stderr or "未知錯誤"
                messagebox.showwarning("排序失敗", f"排序腳本執行失敗。\n錯誤內容: {error_msg}\n\n這通常是因為環境中找不到 'node'。")
        except FileNotFoundError:
            messagebox.showerror("找不到 Node.js", "系統找不到 'node' 指令。\n請確保已安裝 Node.js 且已加入 PATH 中。")
        except Exception as e:
            messagebox.showwarning("警告", f"無法執行排序: {str(e)}")

    def show_help(self):
        """顯示說明視窗"""
        help_window = tk.Toplevel(self.root)
        help_window.title("使用說明")
        help_window.geometry("800x600")
        
        # 使用 ScrolledText 顯示說明
        text_area = scrolledtext.ScrolledText(help_window, wrap=tk.WORD, font=('Arial', 11), padding=10)
        text_area.pack(fill=tk.BOTH, expand=True)
        
        # 插入說明內容
        text_area.insert(tk.END, HELP_TEXT)
        text_area.config(state=tk.DISABLED) # 唯讀
        
        # 添加關閉按鈕
        ttk.Button(help_window, text="我知道了", command=help_window.destroy).pack(pady=10)
    
    def resort_data(self):
        """重新排列數據順序"""
        if not self.current_file:
            messagebox.showwarning("警告", "請先選擇文件")
            return
            
        if self.is_glossary:
            if messagebox.askyesno("順序排列", "將執行術語表自動排序（按字母順序）。是否繼續？"):
                self.sort_glossary()
        else:
            # 建立一個簡單的選擇視窗
            sort_window = tk.Toplevel(self.root)
            sort_window.title("選擇排序方式")
            sort_window.geometry("300x180")
            sort_window.resizable(False, False)
            sort_window.transient(self.root) # 讓它在主視窗上方
            sort_window.grab_set() # 模態視窗
            
            ttk.Label(sort_window, text="請選擇 QA 排序方式：", font=('Arial', 10, 'bold')).pack(pady=15)
            
            def sort_by_question():
                try:
                    # 先過濾掉空的問題
                    self.current_data.sort(key=lambda x: x['question'].strip())
                    self.update_item_list()
                    self.status_label.config(text="✅ 已按問題標題排列（尚未儲存）")
                    sort_window.destroy()
                except Exception as e:
                    messagebox.showerror("錯誤", f"排序失敗: {str(e)}")

            def sort_by_id():
                try:
                    def natural_sort_key(item):
                        # 處理自然排序：拆分文字與數字部分
                        # 例如 "edu-1" -> ("edu-", 1), "edu-10" -> ("edu-", 10)
                        import re
                        match = re.match(r'([a-zA-Z-]+?)(\d+)$', item['id'])
                        if match:
                            return (match.group(1), int(match.group(2)))
                        return (item['id'], 0)
                    
                    self.current_data.sort(key=natural_sort_key)
                    self.update_item_list()
                    self.status_label.config(text="✅ 已按 ID 自然順序排列（尚未儲存）")
                    sort_window.destroy()
                except Exception as e:
                    messagebox.showerror("錯誤", f"排序失敗: {str(e)}")

            ttk.Button(sort_window, text="🔤 按問題標題排序", width=25, command=sort_by_question).pack(pady=5)
            ttk.Button(sort_window, text="🔢 按 ID 編號自然排序", width=25, command=sort_by_id).pack(pady=5)
            ttk.Button(sort_window, text="取消", width=25, command=sort_window.destroy).pack(pady=10)

def main():
    root = tk.Tk()
    app = ContentManager(root)
    root.mainloop()

if __name__ == '__main__':
    main()
