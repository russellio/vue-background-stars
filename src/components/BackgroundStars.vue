<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

interface Props {
  /** Total number of base stars to generate. Default: 1000. */
  starCount?: number;
  /** Color palette for the cross/aux star layers. Default: built-in night-sky palette. */
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

const emit = defineEmits<{
  'background-ready': [];
}>();

const starsContainer = ref<HTMLElement>();
const starsCrossContainer = ref<HTMLElement>();
const starsCrossAuxContainer = ref<HTMLElement>();

// Returns integer in [min, max) — max is exclusive.
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createStarElement(
  starClass: string,
  top: number,
  left: number,
  duration: number,
  color?: string,
  shadow?: string
): HTMLElement {
  const star = document.createElement('div');
  star.className = `star ${starClass}`;
  star.style.top = `${top}vh`;
  star.style.left = `${left}vw`;
  star.style.animationDuration = `${duration}s`;
  if (color) star.style.backgroundColor = color;
  if (shadow) star.style.boxShadow = `0px 0 6px 1px ${shadow}`;
  return star;
}

function createBlurElement(top: number, left: number, color: string): HTMLElement {
  const blur = document.createElement('div');
  blur.className = 'blur';
  blur.style.top = `${top}%`;
  blur.style.left = `${left}%`;
  blur.style.backgroundColor = color;
  return blur;
}

function createStarWithPercentage(
  starClass: string,
  top: number,
  left: number,
  duration: number,
  color: string,
  shadow: string
): HTMLElement {
  const star = document.createElement('div');
  star.className = `star ${starClass}`;
  star.style.top = `${top}%`;
  star.style.left = `${left}%`;
  star.style.animationDuration = `${duration}s`;
  star.style.backgroundColor = color;
  star.style.boxShadow = `0px 0 6px 1px ${shadow}`;
  return star;
}

function createStar2WithPercentage(
  top: number,
  left: number,
  duration: number,
  color: string,
  shadow: string
): HTMLElement {
  const star = document.createElement('div');
  star.className = 'star star-2';
  star.style.top = `${top}%`;
  star.style.left = `${left}%`;
  star.style.animationDuration = `${duration}s`;
  star.style.backgroundColor = color;
  star.style.boxShadow = `0px 0 10px 1px ${shadow}`;
  star.style.opacity = '0.7';
  return star;
}

function generateStars() {
  if (!starsContainer.value || !starsCrossContainer.value || !starsCrossAuxContainer.value) {
    return;
  }

  const densityMultipliers = { sparse: 0.5, normal: 1, dense: 2 } as const;
  const scale = densityMultipliers[props.density];
  const mainLoops = Math.max(1, Math.floor((props.starCount / 4) * scale));
  const crossLoops = Math.max(1, Math.floor(props.starCount * 0.15 * scale));
  const auxLoops = Math.max(1, Math.floor(props.starCount * 0.05 * scale));
  const spd = props.speed;
  const blink = props.disableAnimation ? '' : ' blink';
  const pal = props.palette;

  const starsFragment = document.createDocumentFragment();
  const crossFragment = document.createDocumentFragment();
  const auxFragment = document.createDocumentFragment();

  // Generate basic stars in batches to avoid blocking
  for (let i = 0; i < mainLoops; i++) {
    starsFragment.appendChild(
      createStarElement('star-0', randomInt(0, 100), randomInt(0, 100), randomInt(1, 2) * spd)
    );
    starsFragment.appendChild(
      createStarElement(
        `star-1${blink}`,
        randomInt(0, 100),
        randomInt(0, 100),
        randomInt(2, 5) * spd
      )
    );
    starsFragment.appendChild(
      createStarElement(
        `star-2${blink}`,
        randomInt(0, 100),
        randomInt(0, 100),
        randomInt(1, 4) * spd
      )
    );
    starsFragment.appendChild(
      createStarElement(
        `star-3${blink}`,
        randomInt(0, 70),
        randomInt(0, 100),
        randomInt(5, 7) * spd
      )
    );
  }

  // Generate cross stars
  for (let i = 0; i < crossLoops; i++) {
    starsFragment.appendChild(
      createStarElement(
        `star-4${blink}`,
        randomInt(0, 100),
        randomInt(0, 100),
        randomInt(5, 7) * spd
      )
    );

    const color = pal[randomInt(0, pal.length)];
    crossFragment.appendChild(createBlurElement(randomInt(0, 100), randomInt(0, 100), color));
    crossFragment.appendChild(
      createStarWithPercentage(
        `star-1${blink}`,
        randomInt(0, 100),
        randomInt(0, 100),
        randomInt(6, 12) * spd,
        color,
        color
      )
    );
  }

  // Generate auxiliary cross stars
  for (let i = 0; i < auxLoops; i++) {
    if (i % 2 === 0) {
      const color = pal[randomInt(0, pal.length)];
      starsFragment.appendChild(
        createStarElement(
          'star-5',
          randomInt(0, 50),
          randomInt(0, 100),
          randomInt(5, 7) * spd,
          color
        )
      );
    }

    const color = pal[randomInt(0, pal.length)];
    auxFragment.appendChild(createBlurElement(randomInt(0, 100), randomInt(0, 100), color));
    auxFragment.appendChild(
      createStar2WithPercentage(
        randomInt(0, 100),
        randomInt(0, 100),
        randomInt(4, 10) * spd,
        color,
        color
      )
    );
  }

  starsContainer.value.appendChild(starsFragment);
  starsCrossContainer.value.appendChild(crossFragment);
  starsCrossAuxContainer.value.appendChild(auxFragment);
}

let rafId: number;

onMounted(() => {
  rafId = requestAnimationFrame(() => {
    generateStars();
    if (starsContainer.value) {
      emit('background-ready');
    }
  });
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
});
</script>

<template>
  <div class="sky">
    <div class="sky-base"></div>
    <div class="stars" ref="starsContainer"></div>
    <div class="stars-cross" ref="starsCrossContainer"></div>
    <div class="stars-cross-aux" ref="starsCrossAuxContainer"></div>
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
  transform: scale(1);
}

