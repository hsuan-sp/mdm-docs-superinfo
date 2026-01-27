#!/bin/bash

# Quick Setup Script for Cross-Platform Development
# Run this after cloning the repository

echo "🚀 Setting up cross-platform development environment..."
echo ""

# Step 1: Configure Git
echo "📝 Configuring Git to use LF line endings..."
git config core.autocrlf false
git config core.eol lf
echo "✅ Git configured"
echo ""

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 3: Setup Husky
echo "🐶 Setting up Husky git hooks..."
npx husky install
chmod +x .husky/pre-commit
echo "✅ Husky configured"
echo ""

# Step 4: Normalize line endings (optional but recommended)
read -p "🔧 Do you want to normalize all line endings now? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "⏳ Normalizing line endings..."
    ./scripts/normalize-line-endings.sh
    echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "   - Read docs/CROSS_PLATFORM_SETUP.md for detailed information"
echo "   - Run 'npm run dev' to start development server"
echo "   - Configure your editor (see docs/CROSS_PLATFORM_SETUP.md)"
echo ""
echo "Happy coding! 🎉"
