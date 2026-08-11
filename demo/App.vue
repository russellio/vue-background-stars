<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, shallowRef, ref } from 'vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';
import { LAYER_NAMES, type LayerName } from '@/config';
import DemoControls, { type DemoSettings } from './components/DemoControls.vue';

const BackgroundStars = defineAsyncComponent(() => import('@/components/BackgroundStars.vue'));
const showStars = shallowRef(true);

const demoControls = ref<InstanceType<typeof DemoControls> | null>(null);
const hasAutoOpened = shallowRef(false);

function onBackgroundReady() {
  if (!hasAutoOpened.value) {
    hasAutoOpened.value = true;
    demoControls.value?.open();
  }
}

const settings = reactive<DemoSettings>({
  starCount: 1000,
  density: 'normal',
  palette: ['#280F36', '#632B6C', '#BE6590', '#FFC1A0', '#FE9C7F'],
  speed: 0.8,
  disableAnimation: false,
  layerWeights: Object.fromEntries(LAYER_NAMES.map((n) => [n, 1])) as Record<LayerName, number>,
});

function onSettingsUpdate(next: DemoSettings) {
  Object.assign(settings, next);
}

/**
 * Layers are generated once in onMounted, so any setting that feeds buildLayers()
 * has to participate in the component key to take effect.
 */
const remountKey = computed(
  () =>
    `${settings.starCount}-${settings.density}-${LAYER_NAMES.map((n) => settings.layerWeights[n]).join(',')}`
);

const features = [
  'Vue 3 component with TypeScript definitions',
  'Configurable star count, density, color palette, and animation speed',
  'Per-layer weights to tune or remove individual star types',
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
    <Transition name="background-fade" appear>
      <BackgroundStars
        v-if="showStars"
        :key="remountKey"
        :starCount="settings.starCount"
        :density="settings.density"
        :palette="settings.palette"
        :speed="settings.speed"
        :disableAnimation="settings.disableAnimation"
        :layerWeights="settings.layerWeights"
        @background-ready="onBackgroundReady"
      />
    </Transition>

    <div class="demo-header">
      <h1 class="demo-title">Vue Background Stars</h1>
      <p class="demo-subtitle">
        A lightweight animated starfield background component for Vue 3 applications
      </p>

      <div class="demo-toggle">
        <ToggleSwitch label="Starfield" v-model="showStars" :showIcon="false" />
      </div>

      <DemoControls ref="demoControls" :settings="settings" @update:settings="onSettingsUpdate" />
    </div>

    <div class="demo-content">
      <div class="demo-section">
        <h2>Features</h2>
        <ul class="demo-features">
          <li v-for="feature in features" :key="feature">{{ feature }}</li>
        </ul>
      </div>

      <div class="demo-section">
        <h2>Customization</h2>
        <p>
          Use props such as <code>starCount</code>, <code>density</code>, <code>speed</code>,
          <code>palette</code>, <code>layerWeights</code>, and <code>disableAnimation</code> to tune
          the generated starfield.
        </p>

        <p>
          <code>layerWeights</code> scales each star type independently — set a layer to
          <code>0</code> to remove it entirely. Drop the nebula weights to zero for a plain pinpoint
          starfield with no colored glow.
        </p>

        <p>
          Click the
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="margin: 0 0.4rem"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
            />
          </svg>
          icon to adjust these properties and see the change in real time.
        </p>
        <p>
          The included <code>ToggleSwitch</code> is optional. It is useful for demos, setting
          panels, but <code>BackgroundStars</code> can be used on its own.
        </p>

        <p>
          Toggle the switch at the top right to enable and disable the starfield. Use it to compare
          the starfield with the fallback background.
        </p>
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

      <div class="demo-footer">
        <p>
          Built by <a href="https://jonrussell.dev">russellio</a> with
          <a href="https://vuejs.org">Vue 3</a> and
          <a href="https://www.typescriptlang.org">TypeScript</a>.
        </p>
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
