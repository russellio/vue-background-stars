# Vue Background Stars

An animated starfield background component for Vue 3. It is intended for projects that need a lightweight, configurable night-sky effect without bringing in a canvas renderer or animation dependency.

[![npm version](https://img.shields.io/npm/v/@russellio/vue-background-stars)](https://www.npmjs.com/package/@russellio/vue-background-stars) [![npm downloads](https://img.shields.io/npm/dm/@russellio/vue-background-stars)](https://www.npmjs.com/package/@russellio/vue-background-stars) [![CI](https://github.com/russellio/vue-background-stars/actions/workflows/ci.yml/badge.svg)](https://github.com/russellio/vue-background-stars/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![Vue.js](https://img.shields.io/badge/Vue_3-%2335495e.svg?style=flat&logo=vuedotjs&logoColor=%234FC08D) [![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

[Live demo](https://russellio.github.io/vue-background-stars/)

## Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Styling](#styling)
- [Browser Support](#browser-support)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- Vue 3 component with TypeScript definitions
- Configurable star count, density, color palette, and animation speed
- Per-layer weights to tune or remove individual star types
- Respects `prefers-reduced-motion`; animations can also be disabled with a prop
- Generates the star layers on mount with `requestAnimationFrame`
- Includes an optional `ToggleSwitch` component for simple visibility controls
- Ships ESM, UMD, CSS, and declaration files
- No runtime dependencies beyond Vue

## Installation

```bash
npm install @russellio/vue-background-stars
```

```bash
yarn add @russellio/vue-background-stars
```

```bash
pnpm add @russellio/vue-background-stars
```

## Usage

Import the component and stylesheet where you need the background.

```vue
<script setup lang="ts">
import { BackgroundStars } from '@russellio/vue-background-stars';
import '@russellio/vue-background-stars/style.css';
</script>

<template>
  <BackgroundStars />
</template>
```

The component renders as a fixed background with `z-index: -1`, so your page content should establish its own stacking context when needed.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { BackgroundStars, ToggleSwitch } from '@russellio/vue-background-stars';
import '@russellio/vue-background-stars/style.css';

const showStars = ref(true);
</script>

<template>
  <main class="page">
    <ToggleSwitch v-model="showStars" label="Starfield" />
    <BackgroundStars v-if="showStars" />

    <section class="content">
      <h1>Launch Console</h1>
    </section>
  </main>
</template>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  color: white;
}
</style>
```

### Plugin Install

You can register both components globally with the default plugin export.

```ts
import { createApp } from 'vue';
import VueBackgroundStars from '@russellio/vue-background-stars';
import '@russellio/vue-background-stars/style.css';
import App from './App.vue';

const app = createApp(App);

app.use(VueBackgroundStars);
app.mount('#app');
```

```vue
<template>
  <BackgroundStars />
  <ToggleSwitch v-model="showStars" label="Starfield" />
</template>
```

## API

### `BackgroundStars`

Renders the animated starfield. The component builds several `box-shadow` based layers from a single coordinate space, which keeps the DOM small while still allowing dense star patterns.

#### Props

| Prop               | Type                              | Default                    | Description                                                                              |
| ------------------ | --------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `starCount`        | `number`                          | `1000`                     | Base star count used to generate the layer sizes.                                        |
| `palette`          | `readonly string[]`               | built-in night-sky palette | Colors used for the nebula glow layers.                                                  |
| `density`          | `'sparse' \| 'normal' \| 'dense'` | `'normal'`                 | Multiplies the generated count by `0.4`, `0.8`, or `2`.                                  |
| `speed`            | `number`                          | `0.8`                      | Animation duration multiplier. Values above `1` are slower; values below `1` are faster. |
| `disableAnimation` | `boolean`                         | `false`                    | Disables blinking animations, independent of reduced-motion settings.                    |
| `layerWeights`     | `LayerWeights`                    | `{}`                       | Per-layer count multipliers. Omitted layers default to `1`; `0` omits the layer.         |

##### `layerWeights`

Scales the number of stars generated for each layer independently. Valid layer names are exported as `LAYER_NAMES`:

`tiny`, `small`, `med`, `large`, `bright`, `nebula`, `nebulaAux`

Each value multiplies that layer's share of `starCount`. A weight of `0` removes the layer entirely — no element is rendered and no animation runs for it. Negative values are clamped to `0`.

```vue
<script setup lang="ts">
import { BackgroundStars, type LayerWeights } from '@russellio/vue-background-stars';

// Plain starfield: no colored nebula glow at all.
const weights: LayerWeights = { nebula: 0, nebulaAux: 0 };
</script>

<template>
  <BackgroundStars :layer-weights="weights" />
</template>
```

Like `starCount` and `density`, `layerWeights` is read once when the layers are generated on mount. Changing it on a mounted component has no effect — bind a `key` that includes the weights to regenerate:

```vue
<BackgroundStars :key="JSON.stringify(weights)" :layer-weights="weights" />
```

#### Events

| Event              | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `background-ready` | Emitted after the star layers are generated on the first animation frame. |

```vue
<BackgroundStars @background-ready="handleBackgroundReady" />
```

#### Examples

```vue
<template>
  <!-- Fewer stars -->
  <BackgroundStars :star-count="500" density="sparse" />

  <!-- More stars, slower blink animation -->
  <BackgroundStars density="dense" :speed="2" />

  <!-- Static background -->
  <BackgroundStars disable-animation />

  <!-- Custom nebula colors -->
  <BackgroundStars :palette="['#07121f', '#1d4ed8', '#38bdf8', '#f8fafc']" />

  <!-- Subtler nebula, no secondary glow band -->
  <BackgroundStars :layer-weights="{ nebula: 0.5, nebulaAux: 0 }" />

  <!-- Only the faint pinpoint stars -->
  <BackgroundStars :layer-weights="{ bright: 0, nebula: 0, nebulaAux: 0 }" />
</template>
```

### `ToggleSwitch`

A small controlled switch component. It uses `v-model` and emits the standard `update:modelValue` event.

#### Props

| Prop         | Type      | Default | Description                                              |
| ------------ | --------- | ------- | -------------------------------------------------------- |
| `modelValue` | `boolean` | `false` | Current switch state.                                    |
| `label`      | `string`  | `''`    | Optional visible label.                                  |
| `showIcon`   | `boolean` | `true`  | Shows the decorative star icon on desktop-sized screens. |

#### Events

| Event               | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `update:modelValue` | Emitted with the next boolean state when the switch changes. |

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ToggleSwitch } from '@russellio/vue-background-stars';

const enabled = ref(false);
</script>

<template>
  <ToggleSwitch v-model="enabled" label="Enable stars" />
</template>
```

## Styling

Importing `@russellio/vue-background-stars/style.css` is required. The components include their base styles, but you can still override global selectors or set the toggle CSS variables from a wrapper.

```css
.my-page {
  --toggle-track-bg: #1f2937;
  --toggle-track-bg-active: #38bdf8;
  --toggle-thumb-bg: #f8fafc;
  --toggle-focus-ring: rgba(56, 189, 248, 0.45);
}
```

| Variable                   | Default   | Used by                |
| -------------------------- | --------- | ---------------------- |
| `--toggle-track-bg`        | `#d1d5db` | Toggle track when off  |
| `--toggle-track-bg-active` | `#3b82f6` | Toggle track when on   |
| `--toggle-thumb-bg`        | `#ffffff` | Toggle thumb           |
| `--toggle-focus-ring`      | `#3b82f6` | Keyboard focus outline |

For background-specific changes, override the generated classes from your app stylesheet.

```css
.sky {
  background: radial-gradient(at 50% 35%, #0f172a 0, transparent 55%), #020617;
}

.star-small,
.star-med,
.star-large,
.star-bright {
  opacity: 0.7;
}
```

The nebula glow is rendered as a set of heavily blurred `box-shadow` stamps that overlap into a
diffuse band. As of `1.3.1` the blur radius is large enough that adjacent glows merge; previously
they rendered as discrete orbs. Adjust the density of the band with `layerWeights`, and its
intensity from your stylesheet:

```css
.nebula-layer {
  opacity: 0.3; /* default: 0.55 */
}
```

## Browser Support

The package targets modern browsers that support Vue 3, CSS animations, and standard ES module output. It is tested against the current versions of Chrome, Firefox, Safari, and Edge.

## Development

Install dependencies:

```bash
npm install
```

Run the demo app:

```bash
npm run dev
```

Build the package:

```bash
npm run build
```

Run checks:

```bash
npm run type-check
npm run test:run
npm run lint
npm run format:check
```

Common scripts:

| Script                  | Description                               |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Starts the Vite demo app.                 |
| `npm run build`         | Type-checks and builds the package.       |
| `npm run preview`       | Serves the production demo build locally. |
| `npm run type-check`    | Runs `vue-tsc --noEmit`.                  |
| `npm test`              | Starts Vitest in watch mode.              |
| `npm run test:run`      | Runs Vitest once.                         |
| `npm run test:coverage` | Runs Vitest with coverage.                |
| `npm run lint`          | Runs ESLint over `src/`.                  |

Build output is written to `dist/` and includes:

- `vue-background-stars.es.js`
- `vue-background-stars.umd.js`
- `vue-background-stars.css`
- `vue-background-stars.es.d.ts`

## Contributing

Issues and pull requests are welcome. For larger changes, open an issue first so the API or implementation direction can be discussed before code is written.

Before opening a pull request, please run the type check, tests, linting, and formatting check listed above. Updates that change runtime behavior should include tests and README updates where appropriate.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution guide.

## License

MIT. See [LICENSE](LICENSE) for details.

## Credits

Built with [Vue](https://vuejs.org/), [Vite](https://vite.dev/), and [Vitest](https://vitest.dev/). Inspired by [this CodePen](https://codepen.io/jo_Geek/pen/EOKvLE).
