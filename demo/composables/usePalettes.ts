export const PALETTES = {
  default: ['#280F36', '#632B6C', '#BE6590', '#FFC1A0', '#FE9C7F'],
  aurora: ['#0A1628', '#0F4A3A', '#1B8A6B', '#6DC8A8', '#8B5CF6'],
  ember: ['#1A0000', '#7B1A0A', '#C94A0A', '#E87A1A', '#F5C042'],
  mono: ['#0A0A0A', '#222222', '#444444', '#888888', '#CCCCCC'],
} as const satisfies Record<string, readonly string[]>;

export type PaletteName = keyof typeof PALETTES;
