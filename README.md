# Vue Background Stars

A beautiful animated starry night sky background component for Vue 3. Perfect for landing pages, portfolios, and space-themed applications.

![Vue Background Stars](https://img.shields.io/badge/Vue-3.x-green) ![License](https://img.shields.io/badge/license-MIT-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## ✨ Features

- 🌟 **Animated Twinkling Stars** - Realistic night sky with multiple star sizes and colors
- 🎨 **Beautiful Color Palette** - Gradient night sky with purple, pink, and orange hues
- ⚡ **Performance Optimized** - Uses DocumentFragment for efficient DOM manipulation
- 📦 **Zero Dependencies** - Only requires Vue 3 (no external dependencies)
- 🔧 **TypeScript Support** - Fully typed out of the box
- 🎛️ **Optional Toggle Control** - Includes a toggle switch component for on/off control
- 📱 **Fully Responsive** - Works seamlessly on all screen sizes
- 🎭 **Easy to Customize** - Well-structured components ready for customization

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

The main background component that renders the animated starry sky.

#### Props

None - The component works out of the box without any props.

#### Events

- `@background-ready` - Emitted when the background stars have finished generating

```vue
<BackgroundStars @background-ready="handleReady" />
```

#### Styling

The component uses scoped styles and will render behind your content (z-index: -1). You can customize the appearance by overriding CSS variables or targeting the component's classes in your global stylesheet.

### ToggleSwitch Component

A toggle switch component for controlling the background visibility.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | The current toggle state (v-model) |
| `label` | `string` | `''` | Optional label text to display next to the switch |
| `showIcon` | `boolean` | `true` | Whether to show the star icon (hidden on mobile by default) |

#### Events

- `@update:modelValue` - Emitted when the toggle state changes

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
```

### Custom Star Count

The component generates a fixed number of stars. To customize the star count, you would need to fork the component and modify the `generateStars()` function in `BackgroundStars.vue`.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires browsers with support for:
- CSS animations
- ES6+
- Vue 3

## 📝 Development

### Project Structure

```
VueBackgroundStars/
├── src/
│   ├── components/
│   │   ├── BackgroundStars.vue
│   │   └── ToggleSwitch.vue
│   └── index.ts
├── demo/
│   ├── App.vue
│   ├── main.ts
│   └── ...
├── dist/           # Built files
└── package.json
```

### Building

To build the package:

```bash
npm run build
```

To develop with the demo:

```bash
cd demo
npm install
npm run dev
```

### Type Checking

```bash
npm run type-check
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vue 3](https://vuejs.org/)
- TypeScript support powered by [vue-tsc](https://github.com/johnsoncodehk/vue-tsc)
- Bundled with [Vite](https://vitejs.dev/)
- Package inspired by [this Codepen](https://codepen.io/jo_Geek/pen/EOKvLE)

## 📧 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/russellio/vue-background-stars/issues) on GitHub.

---

Made with ❤️ by [Jon Russell](https://github.com/russellio)

# VueBackgroundStars
