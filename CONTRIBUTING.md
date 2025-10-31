# Contributing to Vue Background Stars

Thank you for your interest in contributing to Vue Background Stars! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/vue-background-stars.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`

## Development Setup

### Building the Package

```bash
npm run build
```

### Running the Demo

```bash
cd demo
npm install
npm run dev
```

### Type Checking

```bash
npm run type-check
```

## Making Changes

### Code Style

- Follow TypeScript best practices
- Use Vue 3 Composition API with `<script setup>`
- Ensure all components are properly typed
- Write self-documenting code with clear variable names
- Add comments for complex logic

### Commit Messages

Follow conventional commit format:
- `feat: Add new feature`
- `fix: Fix bug`
- `docs: Update documentation`
- `style: Code formatting`
- `refactor: Code restructuring`
- `test: Add tests`
- `chore: Build process or auxiliary tool changes`

### Pull Request Process

1. Ensure your code builds without errors
2. Update documentation if needed
3. Add or update demo examples if applicable
4. Write a clear description of your changes
5. Reference any related issues

## Component Guidelines

### BackgroundStars Component

- Keep performance optimizations (DocumentFragment usage)
- Maintain the color palette consistency
- Ensure responsive behavior

### ToggleSwitch Component

- Keep it lightweight and dependency-free
- Maintain accessibility (keyboard navigation, ARIA attributes)
- Ensure proper TypeScript typing

## Testing

While we don't have a formal test suite yet, please test your changes:

1. Build the package successfully
2. Test the demo application
3. Verify in different browsers (Chrome, Firefox, Safari, Edge)
4. Test responsive behavior on different screen sizes

## Questions?

Feel free to open an issue for questions or discussions.

