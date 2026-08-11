/** Coordinate space for box-shadow star placement (px). Covers typical 4K displays. */
export const STAR_FIELD_SIZE = 2000;

/** Star count distribution across layers (fractions of starCount prop). */
export const STAR_LAYER_FRACTIONS = {
  tiny: 0.3,
  small: 0.3,
  med: 0.2,
  large: 0.1,
  bright: 0.15,
} as const;

/** Every generated layer, in render order. Single source of truth for layer identity. */
export const LAYER_NAMES = [
  'tiny',
  'small',
  'med',
  'large',
  'bright',
  'nebula',
  'nebulaAux',
] as const;

/** Name of a single generated layer. */
export type LayerName = (typeof LAYER_NAMES)[number];

/**
 * Per-layer count multipliers. Omitted layers default to `1`.
 * `0` omits the layer entirely; values are clamped to a minimum of `0`.
 */
export type LayerWeights = Partial<Record<LayerName, number>>;

/**
 * Nebula (colored glow) layer fractions and vertical extent.
 *
 * Tuned together with NEBULA_GLOW so adjacent glows overlap and merge into a
 * diffuse band. The merge condition is `blur + 2*spread >= sqrt(area / count)`;
 * raising the count without raising the blur produces discrete orbs instead.
 */
export const NEBULA_FRACTIONS = {
  main: 0.1,
  aux: 0.05,
} as const;

/** Max Y coordinate (px) for each nebula layer to keep them in the upper sky. */
export const NEBULA_MAX_Y = {
  main: 800,
  aux: 400,
} as const;

/** Nebula glow dimensions (px): blur radius and spread radius. See NEBULA_FRACTIONS. */
export const NEBULA_GLOW = { blur: 150, spread: 20 } as const;

/** Glow for bright white stars: blur and spread (px). */
export const BRIGHT_STAR_GLOW = { blur: 4, spread: 1 } as const;

/** Star density multipliers keyed by the `density` prop value. */
export const DENSITY_SCALE = { sparse: 0.4, normal: 0.8, dense: 2 } as const;

/** Base blink animation durations per star layer (seconds). Scaled by the `speed` prop. */
export const BLINK_DURATIONS = {
  small: 3,
  med: 2,
  large: 4,
  bright: 5,
} as const;

/** Responsive breakpoint (px) at which ToggleSwitch switches to row layout. */
export const TOGGLE_BREAKPOINT_PX = 1024;
