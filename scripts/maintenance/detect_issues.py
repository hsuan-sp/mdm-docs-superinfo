import os
import re

def detect_issues_in_text(content):
    """
    Analyzes markdown content string and returns a list of issues.
    Last Sync with DualEditor V3.1 Standards.
    """
    issues = []
    lines = content.split('\n')

    # 1. Trailing Spaces
    for i, line in enumerate(lines):
        if line != line.rstrip():
            issues.append(f"第 {i+1} 行發現多餘空格 (Trailing space)")
            break 

    # 2. Missing EOF Newline
    if content and not content.endswith('\n'):
        issues.append("檔案結尾缺少換行符號 (Missing EOF newline)")

    # 3. Greedy Bold (** > 100 chars)
    greedy_pattern = re.compile(r'\*\*[^*]{100,}\*\*')
    if greedy_pattern.search(content):
        issues.append("粗體範圍過長 (>100 字元)，可能涵蓋了不該粗體的內容")

    # 4. Spaced Bold (** text **)
    if re.search(r'\*\* [^*]+\*\*', content):
         issues.append("粗體語法開頭有多餘空格 (例如 '** text**')")
    if re.search(r'\*\*[^*]+ \*\*', content):
         issues.append("粗體語法結尾有多餘空格 (例如 '**text **')")

    # 5. CJK Spacing (Standard: English/Num bordering CJK needs space)
    # English followed by CJK without space
    if re.search(r'[a-zA-Z0-9][\u4e00-\u9fff]', content):
        issues.append("發現英文/數字與中文字之間缺少空格 (例如: 'iPad管理')")
    # CJK followed by English without space
    if re.search(r'[\u4e00-\u9fff][a-zA-Z0-9]', content):
        issues.append("發現中文字與英文/數字之間缺少空格 (例如: '管理iPad')")

    # 6. Punctuation Consistency (CJK should use Full-width)
    # Detect half-width punctuation immediately next to CJK
    # Full: ，。！？：；（）
    # Half: , . ! ? : ; ( )
    if re.search(r'[\u4e00-\u9fff][,.!:;?]', content):
        issues.append("發現中文字後方使用半形標點 (建議使用全形，如 '，。')")
    if re.search(r'[,.!:;?][\u4e00-\u9fff]', content):
        issues.append("發現中文字前方使用半形標點 (建議使用全形，如 '，。')")

    # 7. Header Hierarchy
    last_level = 0
    for i, line in enumerate(lines):
        if line.startswith('#'):
            match = re.match(r'^(#+)\s', line)
            if match:
                level = len(match.group(1))
                if level > last_level + 1 and last_level != 0:
                     issues.append(f"第 {i+1} 行標題層級跳躍 (從 H{last_level} 跳到 H{level})")
                last_level = level

    # 8. List Formatting
    for i, line in enumerate(lines):
        stripped = line.lstrip()
        if stripped.startswith('-') and not stripped.startswith('- ') and len(stripped) > 1:
             if not re.match(r'^-+$', stripped):
                issues.append(f"第 {i+1} 行列表符號後缺少空格 (應為 '- Item')")

    return issues

def detect_issues_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            return detect_issues_in_text(content)
    except Exception as e:
        return [f"讀取檔案錯誤: {str(e)}"]

def scan_directory(root_dir):
    report = {}
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.md'):
                full_path = os.path.join(root, file)
                issues = detect_issues_in_file(full_path)
                if issues:
                    report[full_path] = issues
    return report

if __name__ == "__main__":
    import sys
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../docs/content'))
    print(f"🔍 正在同步掃描 {base_dir} ...")
    report_data = scan_directory(base_dir)
    report_path = os.path.join(os.path.dirname(__file__), 'AUDIT_REPORT.md')
    
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# Markdown 格式檢測報告 (V3.1 同步版)\n\n")
        if not report_data:
            f.write("✅ 未發現問題。\n")
        else:
            sorted_files = sorted(report_data.keys())
            f.write(f"共在 {len(sorted_files)} 個檔案中發現在位準確問題。\n\n")
            for filepath in sorted_files:
                rel_path = os.path.relpath(filepath, os.path.dirname(base_dir))
                f.write(f"### {os.path.basename(filepath)} (`{rel_path}`)\n")
                for issue in report_data[filepath]:
                    f.write(f"- ⚠️ {issue}\n")
                f.write("\n")
    print(f"✅ 掃描完成。報告見 {report_path}")
