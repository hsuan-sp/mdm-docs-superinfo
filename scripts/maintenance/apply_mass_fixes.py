import os
import re

def master_fix(content, is_zh=True):
    # 1. Trailing Spaces (Each line)
    lines = content.split('\n')
    content = "\n".join([line.rstrip() for line in lines])
    
    # 2. EOF Newline (Single)
    content = content.rstrip() + "\n"
    
    # 3. Spaced Bold (Fixing "** text **" -> "**text**")
    # Opening spaces
    content = re.sub(r'\*\*\s+', r'**', content)
    # Closing spaces
    content = re.sub(r'\s+\*\*', r'**', content)
    
    # 4. CJK Spacing (Standard: Eng/Num bordering CJK needs space)
    # English/Number followed by CJK
    content = re.sub(r'([a-zA-Z0-9])([\u4e00-\u9fff])', r'\1 \2', content)
    # CJK followed by English/Number
    content = re.sub(r'([\u4e00-\u9fff])([a-zA-Z0-9])', r'\1 \2', content)
    
    # 5. Punctuation (ZH only: Half-width to Full-width when adjacent to CJK)
    if is_zh:
        punc_map = {
            ',': '，', '.': '。', '!': '！', '?': '？', ':': '：', ';': '；', '(': '（', ')': '）'
        }
        for half, full in punc_map.items():
            # CJK + Half -> CJK + Full
            content = re.sub(f'([\u4e00-\u9fff])\\{half}', f'\\1{full}', content)
            # Half + CJK -> Full + CJK
            content = re.sub(f'\\{half}([\u4e00-\u9fff])', f'{full}\\1', content)
            
    return content

def scan_and_fix(root_dir):
    print(f"🚀 Starting Global Format Fix in: {root_dir}")
    fixed_count = 0
    total_count = 0
    
    for root, dirs, files in os.walk(root_dir):
        # Determine if we are in a ZH or EN path
        is_zh = "/zh/" in root.lower() or root.lower().endswith("/zh")
        
        for file in files:
            if file.endswith(".md"):
                total_count += 1
                filepath = os.path.join(root, file)
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        original = f.read()
                    
                    fixed = master_fix(original, is_zh)
                    
                    if original != fixed:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(fixed)
                        fixed_count += 1
                        # print(f" ✅ Fixed: {os.path.relpath(filepath, root_dir)}")
                except Exception as e:
                    print(f" ❌ Error processing {filepath}: {e}")

    print(f"\n✨ Done! Processed {total_count} files.")
    print(f"✅ Modified {fixed_count} files with formatting improvements.")

if __name__ == "__main__":
    docs_content = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../docs/content"))
    if os.path.exists(docs_content):
        scan_and_fix(docs_content)
    else:
        print(f"Directory not found: {docs_content}")
