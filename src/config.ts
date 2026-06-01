/** Coordinate space for box-shadow star placement (px). Covers typical 4K displays. */
export const STAR_FIELD_SIZE = 2000;

/** Star count distribution across layers (fractions of starCount prop). */
export const STAR_LAYER_FRACTIONS = {
  tiny: 0.25,
  small: 0.25,
  med: 0.2,
  large: 0.1,
  bright: 0.15,
} as const;

/** Nebula (colored glow) layer fractions and vertical extent. */
export const NEBULA_FRACTIONS = {
  main: 0.15,
  aux: 0.05,
} as const;

/** Max Y coordinate (px) for each nebula layer to keep them in the upper sky. */
export const NEBULA_MAX_Y = {
  main: 800,
  aux: 400,
} as const;

/** Nebula glow dimensions (px): blur radius and spread radius. */
export const NEBULA_GLOW = { blur: 18, spread: 6 } as const;

/** Glow for bright white stars: blur and spread (px). */
export const BRIGHT_STAR_GLOW = { blur: 4, spread: 1 } as const;

/** Star density multipliers keyed by the `density` prop value. */
export const DENSITY_SCALE = { sparse: 0.5, normal: 1, dense: 2 } as const;

/** Base blink animation durations per star layer (seconds). Scaled by the `speed` prop. */
export const BLINK_DURATIONS = {
  small: 3,
  med: 2,
  large: 4,
  bright: 5,
} as const;

/** Responsive breakpoint (px) at which ToggleSwitch switches to row layout. */
export const TOGGLE_BREAKPOINT_PX = 1024;
