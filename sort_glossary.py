#!/usr/bin/env python3
"""
重新排序術語表 - 按字母順序A-Z排列
"""
import re
import json

# 讀取檔案
with open('docs/data/glossary.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取所有術語物件
pattern = r'\s*{\s*term:\s*[\'"]([^\'"]+)[\'"],\s*category:\s*[\'"]([^\'"]+)[\'"],\s*definition:\s*[\'"]([^\'"]+)[\'"],\s*analogy:\s*[\'"]([^\'"]+)[\'"]\s*},?'

terms = []
for match in re.finditer(pattern, content, re.DOTALL):
    term_text = match.group(1)
    category = match.group(2)
    definition = match.group(3)
    analogy = match.group(4)
    
    terms.append({
        'term': term_text,
        'category': category,
        'definition': definition,
        'analogy': analogy,
        'original': match.group(0)
    })

print(f"找到 {len(terms)} 個術語")

# 按術語名稱排序(忽略大小寫,移除括號內容後排序)
def sort_key(item):
    # 移除括號內容,只用主要術語排序
    term = re.sub(r'\s*\([^)]*\)', '', item['term'])
    # 移除空格
    term = term.replace(' ', '')
    return term.upper()

terms.sort(key=sort_key)

# 重建檔案內容
header = content[:content.find('export const glossaryData: Term[] = [')]
header += 'export const glossaryData: Term[] = [\n'

# 按字母分組
current_letter = ''
new_content = header

for term in terms:
    # 取得首字母
    first_char = term['term'][0].upper()
    
    # 如果是新的字母,加入註解
    if first_char != current_letter:
        if current_letter:  # 不是第一個字母
            new_content += '\n'
        new_content += f'  // --- {first_char} ---\n'
        current_letter = first_char
    
    # 加入術語
    new_content += f'''  {{
    term: '{term['term']}',
    category: '{term['category']}',
    definition: '{term['definition']}',
    analogy: '{term['analogy']}'
  }},
'''

new_content += '];\n'

# 寫回檔案
with open('docs/data/glossary.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✅ 術語表已重新排序!")
print(f"總共 {len(terms)} 個術語,按 A-Z 字母順序排列")
