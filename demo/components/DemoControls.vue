<script setup lang="ts">
import { computed, ref } from 'vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';
import { LAYER_NAMES, type LayerName } from '@/config';
import { PALETTES, type PaletteName } from '../composables/usePalettes';

export interface DemoSettings {
  starCount: number;
  density: 'sparse' | 'normal' | 'dense';
  palette: string[];
  speed: number;
  disableAnimation: boolean;
  layerWeights: Record<LayerName, number>;
}

/** Human-readable slider labels for each generated layer. */
const LAYER_LABELS: Record<LayerName, string> = {
  tiny: 'Tiny',
  small: 'Small',
  med: 'Medium',
  large: 'Large',
  bright: 'Bright',
  nebula: 'Nebula',
  nebulaAux: 'Nebula aux',
};

const props = defineProps<{ settings: DemoSettings }>();
const emit = defineEmits<{ 'update:settings': [s: DemoSettings] }>();

const isOpen = ref(false);

defineExpose({
  open: () => {
    isOpen.value = true;
  },
});

function update<K extends keyof DemoSettings>(key: K, value: DemoSettings[K]) {
  emit('update:settings', { ...props.settings, [key]: value });
}

const animationDisabled = computed({
  get: () => props.settings.disableAnimation,
  set: (val) => update('disableAnimation', val),
});

const selectedPreset = computed<PaletteName | 'custom'>(() => {
  const current = JSON.stringify(props.settings.palette);
  const match = (Object.keys(PALETTES) as PaletteName[]).find(
    (k) => JSON.stringify(PALETTES[k]) === current
  );
  return match ?? 'custom';
});

function selectPreset(name: PaletteName) {
  update('palette', [...PALETTES[name]]);
}

function updateColor(index: number, color: string) {
  const palette = [...props.settings.palette];
  palette[index] = color;
  update('palette', palette);
}

function updateWeight(layer: LayerName, weight: number) {
  update('layerWeights', { ...props.settings.layerWeights, [layer]: weight });
}

function formatWeight(weight: number): string {
  return weight === 0 ? 'off' : `${weight.toFixed(1)}×`;
}

function resetWeights() {
  update(
    'layerWeights',
    Object.fromEntries(LAYER_NAMES.map((n) => [n, 1])) as Record<LayerName, number>
  );
}

const hasCustomWeights = computed(() =>
  LAYER_NAMES.some((n) => props.settings.layerWeights[n] !== 1)
);
</script>

