<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from 'vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';

const BackgroundStars = defineAsyncComponent(() => import('@/components/BackgroundStars.vue'));
const showStars = shallowRef(true);

const features = [
  'Vue 3 component with TypeScript definitions',
  'Configurable star count, density, color palette, and animation speed',
  'Box-shadow based star layers generated on the first animation frame',
  'Respects reduced-motion preferences and supports disabling animation',
  'No runtime dependencies beyond Vue',
  'Optional toggle switch component included',
];

const installCommand = 'npm install @russellio/vue-background-stars';

const importExample = `import { BackgroundStars, ToggleSwitch } from '@russellio/vue-background-stars';
import '@russellio/vue-background-stars/style.css';`;

const usageExample = `<script setup lang="ts">
import { shallowRef } from 'vue';
import { BackgroundStars, ToggleSwitch } from '@russellio/vue-background-stars';

const showStars = shallowRef(true);
<${'/script'}>

<template>
  <ToggleSwitch v-model="showStars" label="Starfield" />
  <BackgroundStars v-if="showStars" />
</template>`;
</script>

<template>
  <div class="default-background" :class="{ 'fade-out': showStars }"></div>

  <div class="demo-container">
    <div class="demo-header">
      <ToggleSwitch label="Starfield" v-model="showStars" :showIcon="false" />
    </div>

    <Transition name="background-fade" appear>
      <BackgroundStars v-if="showStars" />
    </Transition>

    <div class="demo-content">
      <h1 class="demo-title">Vue Background Stars</h1>
      <p class="demo-subtitle">
        A lightweight animated starfield background component for Vue 3 applications.
      </p>

      <div class="demo-section">
        <h2>Features</h2>
        <ul class="demo-features">
          <li v-for="feature in features" :key="feature">{{ feature }}</li>
        </ul>
      </div>

      <div class="demo-section">
        <h2>Installation</h2>
        <p>Install the package from npm:</p>
        <div class="demo-code">
          <code>{{ installCommand }}</code>
        </div>
      </div>

      <div class="demo-section">
        <h2>Quick Start</h2>
        <p>Import the components and stylesheet:</p>
        <pre class="demo-code"><code>{{ importExample }}</code></pre>
        <p>Render the background behind your page content:</p>
        <pre class="demo-code"><code>{{ usageExample }}</code></pre>
      </div>

      <div class="demo-section">
        <h2>Customization</h2>
        <p>
          Use props such as <code>starCount</code>, <code>density</code>, <code>speed</code>,
          <code>palette</code>, and <code>disableAnimation</code> to tune the generated starfield.
        </p>
        <p>
          The included <code>ToggleSwitch</code> is optional. It is useful for demos and settings
          panels, but <code>BackgroundStars</code> can be used on its own.
        </p>
      </div>

      <div class="demo-footer">
        <p>Built with Vue 3 and TypeScript.</p>
        <p>Use the switch above to compare the starfield with the fallback background.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.default-background {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: -2;
  background:
    radial-gradient(at 51% 46%, #041028 0, transparent 50%),
    radial-gradient(at 85% 99%, #330509 0, transparent 50%),
    radial-gradient(at 18% 22%, #111b4f 0, transparent 50%), #041028;
}

.background-fade-enter-active {
  transition: opacity 1.5s ease-in-out;
}

.background-fade-enter-from {
  opacity: 0;
}

.background-fade-enter-to {
  opacity: 1;
}
</style>
