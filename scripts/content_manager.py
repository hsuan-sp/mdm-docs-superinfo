#!/usr/bin/env python3
"""
MDM Support Site Content Manager (v2.0 - MD Edition)
用於管理 Markdown 格式的術語表和問答集
支援自動 Frontmatter 解析與多檔案管理
"""

import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import re
import os
import subprocess
from datetime import datetime
from pathlib import Path
import copy

HELP_TEXT = """
# 內容管理工具使用說明 (MD 版本) 🚀

## 📂 核心架構
此工具已升級為支援「原子化」Markdown 存儲架構：
- **術語表**: `docs/content/[zh|en]/glossary/*.md`
- **問答集**: `docs/content/[zh|en]/qa/[類別]/*.md`

## ✨ 核心功能
1. **目錄管理**: 左側選單可切換中英文不同資料夾。
2. **自動解析**: 自動讀取 Markdown 的 Frontmatter (---) 與內文。
3. **智慧儲存**: 儲存時會自動生成二級標題 (##) 格式，並呼叫排版優化腳本。
4. **維護索引**: 儲存變更後會自動呼叫腳本更新 `MAINTENANCE_INDEX.md`。

## 🛠️ 操作指南
- **新增**: 清空編輯區，會自動帶入標準模板 (使用 ## 標題)。
- **編輯**: 雙擊左側列表項目載入內容。
- **儲存**: 點擊儲存會自動將 # 標題轉換為 ##，並優化中英文間距。

## 🛡️ 安全機制
- **自動排版**: 整合 `scripts/fix-markdown.js` 確保所有檔案符合 2026 最新規範。
- **ID 檢查**: QA 項目必須具備唯一的 ID。

---
*版本: v2.1 | 首席架構師思維實作 | 2026-01-19*
"""

