# Cross-Platform Development Configuration

## Overview

This project is configured for seamless cross-platform development (macOS, Windows, Linux) with consistent code formatting and line endings.

## Configuration Files

### `.gitattributes`

Forces LF line endings for all text files across all platforms. This prevents CRLF/LF混合問題.

### `.editorconfig`

Ensures consistent coding styles across different editors and IDEs (VS Code, WebStorm, Sublime, etc.).

### `.prettierrc`

Includes `"endOfLine": "lf"` to enforce LF line endings when formatting code.

### `.lintstagedrc.json`

Automatically formats and lints files before each commit.

### `.husky/pre-commit`

Git hook that runs lint-staged before每次 commit.

## Setup for New Contributors

### 1. Clone the Repository

```bash
git clone <repo-url>
cd mdm-support-site
```

### 2. Install Dependencies

```bash
npm install
```

This will automatically:

- Install all packages
- Setup Husky git hooks (via `prepare` script)

### 3. Configure Git (One-time setup)

```bash
# Ensure Git uses LF line endings globally
git config --global core.autocrlf false
git config --global core.eol lf

# For this repository only (optional)
git config core.autocrlf false
git config core.eol lf
```

### 4. Normalize Existing Files (If needed)

If you're working on an existing branch with mixed line endings:

```bash
# Run the normalization script
./scripts/normalize-line-endings.sh

# Stage and commit the changes
git add -u
git commit -m "chore: normalize line endings to LF"
```

## How It Works

### On Commit

1. **Husky** triggers`.husky/pre-commit` hook
2. **lint-staged** runs on staged files:
   - Prettier formats code with LF line endings
   - ESLint fixes linting issues
3. If all checks pass, commit succeeds

### On Checkout

- `.gitattributes` ensures all text files are checked out with LF endings
- Even on Windows, files will have LF in the working directory

## Common Issues & Solutions

### Issue 1: "LF will be replaced by CRLF" warning

**Solution:**

```bash
git config core.autocrlf false
```

### Issue 2: Husky hooks not working on Windows

**Solution:**

- Ensure Git Bash or WSL is used (not CMD or PowerShell)
- Run `npx husky install` manually

### Issue 3: Permission denied when running scripts

**Solution:**

```bash
chmod +x .husky/pre-commit
chmod +x scripts/*.sh
```

### Issue 4: lint-staged fails on commit

**Solution:**

```bash
# Fix issues automatically
npm run lint

# Or format all files manually
npx prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"
```

## Editor Recommendations

### VS Code

Install these extensions:

- EditorConfig for VS Code
- Prettier - Code formatter
- ESLint

Add to your VS Code settings (`.vscode/settings.json`):

```json
{
  "files.eol": "\n",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

### WebStorm / IntelliJ IDEA

- EditorConfig support is built-in
- Enable Prettier on save:
  - Settings → Languages & Frameworks → JavaScript → Prettier
  - Check "Run on save for files"
- Set line separator to LF:
  - Settings → Editor → Code Style → Line separator → Unix and macOS (\n)

## Troubleshooting

### Reset all line endings

If you need to reset all files to LF:

```bash
# 1. Remove all files from git (but keep locally)
git rm --cached -r .

# 2. Normalize line endings
./scripts/normalize-line-endings.sh

# 3. Re-add all files
git add -A

# 4. Commit
git commit -m "chore: normalize line endings"
```

### Check current line endings

```bash
# macOS/Linux
file <filename>

# Or use this command to find CRLF files
find . -type f -name "*.ts" -exec file {} \; | grep CRLF
```

## References

- [EditorConfig](https://editorconfig.org/)
- [Prettier - End of Line](https://prettier.io/docs/en/options.html#end-of-line)
- [Git Attributes](https://git-scm.com/docs/gitattributes)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)
