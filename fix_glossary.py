#!/usr/bin/env python3
"""
批量修正術語表比喻格式並擴充新術語
"""
import re
import sys

# 讀取原始檔案
with open('docs/data/glossary.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 修正比喻格式:在 analogy 行中,如果沒有"就像"或"好比",就在開頭加上"就像"
def fix_analogy(match):
    full_match = match.group(0)
    analogy_content = match.group(1)
    
    # 如果已經有"就像"、"好比"、"猶如"等比喻詞,就不加
    if any(word in analogy_content[:10] for word in ['就像', '好比', '猶如', '如同', '彷彿']):
        return full_match
    
    # 否則在引號內容開頭加上"就像"
    return f"    analogy: '就像{analogy_content}'"

# 使用正則表達式批量修正
pattern = r"    analogy: '([^']+)'"
content = re.sub(pattern, fix_analogy, content)

# 寫回檔案
with open('docs/data/glossary.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ 比喻格式修正完成!")
print(f"檔案行數: {len(content.splitlines())}")
