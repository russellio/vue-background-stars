# GitHub Actions Workflows

## CI Workflow

The CI workflow (`.github/workflows/ci.yml`) automatically runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### What it checks:
1. ✅ **TypeScript type checking** - Ensures no type errors
2. ✅ **Code formatting** - Checks Prettier formatting (optional, won't fail if Prettier not installed)
3. ✅ **Unit tests** - Runs all Vitest tests
4. ✅ **Build verification** - Ensures the package builds successfully

### Node.js versions tested:
- Node.js 18.x
- Node.js 20.x

## Enabling Prettier (Optional)

If you want to enforce code formatting:

1. Install Prettier:
   ```bash
   npm install --save-dev prettier
   ```

2. Format your code:
   ```bash
   npm run format
   ```

3. The CI workflow will automatically check formatting on PRs.

## Where to View Results

After pushing, view workflow results at:
- **GitHub Web UI**: Go to your repository → "Actions" tab
- **PR Checks**: Status checks appear at the bottom of pull requests

## Making Format Check Required

To make format checking required (instead of optional):
1. Remove `continue-on-error: true` from `.github/workflows/ci.yml`
2. Install Prettier: `npm install --save-dev prettier`

