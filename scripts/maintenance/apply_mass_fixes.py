import os
import re

def structural_fix(content):
    # 1. Fix "## Answer***" -> "## Answer\n\n***"
    content = content.replace("## Answer***", "## Answer\n\n***")
    content = content.replace("## Answer**", "## Answer\n\n**")
    
    # 2. Fix mashed headers and bolding
    # Split CJK punctuation and bold stars
    # Example: 生效。*** -> 生效。\n\n***
    content = re.sub(r'([。？！：；])(\*{2,3})([^\s])', r'\1\n\n\2\3', content)
    
    # 3. Fix list numbering "1.**" -> "1. **"
    # Match digit + dot + immediate non-space
    content = re.sub(r'^(\d+\.)([^\s])', r'\1 \2', content, flags=re.MULTILINE)
    
    return content

def master_fix(content, is_zh=True):
    # Structural first
    content = structural_fix(content)
    
    # Trailing spaces
    lines = [line.rstrip() for line in content.split('\n')]
    content = "\n".join(lines)
    
    # Handle mashed sentences that don't end in punctuation but transition to bold
    # Example: 建議選項。*** -> Covered above
    # Example: ...選項***實務建議** -> Options*** -> Options\n\n***
    # Let's target any closing punctuation followed by stars
    
    # Standard cleanup
    content = re.sub(r'\n{3,}', r'\n\n', content)
    content = content.rstrip() + "\n"
    
    # CJK Spacing
    content = re.sub(r'([a-zA-Z0-9])([\u4e00-\u9fff])', r'\1 \2', content)
    content = re.sub(r'([\u4e00-\u9fff])([a-zA-Z0-9])', r'\1 \2', content)
    
    if is_zh:
        punc_map = {
            ',': '，', '.': '。', '!': '！', '?': '？', ':': '：', ';': '；', '(': '（', ')': '）'
        }
        for half, full in punc_map.items():
            content = re.sub(f'([\u4e00-\u9fff])\\{half}', f'\\1{full}', content)
            content = re.sub(f'\\{half}([\u4e00-\u9fff])', f'{full}\\1', content)
            
    return content

def scan_and_fix(root_dir):
    print(f"🛠️ Manual Pattern Repair in: {root_dir}")
    for root, dirs, files in os.walk(root_dir):
        is_zh = "/zh/" in root.lower() or root.lower().endswith("/zh")
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                fixed = master_fix(content, is_zh)
                if content != fixed:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(fixed)
                    # print(f"Fixed: {file}")

if __name__ == "__main__":
    docs_content = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../docs/content"))
    scan_and_fix(docs_content)
