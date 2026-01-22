import os
import re

# Same logic as DualEditor V4 / detect_issues.py
def master_fix(content, is_zh=True):
    # 1. Trailing Spaces
    content = "\n".join([line.rstrip() for line in content.split('\n')])
    
    # 2. EOF Newline
    content = content.rstrip() + "\n"
    
    # 3. Spaced Bold
    content = re.sub(r'\*\*\s+', r'**', content)
    content = re.sub(r'\s+\*\*', r'**', content)
    
    # 4. CJK Spacing (Only if ZH or contains CJK)
    content = re.sub(r'([a-zA-Z0-9])([\u4e00-\u9fff])', r'\1 \2', content)
    content = re.sub(r'([\u4e00-\u9fff])([a-zA-Z0-9])', r'\1 \2', content)
    
    # 5. Punctuation (Only for ZH)
    if is_zh:
        punc_map = {
            ',': '，', '.': '。', '!': '！', '?': '？', ':': '：', ';': '；', '(': '（', ')': '）'
        }
        # Only convert if adjacent to CJK to avoid breaking code/metadata
        for char, full in punc_map.items():
            # CJK + Half
            content = re.sub(f'([\u4e00-\u9fff])\\{char}', f'\\1{full}', content)
            # Half + CJK
            content = re.sub(f'\\{char}([\u4e00-\u9fff])', f'{full}\\1', content)

    return content

def process_dir(target_dir, is_zh):
    print(f"🛠️ Processing: {target_dir}")
    for i in range(1, 27):
        filename = f"acc-{i}.md"
        filepath = os.path.join(target_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                original = f.read()
            
            fixed = master_fix(original, is_zh)
            
            if original != fixed:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(fixed)
                print(f" ✅ Fixed: {filename}")
            else:
                print(f" ℹ️ No changes: {filename}")

if __name__ == "__main__":
    base = "docs/content"
    process_dir(os.path.join(base, "zh/qa/account"), True)
    process_dir(os.path.join(base, "en/qa/account"), False)