.sky-base {
  content: '';
  background: linear-gradient(to bottom, rgba(55, 5, 105, 0) 0%, rgba(9, 0, 22, 1) 100%);
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  z-index: 3;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: all 10s linear;
}

.star {
  position: absolute;
  border-radius: 50%;
  background-color: white;
  opacity: 0.8;
}

.blink {
  animation: blink ease-in-out infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.star-0 {
  height: 0.5px;
  width: 0.5px;
}

.star-1 {
  height: 1px;
  width: 1px;
}

.star-2 {
  height: 1.5px;
  width: 1.5px;
}

.star-3 {
  height: 2px;
  width: 2px;
}

.star-4 {
  height: 2.5px;
  width: 2.5px;
  box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.5);
}

.star-5 {
  height: 2.5px;
  width: 2.5px;
  box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.7);
}

.stars-cross {
  position: absolute;
  top: 10vh;
  left: 0;
  width: 120vw;
  height: 20vh;
  transform: rotate(20deg);
  transform-origin: top left;
}

.stars-cross-aux {
  position: absolute;
  top: 0vh;
  left: 10vw;
  width: 120vw;
  height: 10vh;
  transform: rotate(20deg);
  transform-origin: top left;
}

.stars-cross > .blur,
.stars-cross-aux > .blur {
  position: absolute;
  border-radius: 50%;
  background-color: white;
  opacity: 1;
  filter: blur(15px);
  width: 5px;
  height: 10px;
}

@media (prefers-reduced-motion: reduce) {
  .blink {
    animation: none !important;
  }
  .stars {
    transition: none !important;
  }
}
</style>