<template>
  <div class="demo-controls">
    <button class="controls-toggle" :class="{ 'is-open': isOpen }" @click="isOpen = !isOpen"
      :title="isOpen ? 'Close controls' : 'Open demo controls'" aria-label="Toggle demo controls">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal">
        <path d="M10 5H3" />
        <path d="M12 19H3" />
        <path d="M14 3v4" />
        <path d="M16 17v4" />
        <path d="M21 12h-9" />
        <path d="M21 19h-5" />
        <path d="M21 5h-7" />
        <path d="M8 10v4" />
        <path d="M8 12H3" />
      </svg>
    </button>

    <Transition name="panel">
      <div v-if="isOpen" class="controls-panel">
        <div class="panel-header">Demo Controls</div>

        <section class="panel-section">
          <h4>Generation</h4>
          <div class="control-row">
            <label>Stars <span class="value">{{ settings.starCount }}</span></label>
            <input type="range" min="200" max="2500" step="100" :value="settings.starCount"
              @input="update('starCount', +($event.target as HTMLInputElement).value)" />
          </div>
          <div class="control-row">
            <label>Density</label>
            <div class="segmented">
              <button v-for="d in ['sparse', 'normal', 'dense'] as const" :key="d"
                :class="{ active: settings.density === d }" @click="update('density', d)">
                {{ d }}
              </button>
            </div>
          </div>
        </section>

        <section class="panel-section">
          <h4>
            Layers
            <button v-if="hasCustomWeights" class="section-reset" @click="resetWeights">
              reset
            </button>
          </h4>
          <div v-for="layer in LAYER_NAMES" :key="layer" class="control-row">
            <label>{{ LAYER_LABELS[layer] }}
              <span class="value" :class="{ 'is-off': settings.layerWeights[layer] === 0 }">{{
                formatWeight(settings.layerWeights[layer])
                }}</span></label>
            <input type="range" min="0" max="2" step="0.1" :value="settings.layerWeights[layer]"
              @input="updateWeight(layer, +($event.target as HTMLInputElement).value)" />
          </div>
        </section>

        <section class="panel-section">
          <h4>Animation</h4>
          <div class="control-row">
            <label>Speed <span class="value">{{ settings.speed.toFixed(1) }}×</span></label>
            <input type="range" min="0.1" max="3.0" step="0.1" :value="settings.speed"
              @input="update('speed', +($event.target as HTMLInputElement).value)" />
          </div>
          <div class="control-row control-row--inline">
            <label>Disable animation</label>
            <ToggleSwitch v-model="animationDisabled" :showIcon="false" />
          </div>
        </section>

        <section class="panel-section">
          <h4>Palette</h4>
          <div class="preset-chips">
            <button v-for="name in Object.keys(PALETTES) as PaletteName[]" :key="name"
              :class="{ active: selectedPreset === name }" @click="selectPreset(name)">
              {{ name }}
            </button>
          </div>
          <div class="swatch-inputs">
            <input v-for="(color, i) in settings.palette" :key="i" type="color" :value="color"
              @input="updateColor(i, ($event.target as HTMLInputElement).value)" />
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.demo-controls {
  position: fixed;
  top: 5rem;
  right: 2%;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  /* Bound the column to the viewport so the panel below can shrink into it. */
  max-height: calc(100vh - 6rem);
}

.controls-toggle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    transform 0.3s;
  flex-shrink: 0;
}

.controls-toggle:hover {
  background: rgba(255, 255, 255, 0.12);
}

.controls-toggle.is-open {
  border: 2px solid #fff;
}

.controls-panel {
  width: 300px;
  background: rgba(4, 6, 20, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: white;
  /*
   * The Layers section makes the panel taller than the viewport on short screens.
   * min-height:0 lets it shrink below its content size inside the flex column,
   * so it fills whatever space the toggle button leaves rather than overrunning.
   */
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.panel-header {
  padding: 0.625rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.5;
}

.panel-section {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.panel-section:last-child {
  border-bottom: none;
}

.panel-section h4 {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.4;
  margin-bottom: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-reset {
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.section-reset:hover {
  color: #be6590;
}

.control-row {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.625rem;
}

.control-row:last-child {
  margin-bottom: 0;
}

.control-row--inline {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.control-row label {
  font-size: 0.8rem;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-row--inline label {
  display: block;
}

.value {
  opacity: 0.45;
  font-variant-numeric: tabular-nums;
  font-size: 0.75rem;
}

.value.is-off {
  opacity: 0.7;
  color: #be6590;
}

input[type='range'] {
  width: 100%;
  accent-color: #be6590;
  cursor: pointer;
  height: 4px;
}

.segmented {
  display: flex;
  gap: 0.25rem;
}

.segmented button {
  flex: 1;
  padding: 0.3rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  text-transform: capitalize;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s;
}

.segmented button:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.segmented button.active {
  background: rgba(190, 101, 144, 0.3);
  border-color: rgba(190, 101, 144, 0.7);
  color: white;
}

.preset-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.preset-chips button {
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.75rem;
  text-transform: capitalize;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s;
}

.preset-chips button:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.preset-chips button.active {
  background: rgba(190, 101, 144, 0.3);
  border-color: rgba(190, 101, 144, 0.7);
  color: white;
}

.swatch-inputs {
  display: flex;
  gap: 0.5rem;
}

.swatch-inputs input[type='color'] {
  width: 36px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  background: none;
  cursor: pointer;
  padding: 2px;
}

.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.97);
}

@media (max-width: 1024px) {
  .demo-controls {
    bottom: 1rem;
    right: 1rem;
  }

  .controls-panel {
    width: 270px;
  }
}
</style>
