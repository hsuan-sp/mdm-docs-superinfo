import os
import sys
import subprocess
import threading
import shutil
import tempfile
import time
import re
import webbrowser

# --- Import Dependencies ---
try:
    import tkinter as tk
    from tkinter import ttk, messagebox
    from tkhtmlview import HTMLText, HTMLLabel
    import markdown
except ImportError as e:
    print("❌ Dependency Error:", e)
    print("Please run: pip3 install tkhtmlview markdown --break-system-packages")
    sys.exit(1)

# Import detection module
sys.path.append(os.path.dirname(__file__))
import detect_issues

# --- Configuration ---
DOCS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../docs/content'))
ZH_DIR = os.path.join(DOCS_DIR, 'zh')
EN_DIR = os.path.join(DOCS_DIR, 'en')

class DualEditorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("MDM Support Site - 雙語編輯器 (Dual Editor) V3.1")
        self.root.geometry("1600x900")
        
        # Data
        self.file_list = []
        self.current_rel_path = None
        self.file_issues = {} # {rel_path: [issues]}
        self.is_modified = False
        
        # Styles
        style = ttk.Style()
        style.theme_use('clam')
        style.configure("Treeview", font=('San Francisco', 11), rowheight=25)
        style.configure("TButton", font=('San Francisco', 11))
        
        # Layout: Left Sidebar (File List), Center (Editors)
        self.paned_window = tk.PanedWindow(root, orient=tk.HORIZONTAL, sashwidth=4, bg='#d0d0d0')
        self.paned_window.pack(fill=tk.BOTH, expand=True)
        
        # Sidebar
        self.sidebar_frame = tk.Frame(self.paned_window, width=300, bg='#f5f5f7')
        self.paned_window.add(self.sidebar_frame)
        self.setup_sidebar()
        
        # Editor Area
        self.editor_frame = tk.Frame(self.paned_window, bg='white')
        self.paned_window.add(self.editor_frame)
        self.setup_editor_area()

        # Initial Scan
        self.run_audit_full()

    def setup_sidebar(self):
        # Filter Frame
        self.filter_frame = tk.Frame(self.sidebar_frame, bg='#f5f5f7', padx=10, pady=10)
        self.filter_frame.pack(fill=tk.X)
        self.filter_var = tk.StringVar()
        self.filter_var.trace("w", self.filter_files)
        tk.Label(self.filter_frame, text="搜尋檔案 (Search):", bg='#f5f5f7', font=('bold', 12)).pack(anchor='w')
        self.filter_entry = ttk.Entry(self.filter_frame, textvariable=self.filter_var)
        self.filter_entry.pack(fill=tk.X)

        self.show_issues_only_var = tk.BooleanVar(value=False)
        self.chk_issues = ttk.Checkbutton(self.filter_frame, text="只顯示有問題的檔案", variable=self.show_issues_only_var, command=self.update_tree)
        self.chk_issues.pack(anchor='w', pady=5)
        
        self.btn_refresh = ttk.Button(self.filter_frame, text="🔄 重新掃描 (Refresh)", command=self.run_audit_full)
        self.btn_refresh.pack(fill=tk.X, pady=2)

        # File Tree Frame with Scrollbar
        self.tree_container = tk.Frame(self.sidebar_frame, bg='#f5f5f7')
        self.tree_container.pack(fill=tk.BOTH, expand=True, padx=10, pady=(0, 10))
        
        self.tree_scroll = ttk.Scrollbar(self.tree_container)
        self.tree_scroll.pack(side=tk.RIGHT, fill=tk.Y)

        self.tree = ttk.Treeview(self.tree_container, columns=("Issues"), show="tree headings", yscrollcommand=self.tree_scroll.set)
        self.tree.heading("#0", text="檔案結構 (Structure)")
        self.tree.heading("Issues", text="⚠️")
        self.tree.column("Issues", width=30, stretch=False, anchor='center')
        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        self.tree_scroll.config(command=self.tree.yview)
        self.tree.bind("<<TreeviewSelect>>", self.on_file_select)
        self.tree.tag_configure('has_issue', foreground='red')

    def setup_editor_area(self):
        # Toolbar (Top)
        self.toolbar = tk.Frame(self.editor_frame, height=40, bg='#e8e8e8')
        self.toolbar.pack(fill=tk.X)
        
        self.btn_save = ttk.Button(self.toolbar, text="💾 儲存所有變更 (Save)", command=self.save_files)
        self.btn_save.pack(side=tk.LEFT, padx=5, pady=5)
        
        self.btn_browser = ttk.Button(self.toolbar, text="🌐 預覽 (Port 4000)", command=self.open_browser_preview)
        self.btn_browser.pack(side=tk.LEFT, padx=5, pady=5)
        
        self.status_label = tk.Label(self.toolbar, text="就緒", bg='#e8e8e8', fg='#666')
        self.status_label.pack(side=tk.RIGHT, padx=10)

        # Quick Fix Toolbar (Second Row)
        self.fix_toolbar = tk.Frame(self.editor_frame, height=35, bg='#f0f0f0')
        self.fix_toolbar.pack(fill=tk.X)
        
        tk.Label(self.fix_toolbar, text="快速重排:", bg='#f0f0f0', font=('bold', 10)).pack(side=tk.LEFT, padx=5)
        ttk.Button(self.fix_toolbar, text="中英空格", command=self.apply_fix_cjk).pack(side=tk.LEFT, padx=2)
        ttk.Button(self.fix_toolbar, text="修正粗體", command=self.apply_fix_bold).pack(side=tk.LEFT, padx=2)
        ttk.Button(self.fix_toolbar, text="列表空格", command=self.apply_fix_list).pack(side=tk.LEFT, padx=2)
        ttk.Button(self.fix_toolbar, text="清理末尾", command=self.apply_fix_trim).pack(side=tk.LEFT, padx=2)

        tk.Label(self.fix_toolbar, text="| 對象:", bg='#f0f0f0').pack(side=tk.LEFT, padx=5)
        self.fix_target_var = tk.StringVar(value="ZH")
        tk.Radiobutton(self.fix_toolbar, text="主(ZH)", variable=self.fix_target_var, value="ZH", bg='#f0f0f0').pack(side=tk.LEFT)
        tk.Radiobutton(self.fix_toolbar, text="參(EN)", variable=self.fix_target_var, value="EN", bg='#f0f0f0').pack(side=tk.LEFT)

        tk.Label(self.fix_toolbar, text="| 標點:", bg='#f0f0f0').pack(side=tk.LEFT, padx=5)
        ttk.Button(self.fix_toolbar, text="轉全形", command=lambda: self.apply_punctuation(True)).pack(side=tk.LEFT, padx=2)
        ttk.Button(self.fix_toolbar, text="轉半形", command=lambda: self.apply_punctuation(False)).pack(side=tk.LEFT, padx=2)

        # Extra Features Toolbar (Third Row)
        self.extra_toolbar = tk.Frame(self.editor_frame, height=35, bg='#e8e8e8')
        self.extra_toolbar.pack(fill=tk.X)
        
        tk.Label(self.extra_toolbar, text="插入模板:", bg='#e8e8e8', font=('bold', 10)).pack(side=tk.LEFT, padx=5)
        ttk.Button(self.extra_toolbar, text="Tip", command=lambda: self.insert_template('tip')).pack(side=tk.LEFT, padx=2)
        ttk.Button(self.extra_toolbar, text="Warning", command=lambda: self.insert_template('warning')).pack(side=tk.LEFT, padx=2)
        
        tk.Label(self.extra_toolbar, text="| 字體:", bg='#e8e8e8').pack(side=tk.LEFT, padx=5)
        ttk.Button(self.extra_toolbar, text="A+", command=lambda: self.change_font_size(2)).pack(side=tk.LEFT, padx=2)
        ttk.Button(self.extra_toolbar, text="A-", command=lambda: self.change_font_size(-2)).pack(side=tk.LEFT, padx=2)

        tk.Label(self.extra_toolbar, text="| 系統:", bg='#e8e8e8').pack(side=tk.LEFT, padx=5)
        ttk.Button(self.extra_toolbar, text="📂 在 Finder 顯示", command=self.reveal_in_finder).pack(side=tk.LEFT, padx=2)

        # Issue Banner
        self.issue_scroll_frame = tk.Frame(self.editor_frame, bg='#ffdddd')
        # banner is initially hidden via pack_forget
        self.issue_banner = tk.Label(self.issue_scroll_frame, text="", bg='#ffdddd', fg='#d00', font=('bold', 11), justify=tk.LEFT, wraplength=1000)
        self.issue_banner.pack(fill=tk.X, padx=10, pady=5)
        
        # Editors & Preview Split
        self.text_panes = tk.PanedWindow(self.editor_frame, orient=tk.HORIZONTAL, sashwidth=4, bg='#d0d0d0')
        self.text_panes.pack(fill=tk.BOTH, expand=True)
        
        # ZH
        self.zh_frame = tk.Frame(self.text_panes)
        self.text_panes.add(self.zh_frame, width=450)
        tk.Label(self.zh_frame, text="繁體中文 (ZH)", bg='#eee', pady=2).pack(fill=tk.X)
        self.zh_scroll = ttk.Scrollbar(self.zh_frame)
        self.zh_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        self.zh_text = tk.Text(self.zh_frame, wrap=tk.WORD, font=('Menlo', 13), undo=True, yscrollcommand=self.zh_scroll.set)
        self.zh_text.pack(fill=tk.BOTH, expand=True)
        self.zh_scroll.config(command=self.zh_text.yview)

        # EN
        self.en_frame = tk.Frame(self.text_panes)
        self.text_panes.add(self.en_frame, width=350)
        tk.Label(self.en_frame, text="英文參考 (EN)", bg='#eee', pady=2).pack(fill=tk.X)
        self.en_scroll = ttk.Scrollbar(self.en_frame)
        self.en_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        self.en_text = tk.Text(self.en_frame, wrap=tk.WORD, font=('Menlo', 13), undo=True, yscrollcommand=self.en_scroll.set)
        self.en_text.pack(fill=tk.BOTH, expand=True)
        self.en_scroll.config(command=self.en_text.yview)

        # Preview
        self.preview_frame = tk.Frame(self.text_panes)
        self.text_panes.add(self.preview_frame, width=600)
        tk.Label(self.preview_frame, text="雙語實時預覽 (Live Preview)", bg='#eee', pady=2).pack(fill=tk.X)
        self.preview_scroll = ttk.Scrollbar(self.preview_frame)
        self.preview_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        self.preview_html = HTMLText(self.preview_frame, html="<h3>Ready</h3>", yscrollcommand=self.preview_scroll.set)
        self.preview_html.pack(fill=tk.BOTH, expand=True)
        self.preview_scroll.config(command=self.preview_html.yview)

        # Tags & Bindings
        for w in [self.zh_text, self.en_text]:
            self.setup_syntax_tags(w)
            w.bind('<KeyRelease>', lambda e, widget=w: self.on_text_change(widget))
        
        self.zh_text.bind("<MouseWheel>", self.sync_scroll_zh)
        self.en_text.bind("<MouseWheel>", self.sync_scroll_en)

    def setup_syntax_tags(self, text_widget):
        text_widget.tag_configure("h1", font=('Menlo', 22, 'bold'), foreground="#2c3e50")
        text_widget.tag_configure("h2", font=('Menlo', 18, 'bold'), foreground="#34495e")
        text_widget.tag_configure("code", font=('Courier', 13), background="#f0f0f0", foreground="#d63384")
        text_widget.tag_configure("error_underline", underline=True, underlinefg="red", background="#ffebe9")

    def highlight_syntax_basics(self, text_widget):
        content = text_widget.get("1.0", tk.END)
        for tag in ["h1", "h2", "code"]: text_widget.tag_remove(tag, "1.0", tk.END)
        lines = content.split('\n')
        for i, line in enumerate(lines):
            idx = i + 1
            if line.startswith('# '): text_widget.tag_add("h1", f"{idx}.0", f"{idx}.end")
            elif line.startswith('## '): text_widget.tag_add("h2", f"{idx}.0", f"{idx}.end")

    def on_text_change(self, text_widget=None):
        if text_widget: self.highlight_syntax_basics(text_widget)
        self.validate_content_realtime()
        self.update_live_preview()
        self.is_modified = True

    def validate_content_realtime(self):
        issues = detect_issues.detect_issues_in_text(self.zh_text.get("1.0", tk.END))
        if issues:
            self.issue_scroll_frame.pack(fill=tk.X, side=tk.TOP, before=self.text_panes)
            self.issue_banner.config(text="\n".join(issues))
            self.zh_text.config(bg="#FFF8F8")
        else:
            self.issue_scroll_frame.pack_forget()
            self.zh_text.config(bg="white")

    def update_live_preview(self):
        try:
            zh_md = self.zh_text.get("1.0", tk.END)
            en_md = self.en_text.get("1.0", tk.END)
            
            def convert(md):
                md = re.sub(r'::: tip\s*(.*?)', r'<div style="background-color: #e6f7e8; border-left: 5px solid #42b983; padding: 10px; margin: 5px 0;"><b>\1</b><br>', md)
                md = re.sub(r'::: warning\s*(.*?)', r'<div style="background-color: #fff8e6; border-left: 5px solid #e7c000; padding: 10px; margin: 5px 0;"><b>\1</b><br>', md)
                md = re.sub(r'::: danger\s*(.*?)', r'<div style="background-color: #ffe6e6; border-left: 5px solid #c00; padding: 10px; margin: 5px 0;"><b>\1</b><br>', md)
                md = re.sub(r':::', '</div>', md)
                return markdown.markdown(md, extensions=['extra', 'codehilite'])

            zh_html = convert(zh_md)
            en_html = convert(en_md)
            
            full_html = f"""
            <div style="font-family: sans-serif; padding: 10px; color: #333; font-size: 13px;">
                <table width="100%" border="0" cellspacing="10" cellpadding="0">
                    <tr>
                        <td width="50%" valign="top" style="border-right: 1px solid #ddd; padding-right: 10px;">
                            <h4 style="color: #42b983; border-bottom: 1px solid #eee;">繁體中文</h4>
                            {zh_html}
                        </td>
                        <td width="50%" valign="top" style="padding-left: 10px;">
                            <h4 style="color: #3498db; border-bottom: 1px solid #eee;">English</h4>
                            {en_html}
                        </td>
                    </tr>
                </table>
            </div>
            """
            self.preview_html.set_html(full_html)
        except Exception: pass

    # --- Fix Commands ---
    def apply_fix_cjk(self): self._run_fix(lambda s: re.sub(r'([a-zA-Z0-9])([\u4e00-\u9fff])', r'\1 \2', re.sub(r'([\u4e00-\u9fff])([a-zA-Z0-9])', r'\1 \2', s)))
    def apply_fix_bold(self): self._run_fix(lambda s: re.sub(r'\*\*\s+', r'**', re.sub(r'\s+\*\*', r'**', s)))
    def apply_fix_trim(self): self._run_fix(lambda s: "\n".join([l.rstrip() for l in s.split('\n')]).rstrip() + "\n")
    
    def apply_fix_list(self):
        def fix_list(s):
            res = []
            for l in s.split('\n'):
                if l.lstrip().startswith('-') and not l.lstrip().startswith('- ') and not re.match(r'^-+$', l.lstrip()):
                    l = l.replace('-', '- ', 1)
                res.append(l)
            return "\n".join(res)
        self._run_fix(fix_list)

    def apply_punctuation(self, to_full):
        if to_full:
            m = str.maketrans({',': '，', '.': '。', '!': '！', '?': '？', ':': '：', ';': '；', '(': '（', ')': '）'})
            self._run_fix(lambda s: s.translate(m))
        else:
            m = {'，': ', ', '。': '. ', '！': '! ', '？': '? ', '：': ': ', '；': '; ', '（': '(', '）': ')'}
            def fix_p(s):
                for k, v in m.items(): s = s.replace(k, v)
                return s.replace('  ', ' ')
            self._run_fix(fix_p)

    def insert_template(self, type):
        target = self.zh_text if self.fix_target_var.get() == "ZH" else self.en_text
        template = f"\n::: {type}\n內容在此\n:::\n"
        target.insert(tk.INSERT, template)
        self.on_text_change(target)

    def change_font_size(self, delta):
        # We need to import font
        import tkinter.font as tkfont
        # Default font is Menlo 13.
        # Let's just blindly assume self.zh_text uses the same font object or we configure a new one.
        # Actually simplest way is to configure the tag or widget.
        
        # Get current size approx manually or just track it
        if not hasattr(self, 'current_font_size'): self.current_font_size = 13
        self.current_font_size = max(8, min(30, self.current_font_size + delta))
        
        new_font = ('Menlo', self.current_font_size)
        self.zh_text.configure(font=new_font)
        self.en_text.configure(font=new_font)
        # Update syntax tags too if needed, but they might inherit or need update
        # Tags usually override. So we must update tags.(H1, H2...)
        # This is getting complex, let's just update base font for now.
        
        self.status_label.config(text=f"字體大小: {self.current_font_size}")

    def reveal_in_finder(self):
        if self.current_rel_path:
            path = os.path.join(ZH_DIR, self.current_rel_path)
            if os.path.exists(path):
                subprocess.call(["open", "-R", path])

    def _run_fix(self, func):
        target = self.zh_text if self.fix_target_var.get() == "ZH" else self.en_text
        content = target.get("1.0", tk.END)
        new_content = func(content)
        pos = target.index(tk.INSERT)
        target.delete("1.0", tk.END); target.insert("1.0", new_content)
        target.mark_set(tk.INSERT, pos); target.see(tk.INSERT)
        self.on_text_change(target)
        self.status_label.config(text=f"已修正在 {self.fix_target_var.get()}", fg="blue")

    # --- Boilerplate ---
    def run_audit_full(self):
        self.status_label.config(text="掃描中...")
        self.root.update()
        data = detect_issues.scan_directory(ZH_DIR)
        self.file_issues = {os.path.relpath(p, ZH_DIR): i for p, i in data.items()}
        self.load_file_list()
        self.status_label.config(text=f"就緒。{len(self.file_issues)} 個檔案有問題。")

    def load_file_list(self):
        self.file_list = []
        for r, ds, fs in os.walk(ZH_DIR):
            for f in fs:
                if f.endswith(".md"): self.file_list.append(os.path.relpath(os.path.join(r, f), ZH_DIR))
        self.file_list.sort(); self.update_tree()

    def update_tree(self):
        self.tree.delete(*self.tree.get_children())
        filter_text = self.filter_var.get().lower()
        show_issues = self.show_issues_only_var.get()
        folders = {}
        for p in self.file_list:
            if filter_text and filter_text not in p.lower(): continue
            has_i = p in self.file_issues
            if show_issues and not has_i: continue
            parts = p.split(os.sep)
            parent = ""
            if len(parts) > 1:
                if parts[0] not in folders: folders[parts[0]] = self.tree.insert("", "end", text=parts[0], open=True)
                parent = folders[parts[0]]
            self.tree.insert(parent, "end", text=parts[-1], values=("⚠️" if has_i else "", p), tags=('has_issue',) if has_i else ())

    def filter_files(self, *args): self.update_tree()
    def on_file_select(self, e):
        sel = self.tree.selection()
        if sel:
            v = self.tree.item(sel[0], "values")
            if v and len(v) >= 2: self.load_content(v[1])

    def load_content(self, rel_path):
        if self.is_modified and not messagebox.askyesno("Confirm", "未儲存變更，確定切換？"): return
        self.current_rel_path = rel_path
        def load(path, text_w):
            text_w.delete("1.0", tk.END)
            if os.path.exists(path):
                with open(path, 'r', encoding='utf-8') as f: text_w.insert("1.0", f.read())
            else: text_w.insert("1.0", "[New File]")
            self.highlight_syntax_basics(text_w)
        load(os.path.join(ZH_DIR, rel_path), self.zh_text)
        load(os.path.join(EN_DIR, rel_path), self.en_text)
        self.validate_content_realtime(); self.update_live_preview(); self.is_modified = False
        self.status_label.config(text=f"編輯中: {rel_path}", fg="#666")

    def save_files(self):
        if not self.current_rel_path: return
        try:
            for d, t in [(ZH_DIR, self.zh_text), (EN_DIR, self.en_text)]:
                p = os.path.join(d, self.current_rel_path)
                os.makedirs(os.path.dirname(p), exist_ok=True)
                if os.path.exists(p): shutil.copy2(p, p + ".bak")
                with open(p, 'w', encoding='utf-8') as f: f.write(t.get("1.0", tk.END))
            self.status_label.config(text="存檔成功", fg="green"); self.is_modified = False
            self.on_text_change()
        except Exception as e: messagebox.showerror("Error", str(e))

    def open_browser_preview(self):
        if self.current_rel_path: webbrowser.open(f"http://localhost:4000/{self.current_rel_path.replace('.md', '')}")

    def sync_scroll_zh(self, *a): self.en_text.yview_moveto(self.zh_text.yview()[0])
    def sync_scroll_en(self, *a): self.zh_text.yview_moveto(self.en_text.yview()[0])

if __name__ == "__main__":
    root = tk.Tk(); app = DualEditorApp(root); root.mainloop()
