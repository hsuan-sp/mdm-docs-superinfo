#!/bin/bash

# Cross-platform Line Ending Normalization Script
# This script normalizes all text files to LF line endings

echo "🔧 Normalizing line endings to LF for cross-platform compatibility..."

# Find and convert all text files to LF
find . -type f \( \
  -name "*.ts" -o \
  -name "*.tsx" -o \
  -name "*.js" -o \
  -name "*.jsx" -o \
  -name "*.mjs" -o \
  -name "*.cjs" -o \
  -name "*.json" -o \
  -name "*.css" -o \
  -name "*.scss" -o \
  -name "*.md" -o \
  -name "*.mdx" -o \
  -name "*.html" -o \
  -name "*.yml" -o \
  -name "*.yaml" -o \
  -name "*.sh" \
\) -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/build/*" -not -path "*/dist/*" -not -path "*/.git/*" | while read file; do
  # Convert CRLF to LF using sed (cross-platform compatible)
  if [ -f "$file" ]; then
    sed -i '' $'s/\r$//' "$file" 2>/dev/null || sed -i $'s/\r$//' "$file"
  fi
done

echo "✅ Line ending normalization complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Run 'git add -u' to stage the changes"
echo "   2. Run 'git commit -m \"chore: normalize line endings to LF\"'"
echo "   3. All future commits will automatically maintain LF line endings"
