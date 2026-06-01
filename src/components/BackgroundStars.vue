<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';
import {
  BLINK_DURATIONS,
  BRIGHT_STAR_GLOW,
  DENSITY_SCALE,
  NEBULA_FRACTIONS,
  NEBULA_GLOW,
  NEBULA_MAX_Y,
  STAR_FIELD_SIZE,
  STAR_LAYER_FRACTIONS,
} from '../config';

defineOptions({ name: 'BackgroundStars' });

interface Props {
  /** Total number of base stars to generate. Default: 1000. */
  starCount?: number;
  /** Color palette for the nebula glow layers. Default: built-in night-sky palette. */
  palette?: readonly string[];
  /** Scales the star count up or down. Default: 'normal'. */
  density?: 'sparse' | 'normal' | 'dense';
  /**
   * Multiplier applied to every animation duration.
   * 1 = default speed; >1 = slower (longer duration); <1 = faster (shorter duration).
   */
  speed?: number;
  /** When true, suppresses the blink animation regardless of prefers-reduced-motion. */
  disableAnimation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  starCount: 1000,
  palette: () => ['#280F36', '#632B6C', '#BE6590', '#FFC1A0', '#FE9C7F'],
  density: 'normal',
  speed: 1,
  disableAnimation: false,
});

const emit = defineEmits<{ 'background-ready': [] }>();

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

/** Build a box-shadow string that positions `count` stars of the given color. */
function makeStarShadow(count: number, color: string, blur = 0, spread = 0): string {
  return Array.from({ length: count }, () => {
    const x = randomInt(0, STAR_FIELD_SIZE);
    const y = randomInt(0, STAR_FIELD_SIZE);
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }).join(', ');
}

/** Build a box-shadow string that positions `count` colored nebula glows. */
function makeNebulaShadow(count: number, pal: readonly string[], maxY: number): string {
  return Array.from({ length: count }, () => {
    const color = pal[randomInt(0, pal.length)];
    const x = randomInt(0, STAR_FIELD_SIZE);
    const y = randomInt(0, maxY);
    return `${x}px ${y}px ${NEBULA_GLOW.blur}px ${NEBULA_GLOW.spread}px ${color}`;
  }).join(', ');
}

interface StarLayers {
  tiny: string;
  small: string;
  med: string;
  large: string;
  bright: string;
  nebula: string;
  nebulaAux: string;
}

/** Populated on mount (client-only). null during SSR / before first RAF. */
const layers = shallowRef<StarLayers | null>(null);
let rafId: number;

function buildLayers(): StarLayers {
  const s = DENSITY_SCALE[props.density];
  const n = props.starCount;
  const pal = props.palette;
  const count = (frac: number) => Math.max(1, Math.floor(n * frac * s));
  const { blur: gb, spread: gs } = BRIGHT_STAR_GLOW;

  return {
    tiny: makeStarShadow(count(STAR_LAYER_FRACTIONS.tiny), '#fff'),
    small: makeStarShadow(count(STAR_LAYER_FRACTIONS.small), '#fff'),
    med: makeStarShadow(count(STAR_LAYER_FRACTIONS.med), '#fff'),
    large: makeStarShadow(count(STAR_LAYER_FRACTIONS.large), '#fff'),
    bright: makeStarShadow(count(STAR_LAYER_FRACTIONS.bright), 'rgba(255,255,255,0.85)', gb, gs),
    nebula: makeNebulaShadow(count(NEBULA_FRACTIONS.main), pal, NEBULA_MAX_Y.main),
    nebulaAux: makeNebulaShadow(count(NEBULA_FRACTIONS.aux), pal, NEBULA_MAX_Y.aux),
  };
}

onMounted(() => {
  rafId = requestAnimationFrame(() => {
    layers.value = buildLayers();
    emit('background-ready');
  });
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  layers.value = null;
});
</script>

<template>
  <div class="sky">
    <div class="sky-base"></div>
    <template v-if="layers">
      <!-- Tiny white stars — no animation, densest layer -->
      <div class="star-layer star-tiny" :style="{ boxShadow: layers.tiny }" />
      <!-- Larger layers blink unless disableAnimation or prefers-reduced-motion -->
      <div
        class="star-layer star-small"
        :class="{ blink: !disableAnimation }"
        :style="{ boxShadow: layers.small, animationDuration: `${BLINK_DURATIONS.small * speed}s` }"
      />
      <div
        class="star-layer star-med"
        :class="{ blink: !disableAnimation }"
        :style="{ boxShadow: layers.med, animationDuration: `${BLINK_DURATIONS.med * speed}s` }"
      />
      <div
        class="star-layer star-large"
        :class="{ blink: !disableAnimation }"
        :style="{ boxShadow: layers.large, animationDuration: `${BLINK_DURATIONS.large * speed}s` }"
      />
      <div
        class="star-layer star-bright"
        :class="{ blink: !disableAnimation }"
        :style="{
          boxShadow: layers.bright,
          animationDuration: `${BLINK_DURATIONS.bright * speed}s`,
        }"
      />
      <!-- Colored nebula glow layers — rotated to form a diagonal band -->
      <div class="nebula-layer" :style="{ boxShadow: layers.nebula }" />
      <div class="nebula-layer nebula-layer-aux" :style="{ boxShadow: layers.nebulaAux }" />
    </template>
  </div>
</template>

<style>
.sky {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: -1;
  background:
    radial-gradient(at 51% 46%, #041028 0, transparent 50%),
    radial-gradient(at 85% 99%, #330509 0, transparent 50%),
    radial-gradient(at 18% 22%, #111b4f 0, transparent 50%), #041028;
}

.sky-base {
  background: linear-gradient(to bottom, rgba(55, 5, 105, 0) 0%, rgba(9, 0, 22, 1) 100%);
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  z-index: 3;
}

/* Single-pixel "stamp" element — all visual comes from box-shadow offsets. */
.star-layer {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: transparent;
}

.star-tiny {
  width: 0.5px;
  height: 0.5px;
  opacity: 0.8;
}
.star-small {
  width: 1px;
  height: 1px;
  opacity: 0.8;
}
.star-med {
  width: 1.5px;
  height: 1.5px;
  opacity: 0.85;
}
.star-large {
  width: 2px;
  height: 2px;
  opacity: 0.9;
}
.star-bright {
  width: 2.5px;
  height: 2.5px;
  opacity: 0.9;
}

.blink {
  animation: blink ease-in-out infinite alternate;
}

/* Stagger blink start so layers don't all pulse together. */
.star-med.blink {
  animation-delay: -0.5s;
}
.star-large.blink {
  animation-delay: -1s;
}
.star-bright.blink {
  animation-delay: -2s;
}

@keyframes blink {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0.2;
  }
}

/* Nebula layers: 1px stamps whose box-shadow places colored glows diagonally. */
.nebula-layer {
  position: absolute;
  top: 10vh;
  left: 0;
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background-color: transparent;
  transform: rotate(20deg);
  transform-origin: top left;
}

.nebula-layer-aux {
  top: 0;
  left: 10vw;
}

@media (prefers-reduced-motion: reduce) {
  .blink {
    animation: none !important;
  }
}
</style>
