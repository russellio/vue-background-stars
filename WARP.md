# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Vue 3 component library that provides an animated starry night sky background. The package is built with TypeScript and Vite, designed to be published as an npm package at `@russellio/vue-background-stars`.

## Key Commands

### Development
- `npm run dev` - Start Vite dev server for the main package
- `cd demo && npm install && npm run dev` - Run the demo application on port 3000 (automatically opens browser)

### Building
- `npm run build` - Build the library (runs type-check first, then Vite build)
- Output: `dist/` folder with UMD and ES module formats

### Type Checking
- `npm run type-check` - Run Vue-TSC type checking without emitting files
- Always run this before committing changes

### Preview
- `npm run preview` - Preview the production build

## Project Architecture

### Library Structure
The project is split into two parts:
1. **Main package** (`/src`) - The published library
2. **Demo app** (`/demo`) - Development/testing environment

### Source Code (`/src`)
- **`index.ts`** - Library entry point; exports components and Vue plugin installer
- **`components/BackgroundStars.vue`** - Main component that generates and animates stars
- **`components/ToggleSwitch.vue`** - Optional toggle control component

### Component Architecture

**BackgroundStars.vue:**
- Uses `DocumentFragment` for performance optimization when generating 450+ DOM elements
- Uses `requestAnimationFrame` to avoid blocking rendering during mount
- Generates three types of star layers: basic stars, cross stars, and auxiliary stars
- Emits `background-ready` event when generation completes
- Fixed at z-index: -1 to stay behind content
- Color palette: `['#280F36', '#632B6C', '#BE6590', '#FFC1A0', '#FE9C7F']`
- Key implementation detail: Multiple star generation loops (250 basic, 150 cross, 50 aux)

**ToggleSwitch.vue:**
- Implements v-model pattern with `update:modelValue` event
- Responsive: Changes layout from column to row at 1024px breakpoint
- Star icon hidden on mobile, visible on desktop (1024px+)
- Props: `modelValue` (boolean), `label` (string), `showIcon` (boolean)

### Build Configuration

**vite.config.ts:**
- Library mode with entry at `src/index.ts`
- Externalizes Vue as peer dependency
- Outputs two formats: ES modules (`*.es.js`) and UMD (`*.umd.js`)
- Uses `vite-plugin-dts` for TypeScript declaration generation
- CSS is bundled as single `style.css` file (not code-split)

**package.json exports:**
- Main entry: `./dist/vue-background-stars.{es,umd}.js`
- Styles: `@russellio/vue-background-stars/style.css`
- Types: `./dist/index.d.ts`

### Demo Application (`/demo`)
- Separate Vite configuration
- Uses `@` alias pointing to `../src`
- Demonstrates both components with toggle functionality
- Server runs on port 3000 with auto-open enabled

## Development Practices

### Code Style
- Vue 3 Composition API with `<script setup>` syntax
- TypeScript strict mode enabled
- All components must be properly typed
- Use `defineProps` and `defineEmits` with TypeScript syntax (not runtime declarations)

### TypeScript Configuration
- Target: ES2020
- Module resolution: bundler
- Strict type checking enabled
- Unused locals/parameters flagged as errors
- Path alias: `@/*` maps to `./src/*`

### Commit Conventions
Follow conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting
- `refactor:` - Code restructuring
- `test:` - Test additions
- `chore:` - Build/tooling changes

### Performance Considerations
When modifying BackgroundStars.vue:
- Maintain DocumentFragment usage for batch DOM insertions
- Keep star generation in requestAnimationFrame
- Be mindful of the total star count (currently 450+ stars)
- Preserve the color palette consistency

### Publishing
This is a library package designed for npm publication. When making changes:
- Ensure `dist/` output is correct after building
- Verify both ES and UMD formats work
- Check that type definitions are generated properly
- Test installation from the built package before publishing
