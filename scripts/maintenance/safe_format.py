import os
import re

def safe_format(content):
    # 1. CJK Spacing (The only truly safe and necessary one)
    content = re.sub(r'([a-zA-Z0-9])([\u4e00-\u9fff])', r'\1 \2', content)
    content = re.sub(r'([\u4e00-\u9fff])([a-zA-Z0-9])', r'\1 \2', content)
    
    # 2. Fix list prefix mashup: 1.** -> 1. **
    content = re.sub(r'^(\d+\.)([^\s])', r'\1 \2', content, flags=re.MULTILINE)
    
    # 3. Clean bold markers
    content = re.sub(r'\*\*\s+', r'**', content)
    content = re.sub(r'\s+\*\*', r'**', content)
    
    # 4. Final newline
    content = content.rstrip() + "\n"
    
    return content

def process():
    docs_path = "docs/content"
    for root, dirs, files in os.walk(docs_path):
        for f in files:
            if f.endswith(".md"):
                p = os.path.join(root, f)
                with open(p, 'r', encoding='utf-8') as file:
                    c = file.read()
                fixed = safe_format(c)
                if c != fixed:
                    with open(p, 'w', encoding='utf-8') as file:
                        file.write(fixed)

if __name__ == "__main__":
    process()
