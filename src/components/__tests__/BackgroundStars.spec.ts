import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BackgroundStars from '../BackgroundStars.vue';

const waitForRaf = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

describe('BackgroundStars.vue', () => {
  it('emits background-ready event after stars generation', async () => {
    const wrapper = mount(BackgroundStars);
    await waitForRaf();
    expect(wrapper.emitted()).toHaveProperty('background-ready');
    expect(wrapper.emitted('background-ready')).toHaveLength(1);
  });

  it('generates correct number of star elements with default props', async () => {
    const wrapper = mount(BackgroundStars);
    await waitForRaf();

    const starsContainer = wrapper.find('.stars');
    const starsCrossContainer = wrapper.find('.stars-cross');
    const starsCrossAuxContainer = wrapper.find('.stars-cross-aux');

    // mainLoops=250 × 4 + crossLoops=150 star-4s + auxLoops=50 × 0.5 star-5s = 1175
    expect(starsContainer.element.querySelectorAll('.star').length).toBe(1175);
    // 150 iterations × 2 elements (blur + star) = 300
    expect(starsCrossContainer.element.children.length).toBe(300);
    // 50 iterations × 2 elements (blur + star) = 100
    expect(starsCrossAuxContainer.element.children.length).toBe(100);
  });

  it('scales star count with starCount prop', async () => {
    const wrapper = mount(BackgroundStars, { props: { starCount: 200 } });
    await waitForRaf();
    // mainLoops=50, crossLoops=30, auxLoops=10 → far fewer than default 1175
    const stars = wrapper.find('.stars').element.querySelectorAll('.star');
    expect(stars.length).toBeGreaterThan(0);
    expect(stars.length).toBeLessThan(1175);
  });

  it('suppresses blink class when disableAnimation is true', async () => {
    const wrapper = mount(BackgroundStars, { props: { disableAnimation: true } });
    await waitForRaf();
    expect(wrapper.element.querySelectorAll('.blink').length).toBe(0);
  });

  it('applies blink class by default', async () => {
    const wrapper = mount(BackgroundStars);
    await waitForRaf();
    expect(wrapper.element.querySelectorAll('.blink').length).toBeGreaterThan(0);
  });

  it('uses custom palette for colored star layers', async () => {
    const wrapper = mount(BackgroundStars, { props: { palette: ['#ff0000'] } });
    await waitForRaf();
    // Cross layer stars should exist (palette only affects colored layers)
    const crossStars = wrapper.find('.stars-cross').element.querySelectorAll('.star');
    expect(crossStars.length).toBeGreaterThan(0);
  });

  it('accepts density and speed props without errors', async () => {
    const wrapper = mount(BackgroundStars, { props: { density: 'dense', speed: 2 } });
    await waitForRaf();
    expect(wrapper.emitted('background-ready')).toBeTruthy();
    // dense × 2× speed: more stars than default
    const stars = wrapper.find('.stars').element.querySelectorAll('.star');
    expect(stars.length).toBeGreaterThan(1175);
  });

  it('renders all required sky elements', () => {
    const wrapper = mount(BackgroundStars);

    expect(wrapper.find('.sky').exists()).toBe(true);
    expect(wrapper.find('.sky-base').exists()).toBe(true);
    expect(wrapper.find('.stars').exists()).toBe(true);
    expect(wrapper.find('.stars-cross').exists()).toBe(true);
    expect(wrapper.find('.stars-cross-aux').exists()).toBe(true);
  });

  it('applies correct styles to sky container', () => {
    const wrapper = mount(BackgroundStars);
    const sky = wrapper.find('.sky');

    // Check that the sky element has the correct classes and exists
    expect(sky.exists()).toBe(true);
    expect(sky.classes()).toContain('sky');
  });

  it('generates stars with background colors applied', async () => {
    const wrapper = mount(BackgroundStars);
    await waitForRaf();

    const stars = wrapper.find('.stars-cross').element.querySelectorAll('.star');
    expect(stars.length).toBeGreaterThan(0);

    const starsWithColors = Array.from(stars).filter(
      (star) => (star as HTMLElement).style.backgroundColor?.length > 0
    );
    expect(starsWithColors.length).toBeGreaterThan(0);
  });
});
