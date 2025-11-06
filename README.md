# Vue Background Stars

A beautiful animated starry night sky background component for Vue 3. Perfect for landing pages, portfolios, and space-themed applications.

![Vue Background Stars](https://img.shields.io/badge/Vue-3.x-green) ![License](https://img.shields.io/badge/license-MIT-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![Version](https://img.shields.io/badge/version-1.1.0-blue)

## ✨ Features

- 🌟 **Animated Twinkling Stars** - Generates over 1,500 animated star elements with multiple sizes (0.5px to 2.5px) and realistic twinkling animations
- 🎨 **Beautiful Color Palette** - Rich gradient night sky background with multiple radial gradients and a custom color palette (#280F36, #632B6C, #BE6590, #FFC1A0, #FE9C7F)
- ⚡ **Performance Optimized** - Uses DocumentFragment for efficient DOM manipulation and `requestAnimationFrame` for smooth rendering
- 📦 **Zero Dependencies** - Only requires Vue 3 (no external dependencies)
- 🔧 **TypeScript Support** - Fully typed with TypeScript 5.2.2 out of the box
- 🎛️ **Optional Toggle Control** - Includes a fully-featured toggle switch component with responsive design and icon support
- 📱 **Fully Responsive** - Works seamlessly on all screen sizes with mobile-optimized toggle switch
- 🎭 **Easy to Customize** - Well-structured components with scoped styles ready for customization
- 🧪 **Fully Tested** - Comprehensive test suite using Vitest with 100% component coverage
- 📦 **Multiple Build Formats** - Available as ES modules and UMD for maximum compatibility

## 📦 Installation

Install the package via npm:

```bash
npm install @russellio/vue-background-stars
```

Or via yarn:

```bash
yarn add @russellio/vue-background-stars
```

Or via pnpm:

```bash
pnpm add @russellio/vue-background-stars
```

## 🚀 Quick Start

### Basic Usage

1. Import the component and styles:

```vue
<script setup>
import { BackgroundStars } from '@russellio/vue-background-stars';
import '@russellio/vue-background-stars/style.css';
</script>

<template>
  <BackgroundStars />
</template>
```

### With Toggle Switch

Use the included `ToggleSwitch` component to control the background:

```vue
<script setup>
import { ref } from 'vue';
import { BackgroundStars, ToggleSwitch } from '@russellio/vue-background-stars';
import '@russellio/vue-background-stars/style.css';

const showStars = ref(true);
</script>

<template>
  <div>
    <ToggleSwitch 
      v-model="showStars" 
      label="Starry Sky"
    />
    <BackgroundStars v-if="showStars" />
    
    <!-- Your content here -->
    <div class="content">
      <h1>Welcome to my site!</h1>
    </div>
  </div>
</template>
```

### Vue Plugin Installation

You can also install it as a Vue plugin:

```javascript
import { createApp } from 'vue';
import VueBackgroundStars from '@russellio/vue-background-stars';
import '@russellio/vue-background-stars/style.css';

const app = createApp(App);
app.use(VueBackgroundStars);

app.mount('#app');
```

Then use the components globally:

```vue
<template>
  <BackgroundStars />
  <ToggleSwitch v-model="showStars" />
</template>
```

## 📖 API Reference

### BackgroundStars Component

The main background component that renders the animated starry sky. Generates approximately 1,575 total star elements across three layers:

- **Main Stars Layer**: 1,175 stars (basic stars of various sizes with twinkling animations)
- **Cross Stars Layer**: 300 elements (colored stars with blur effects in a diagonal pattern)
- **Auxiliary Cross Stars Layer**: 100 elements (additional colored stars with enhanced effects)

#### Props

None - The component works out of the box without any props.

#### Events

- `@background-ready` - Emitted when the background stars have finished generating (after `requestAnimationFrame` completes)

```vue
<BackgroundStars @background-ready="handleReady" />
```

#### Technical Details

- **Star Sizes**: 6 different star classes (star-0 through star-5) ranging from 0.5px to 2.5px
- **Animation**: CSS-based `blink` animation with configurable durations (1-12 seconds)
- **Rendering**: Uses `requestAnimationFrame` for optimal performance
- **Positioning**: Fixed position background with `z-index: -1` to stay behind content
- **Background**: Multi-layer radial gradients creating a deep space effect

#### Styling

The component uses scoped styles and will render behind your content (z-index: -1). You can customize the appearance by overriding CSS classes in your global stylesheet:

```css
/* Override the sky background */
.vue-background-stars .sky {
  background: your-custom-gradient;
}

/* Adjust star colors */
.vue-background-stars .star {
  background-color: #your-color;
}

/* Customize star animations */
.vue-background-stars .blink {
  animation-duration: 3s; /* Custom duration */
}
```

### ToggleSwitch Component

A fully-featured toggle switch component for controlling the background visibility with responsive design.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | The current toggle state (v-model) |
| `label` | `string` | `''` | Optional label text to display next to the switch |
| `showIcon` | `boolean` | `true` | Whether to show the star icon (hidden on mobile by default, visible on screens ≥1024px) |

#### Events

- `@update:modelValue` - Emitted when the toggle state changes

#### Styling

The toggle switch is fully responsive:
- **Mobile**: Vertical layout (column) with icon hidden
- **Desktop** (≥1024px): Horizontal layout (row) with icon visible
- Includes smooth transitions and active state styling
- Icon opacity animates based on toggle state

#### Example

```vue
<template>
  <ToggleSwitch 
    v-model="isEnabled"
    label="Enable Stars"
    :showIcon="true"
  />
</template>

<script setup>
import { ref } from 'vue';
const isEnabled = ref(false);
</script>
```

## 🎨 Customization

### Overriding Styles

Since the component uses scoped styles, you can override them by using more specific selectors or by using CSS custom properties. Here's an example:

```css
/* Override the sky background */
.vue-background-stars .sky {
  background: your-custom-gradient;
}

/* Adjust star colors */
.vue-background-stars .star {
  background-color: #your-color;
}

/* Customize star sizes */
.vue-background-stars .star-0 {
  width: 1px;
  height: 1px;
}
```

### Custom Star Count

The component generates a fixed number of stars:
- 250 iterations × 4 basic stars = 1,000 basic stars
- 150 cross stars with blur effects
- 50 auxiliary stars with enhanced effects
- Total: ~1,575 star elements

To customize the star count, fork the component and modify the `generateStars()` function in `BackgroundStars.vue`.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires browsers with support for:
- CSS animations
- ES6+ features
- Vue 3 (^3.0.0)

## 🛠️ Tech Stack

### Core Dependencies
- **Vue**: ^3.5.13 (peer dependency: ^3.0.0)
- **TypeScript**: ^5.2.2

### Development Dependencies
- **Vite**: ^7.0.4 - Build tool and dev server
- **vue-tsc**: ^3.1.3 - TypeScript checking for Vue
- **@vitejs/plugin-vue**: ^6.0.0 - Vue SFC support
- **vite-plugin-dts**: ^4.3.0 - TypeScript declaration generation
- **Vitest**: ^4.0.6 - Testing framework
- **@vue/test-utils**: ^2.4.6 - Vue component testing utilities
- **happy-dom**: ^20.0.10 - DOM implementation for testing
- **@vitest/ui**: ^4.0.6 - Vitest UI for test visualization

### Build Output
- **ES Module**: `vue-background-stars.es.js`
- **UMD**: `vue-background-stars.umd.js`
- **TypeScript Definitions**: `index.d.ts`
- **Styles**: `vue-background-stars.css`

## 📝 Development

### Project Structure

```
vue-background-stars/
├── src/
│   ├── components/
│   │   ├── BackgroundStars.vue
│   │   ├── ToggleSwitch.vue
│   │   └── __tests__/
│   │       ├── BackgroundStars.spec.ts
│   │       └── ToggleSwitch.spec.ts
│   ├── __tests__/
│   │   └── index.spec.ts
│   └── index.ts
├── demo/
│   ├── App.vue
│   ├── main.ts
│   ├── index.html
│   └── vite.config.ts
├── dist/           # Built files
├── vite.config.ts  # Main build configuration
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

### Available Scripts

#### Building

To build the package:

```bash
npm run build
```

This runs TypeScript type checking and builds the package in both ES and UMD formats.

#### Development

To develop with the demo application:

```bash
npm run dev
```

This starts the Vite dev server with the demo application.

#### Preview

To preview the production build:

```bash
npm run preview
```

#### Type Checking

To run TypeScript type checking without building:

```bash
npm run type-check
```

#### Testing

Run the test suite:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests once (CI mode):

```bash
npm run test:run
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Testing

The project includes comprehensive tests using Vitest:
- Component rendering tests
- Event emission tests
- Prop validation tests
- State management tests
- Star generation verification tests

Test files are located in `src/components/__tests__/` and `src/__tests__/`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your changes include:
- TypeScript type definitions
- Tests for new functionality
- Updated documentation if needed

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vue 3](https://vuejs.org/)
- TypeScript support powered by [vue-tsc](https://github.com/johnsoncodehk/vue-tsc)
- Bundled with [Vite](https://vitejs.dev/)
- Testing powered by [Vitest](https://vitest.dev/)
- Package inspired by [this Codepen](https://codepen.io/jo_Geek/pen/EOKvLE)

## 📧 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/russellio/vue-background-stars/issues) on GitHub.

---

Made with ❤️ by [Jon Russell](https://github.com/russellio)