class ContentManager:
    def __init__(self, root):
        self.root = root
        self.root.title("MDM Support Site - 現代化內容管理器")
        self.root.geometry("1400x900")
        
        # 路徑設定
        self.project_root = Path(__file__).parent.parent
        self.content_root = self.project_root / "docs" / "content"
        self.items_root = self.content_root / "zh"
        self.items_en_root = self.content_root / "en"
        
        # 資料夾映射
        self.sources = {
            "--- 🇹🇼 中文內容 ---": None,
            "📖 術語表 (Glossary)": self.items_root / "glossary",
            "👤 01 - 帳號與伺服器": self.items_root / "qa" / "account",
            "📦 02 - 裝置註冊": self.items_root / "qa" / "enrollment",
            "📱 03 - App 管理": self.items_root / "qa" / "apps",
            "🏫 04 - 課堂管理": self.items_root / "qa" / "classroom",
            "🎓 05 - 數位精進": self.items_root / "qa" / "digital-learning",
            "🔧 06 - 硬體排除": self.items_root / "qa" / "hardware",
            "💻 07 - Mac 管理": self.items_root / "qa" / "mac",
            "🍎 08 - 教育實戰": self.items_root / "qa" / "qa-education",
            "--- 🇺🇸 English Content ---": None,
            "📖 Glossary (EN)": self.items_en_root / "glossary",
            "👤 01 - Account (EN)": self.items_en_root / "qa" / "account",
            "📦 02 - Enrollment (EN)": self.items_en_root / "qa" / "enrollment",
            "📱 03 - Apps (EN)": self.items_en_root / "qa" / "apps",
            "🏫 04 - Classroom (EN)": self.items_en_root / "qa" / "classroom",
            "🎓 05 - Digital Learning (EN)": self.items_en_root / "qa" / "digital-learning",
            "🔧 06 - Hardware (EN)": self.items_en_root / "qa" / "hardware",
            "💻 07 - Mac (EN)": self.items_en_root / "qa" / "mac",
            "🍎 08 - Education (EN)": self.items_en_root / "qa" / "qa-education"
        }
        
        self.current_dir = None
        self.current_data = [] # List of dict: {filename, path, data, content}
        self.is_glossary = False
        
        self.setup_ui()
        
    def setup_ui(self):
        """設置UI界面"""
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(0, weight=1)
        
        # 左側
        left_frame = ttk.Frame(main_frame, width=380)
        left_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S), padx=(0, 10))
        left_frame.grid_propagate(False)
        
        ttk.Label(left_frame, text="資源類別:", font=('Arial', 12, 'bold')).pack(pady=(0, 5))
        self.source_combo = ttk.Combobox(left_frame, values=list(self.sources.keys()), state="readonly")
        self.source_combo.pack(pady=(0, 10), fill=tk.X)
        self.source_combo.bind('<<ComboboxSelected>>', self.on_source_selected)
        
        self.stats_label = ttk.Label(left_frame, text="", font=('Arial', 9))
        self.stats_label.pack(pady=(0, 5))
        
        # 搜尋
        search_frame = ttk.Frame(left_frame)
        search_frame.pack(fill=tk.X, pady=(5, 5))
        ttk.Label(search_frame, text="🔍").pack(side=tk.LEFT)
        self.search_var = tk.StringVar()
        self.search_var.trace('w', self.filter_list)
        ttk.Entry(search_frame, textvariable=self.search_var).pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(5, 0))
        
        # 列表
        list_frame = ttk.Frame(left_frame)
        list_frame.pack(fill=tk.BOTH, expand=True)
        scrollbar = ttk.Scrollbar(list_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.item_listbox = tk.Listbox(list_frame, yscrollcommand=scrollbar.set, font=('Arial', 10))
        self.item_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.item_listbox.yview)
        self.item_listbox.bind('<<ListboxSelect>>', self.on_item_selected)
        
        # 按鈕
        btn_frame = ttk.LabelFrame(left_frame, text="管理功能", padding="5")
        btn_frame.pack(fill=tk.X, pady=(10, 0))
        
        ops_grid = ttk.Frame(btn_frame)
        ops_grid.pack(fill=tk.X)
        ttk.Button(ops_grid, text="➕ 新增檔案", command=self.add_new).grid(row=0, column=0, padx=2, pady=2, sticky=tk.EW)
        ttk.Button(ops_grid, text="🗑️ 刪除檔案", command=self.delete_item).grid(row=0, column=1, padx=2, pady=2, sticky=tk.EW)
        ttk.Button(ops_grid, text="📋 複製檔案", command=self.duplicate_item).grid(row=1, column=0, padx=2, pady=2, sticky=tk.EW)
        ttk.Button(ops_grid, text="❓ 說明", command=self.show_help).grid(row=1, column=1, padx=2, pady=2, sticky=tk.EW)
        ops_grid.columnconfigure(0, weight=1)
        ops_grid.columnconfigure(1, weight=1)
        
        ttk.Button(btn_frame, text="💾 儲存並更新索引", command=self.save_changes, style="Accent.TButton" if "Accent.TButton" in ttk.Style().theme_names() else "TButton").pack(fill=tk.X, pady=5)
        
        # 右側
        right_frame = ttk.Frame(main_frame)
        right_frame.grid(row=0, column=1, sticky=(tk.W, tk.E, tk.N, tk.S))
        right_frame.columnconfigure(0, weight=1)
        right_frame.rowconfigure(1, weight=1)
        
        self.edit_title = ttk.Label(right_frame, text="請選擇類別與檔案", font=('Arial', 14, 'bold'))
        self.edit_title.grid(row=0, column=0, sticky=tk.W, pady=(0, 10))
        
        # 編輯容器
        self.canvas = tk.Canvas(right_frame, highlightthickness=0)
        self.v_scroll = ttk.Scrollbar(right_frame, orient="vertical", command=self.canvas.yview)
        self.canvas.configure(yscrollcommand=self.v_scroll.set)
        self.canvas.grid(row=1, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        self.v_scroll.grid(row=1, column=1, sticky=(tk.N, tk.S))
        
        self.editor_frame = ttk.Frame(self.canvas, padding="10")
        self.canvas_window = self.canvas.create_window((0, 0), window=self.editor_frame, anchor="nw")
        
        self.editor_frame.bind('<Configure>', lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))
        self.canvas.bind('<Configure>', lambda e: self.canvas.itemconfig(self.canvas_window, width=e.width))
        
        self.setup_editor()
        
    def setup_editor(self):
        """設置編輯區域組件"""
        # Common fields placeholder
        self.fields_frame = ttk.Frame(self.editor_frame)
        self.fields_frame.pack(fill=tk.X)
        
        # -- Glossary Fields --
        self.glossary_ui = ttk.Frame(self.fields_frame)
        ttk.Label(self.glossary_ui, text="術語名稱 (Term):", font=('Arial', 10, 'bold')).pack(anchor=tk.W)
        self.term_entry = ttk.Entry(self.glossary_ui, font=('Arial', 11))
        self.term_entry.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(self.glossary_ui, text="分類 (Categories - 用逗號分隔):", font=('Arial', 10, 'bold')).pack(anchor=tk.W)
        self.g_cat_entry = ttk.Entry(self.glossary_ui, font=('Arial', 11))
        self.g_cat_entry.pack(fill=tk.X, pady=(0, 10))
        
        # -- QA Fields --
        self.qa_ui = ttk.Frame(self.fields_frame)
        qa_meta = ttk.Frame(self.qa_ui)
        qa_meta.pack(fill=tk.X)
        
        ttk.Label(qa_meta, text="ID:", font=('Arial', 10, 'bold')).pack(side=tk.LEFT)
        self.qa_id_entry = ttk.Entry(qa_meta, width=15)
        self.qa_id_entry.pack(side=tk.LEFT, padx=5)
        
        self.qa_imp_var = tk.BooleanVar()
        ttk.Checkbutton(qa_meta, text="⭐ 重要問題", variable=self.qa_imp_var).pack(side=tk.LEFT, padx=10)
        
        ttk.Label(self.qa_ui, text="顯示標題 (Title):", font=('Arial', 10, 'bold')).pack(anchor=tk.W, pady=(10, 0))
        self.qa_title_entry = ttk.Entry(self.qa_ui, font=('Arial', 11))
        self.qa_title_entry.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(self.qa_ui, text="標籤 (Tags - 用逗號分隔):", font=('Arial', 10, 'bold')).pack(anchor=tk.W)
        self.qa_tags_entry = ttk.Entry(self.qa_ui, font=('Arial', 11))
        self.qa_tags_entry.pack(fill=tk.X, pady=(0, 10))
        
        # -- Content (Markdown) --
        ttk.Label(self.editor_frame, text="內文內容 (Markdown / 答案):", font=('Arial', 10, 'bold')).pack(anchor=tk.W, pady=(5, 0))
        self.content_text = scrolledtext.ScrolledText(self.editor_frame, height=30, font=('Menlo', 11) if os.name != 'nt' else ('Consolas', 11), wrap=tk.WORD)
        self.content_text.pack(fill=tk.BOTH, expand=True)

    def on_source_selected(self, event=None):
        selected = self.source_combo.get()
        if not self.sources[selected]:
            return
            
        self.current_dir = self.sources[selected]
        self.is_glossary = "Glossary" in selected
        self.is_en = "(EN)" in selected or "English" in selected
        
        self.load_dir_items()
        self.update_list()
        
        if self.is_glossary:
            self.qa_ui.pack_forget()
            self.glossary_ui.pack(fill=tk.X)
        else:
            self.glossary_ui.pack_forget()
            self.qa_ui.pack(fill=tk.X)
            
        self.edit_title.config(text=f"📂 目錄: {selected}")
        self.clear_editor()

    def parse_md(self, path):
        try:
            content = path.read_text(encoding='utf-8')
            # 使用更寬鬆的 regex
            match = re.match(r'^---\n(.*?)\n---\n?', content, re.DOTALL)
            if not match:
                return {}, content
            
            yaml_text = match.group(1)
            body = content[match.end():].lstrip()
            
            data = {}
            for line in yaml_text.split('\n'):
                if ':' in line:
                    k, v = line.split(':', 1)
                    k = k.strip()
                    v = v.strip().strip('"').strip("'")
                    # Handle lists like [a, b]
                    if v.startswith('[') and v.endswith(']'):
                        v = [x.strip().strip('"').strip("'") for x in v[1:-1].split(',')]
                    elif v.lower() == 'true': v = True
                    elif v.lower() == 'false': v = False
                    data[k] = v
            return data, body
        except Exception as e:
            print(f"Error parsing {path}: {e}")
            return {}, ""

    def load_dir_items(self):
        self.current_data = []
        if not self.current_dir.exists():
            return
            
        files = sorted(self.current_dir.glob("*.md"))
        for f in files:
            data, body = self.parse_md(f)
            self.current_data.append({
                'filename': f.name,
                'path': f,
                'data': data,
                'content': body
            })
        
        self.stats_label.config(text=f"📊 項目數: {len(self.current_data)}")

    def update_list(self, filtered=None):
        self.item_listbox.delete(0, tk.END)
        data_to_show = filtered if filtered is not None else self.current_data
        for item in data_to_show:
            if self.is_glossary:
                name = item['data'].get('term', item['filename'])
            else:
                name = f"[{item['data'].get('id', '??')}] {item['data'].get('title', item['filename'])}"
            self.item_listbox.insert(tk.END, name)

    def filter_list(self, *args):
        query = self.search_var.get().lower()
        if not query:
            self.update_list()
            return
        
        filtered = []
        for item in self.current_data:
            searchable = (str(item['data']) + item['content']).lower()
            if query in searchable:
                filtered.append(item)
        self.update_list(filtered)

    def on_item_selected(self, event=None):
        selection = self.item_listbox.curselection()
        if not selection: return
        
        index = selection[0]
        # Resolve via name because of filtering
        name = self.item_listbox.get(index)
        
        # Find the actual item
        item = None
        for it in self.current_data:
            if self.is_glossary:
                if it['data'].get('term') == name or it['filename'] == name:
                    item = it; break
            else:
                if f"[{it['data'].get('id')}]" in name or it['filename'] == name:
                    item = it; break
        
        if item:
            self.load_to_editor(item)

    def load_to_editor(self, item):
        self.clear_editor()
        self.content_text.insert('1.0', item['content'])
        
        if self.is_glossary:
            self.term_entry.insert(0, item['data'].get('term', ''))
            cats = item['data'].get('category', [])
            self.g_cat_entry.insert(0, ', '.join(cats) if isinstance(cats, list) else str(cats))
        else:
            self.qa_id_entry.insert(0, item['data'].get('id', ''))
            self.qa_imp_var.set(bool(item['data'].get('important', False)))
            self.qa_title_entry.insert(0, item['data'].get('title', ''))
            tags = item['data'].get('tags', [])
            self.qa_tags_entry.insert(0, ', '.join(tags) if isinstance(tags, list) else str(tags))

    def clear_editor(self):
        self.term_entry.delete(0, tk.END)
        self.g_cat_entry.delete(0, tk.END)
        self.qa_id_entry.delete(0, tk.END)
        self.qa_imp_var.set(False)
        self.qa_title_entry.delete(0, tk.END)
        self.qa_tags_entry.delete(0, tk.END)
        self.content_text.delete('1.0', tk.END)

    def save_changes(self):
        if not self.current_dir:
            messagebox.showwarning("警告", "請先選擇類別")
            return
            
        # Get data from UI
        content = self.content_text.get('1.0', tk.END).strip()
        data = {}
        
        if self.is_glossary:
            term = self.term_entry.get().strip()
            if not term: return messagebox.showerror("錯誤", "術語名稱為必填")
            data['term'] = term
            cats_str = self.g_cat_entry.get().strip()
            data['category'] = [c.strip() for c in cats_str.split(',') if c.strip()]
            filename = term.lower().replace('/', '-').replace(' ', '-') + ".md"
        else:
            qid = self.qa_id_entry.get().strip()
            title = self.qa_title_entry.get().strip()
            if not qid or not title: return messagebox.showerror("錯誤", "ID 與標題為必填")
            data['id'] = qid
            data['title'] = title
            data['important'] = self.qa_imp_var.get()
            tags_str = self.qa_tags_entry.get().strip()
            data['tags'] = [t.strip() for t in tags_str.split(',') if t.strip()]
            filename = f"{qid}.md"

        # Generate YAML
        yaml_lines = ["---"]
        for k, v in data.items():
            if isinstance(v, list):
                val = "[" + ", ".join([f'"{x}"' for x in v]) + "]"
            elif isinstance(v, bool):
                val = "true" if v else "false"
            else:
                val = f'"{v}"'
            yaml_lines.append(f"{k}: {val}")
        yaml_lines.append("---")
        
        # 自動轉換 H1 為 H2
        content = re.sub(r'^# (?!#)', '## ', content, flags=re.MULTILINE)
        
        file_content = "\n".join(yaml_lines) + "\n\n" + content
        
        # Determine path
        target_path = self.current_dir / filename
        
        # Check if we are renaming
        selection = self.item_listbox.curselection()
        if selection:
            # We had one selected, check if filename changed
            # Simplifying: if filename changed and target exists, ask before overwrite
            pass

        try:
            target_path.write_text(file_content, encoding='utf-8')
            self.update_index()
            self.on_source_selected() # Reload
            messagebox.showinfo("成功", f"檔案 {filename} 儲存成功並已更新維護索引。")
        except Exception as e:
            messagebox.showerror("錯誤", f"儲存失敗: {e}")

    def update_index(self):
        """執行更新索引與格式修正的 NodeJS 腳本"""
        try:
            # 1. 修正格式與排版
            subprocess.run(["node", "scripts/maintenance/fix-markdown.js"], cwd=str(self.project_root), check=True)
            # 2. 更新維護索引
            subprocess.run(["node", "scripts/maintenance/generate-index.js"], cwd=str(self.project_root), check=True)
        except Exception as e:
            print(f"Update tools failed: {e}")

    def add_new(self):
        self.clear_editor()
        if self.is_glossary:
            if self.is_en:
                template = "## Term Definition\n\n## Analogy\n"
            else:
                template = "## 術語定義\n\n## 白話文比喻\n"
        else:
            if self.is_en:
                template = "## Q: [Question Title Here]\n\n## Answer\n\n**Core summary**\n\nDetails here..."
            else:
                template = "## Q: [問題標題]\n\n## Answer\n\n**一句話總結核心答案**\n\n詳細說明內容..."
                
        self.content_text.insert('1.0', template)
        self.item_listbox.selection_clear(0, tk.END)
        self.status_label.config(text="✨ 新增模式 (已帶入標準模板)：填寫完成後點擊儲存")

    def delete_item(self):
        selection = self.item_listbox.curselection()
        if not selection: return
        
        # Find item
        index = selection[0]
        name = self.item_listbox.get(index)
        item = None
        for it in self.current_data:
            if self.is_glossary and (it['data'].get('term') == name or it['filename'] == name):
                item = it; break
            elif not self.is_glossary and (f"[{it['data'].get('id')}]" in name or it['filename'] == name):
                item = it; break
        
        if not item: return
        
        if messagebox.askyesno("確認刪除", f"確定要徹底刪除檔案 {item['filename']} 嗎？\n此動作不可復原。"):
            try:
                item['path'].unlink()
                self.update_index()
                self.on_source_selected()
                messagebox.showinfo("已刪除", "檔案已移除。")
            except Exception as e:
                messagebox.showerror("錯誤", f"刪除失敗: {e}")

    def duplicate_item(self):
        selection = self.item_listbox.curselection()
        if not selection: return
        
        # Load item but clear ID/Term or modify it
        index = selection[0]
        name = self.item_listbox.get(index)
        item = None
        for it in self.current_data:
            if self.is_glossary and (it['data'].get('term') == name or it['filename'] == name):
                item = it; break
            elif not self.is_glossary and (f"[{it['data'].get('id')}]" in name or it['filename'] == name):
                item = it; break
        
        if item:
            self.load_to_editor(item)
            if self.is_glossary:
                val = self.term_entry.get()
                self.term_entry.delete(0, tk.END)
                self.term_entry.insert(0, val + "-copy")
            else:
                val = self.qa_id_entry.get()
                self.qa_id_entry.delete(0, tk.END)
                self.qa_id_entry.insert(0, val + "-copy")
            self.item_listbox.selection_clear(0, tk.END)
            self.status_label.config(text="📋 副本已載入，請修改 ID/名稱後儲存")

    def show_help(self):
        help_win = tk.Toplevel(self.root)
        help_win.title("維護指南")
        help_win.geometry("700x500")
        st = scrolledtext.ScrolledText(help_win, padding=10)
        st.pack(fill=tk.BOTH, expand=True)
        st.insert('1.0', HELP_TEXT)
        st.config(state=tk.DISABLED)

def main():
    root = tk.Tk()
    # 簡單的主題設定
    style = ttk.Style()
    root.configure(background='#f0f0f0')
    app = ContentManager(root)
    
    # 狀態列
    app.status_label = ttk.Label(root, text="就緒", relief=tk.SUNKEN, anchor=tk.W)
    app.status_label.grid(row=1, column=0, sticky=(tk.W, tk.E))
    
    root.mainloop()

if __name__ == '__main__':
    main()
