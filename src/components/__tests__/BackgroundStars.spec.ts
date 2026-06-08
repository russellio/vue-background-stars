import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import BackgroundStars from '../BackgroundStars.vue';

const waitForRaf = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

/** Count stars in a box-shadow string by counting comma-separated values. */
function countShadows(shadow: string): number {
  return shadow ? shadow.split(',').length : 0;
}

describe('BackgroundStars.vue', () => {
  it('emits background-ready event after stars generation', async () => {
    const wrapper = mount(BackgroundStars);
    await waitForRaf();
    expect(wrapper.emitted()).toHaveProperty('background-ready');
    expect(wrapper.emitted('background-ready')).toHaveLength(1);
  });

  it('renders all required sky elements', async () => {
    const wrapper = mount(BackgroundStars);
    await waitForRaf();

    expect(wrapper.find('.sky').exists()).toBe(true);
    expect(wrapper.find('.sky-base').exists()).toBe(true);
    expect(wrapper.find('.star-tiny').exists()).toBe(true);
    expect(wrapper.find('.star-small').exists()).toBe(true);
    expect(wrapper.find('.star-med').exists()).toBe(true);
    expect(wrapper.find('.star-large').exists()).toBe(true);
    expect(wrapper.find('.star-bright').exists()).toBe(true);
    expect(wrapper.find('.nebula-layer').exists()).toBe(true);
  });

  it('populates box-shadow on star layers after mount', async () => {
    const wrapper = mount(BackgroundStars);
    await waitForRaf();

    const tinyEl = wrapper.find('.star-tiny').element as HTMLElement;
    expect(countShadows(tinyEl.style.boxShadow)).toBeGreaterThan(0);

    const nebula = wrapper.find('.nebula-layer').element as HTMLElement;
    expect(countShadows(nebula.style.boxShadow)).toBeGreaterThan(0);
  });

  it('smaller starCount produces fewer stars than the default', async () => {
    const defaultWrapper = mount(BackgroundStars);
    const smallWrapper = mount(BackgroundStars, { props: { starCount: 100 } });
    await waitForRaf();

    const defaultCount = countShadows(
      (defaultWrapper.find('.star-small').element as HTMLElement).style.boxShadow
    );
    const smallCount = countShadows(
      (smallWrapper.find('.star-small').element as HTMLElement).style.boxShadow
    );
    expect(smallCount).toBeGreaterThan(0);
    expect(smallCount).toBeLessThan(defaultCount);
  });

  it('dense density produces more stars than normal', async () => {
    const normalWrapper = mount(BackgroundStars);
    const denseWrapper = mount(BackgroundStars, { props: { density: 'dense' } });
    await waitForRaf();

    const normalCount = countShadows(
      (normalWrapper.find('.star-tiny').element as HTMLElement).style.boxShadow
    );
    const denseCount = countShadows(
      (denseWrapper.find('.star-tiny').element as HTMLElement).style.boxShadow
    );
    expect(denseCount).toBeGreaterThan(normalCount);
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

  it('nebula layer box-shadow references CSS custom properties and host element has palette vars', async () => {
    const wrapper = mount(BackgroundStars, { props: { palette: ['#abcdef'] } });
    await waitForRaf();

    const sky = wrapper.find('.sky').element as HTMLElement;
    expect(sky.style.getPropertyValue('--nebula-c0')).toBe('#abcdef');

    const nebulaShadow = (wrapper.find('.nebula-layer').element as HTMLElement).style.boxShadow;
    expect(nebulaShadow).toContain('var(--nebula-c0)');
  });

  it('updating palette prop updates CSS vars on host without re-running onMounted', async () => {
    const wrapper = mount(BackgroundStars, {
      props: { palette: ['#ff0000', '#00ff00'] },
    });
    await waitForRaf();

    const sky = wrapper.find('.sky').element as HTMLElement;
    expect(sky.style.getPropertyValue('--nebula-c0')).toBe('#ff0000');
    expect(sky.style.getPropertyValue('--nebula-c1')).toBe('#00ff00');

    const emittedCount = wrapper.emitted('background-ready')!.length;

    await wrapper.setProps({ palette: ['#0000ff', '#ffff00'] });
    await nextTick();

    expect(sky.style.getPropertyValue('--nebula-c0')).toBe('#0000ff');
    expect(sky.style.getPropertyValue('--nebula-c1')).toBe('#ffff00');
    expect(wrapper.emitted('background-ready')!.length).toBe(emittedCount);
  });

  it('accepts density and speed props without errors', async () => {
    const wrapper = mount(BackgroundStars, { props: { density: 'dense', speed: 2 } });
    await waitForRaf();
    expect(wrapper.emitted('background-ready')).toBeTruthy();
    expect(wrapper.find('.star-tiny').exists()).toBe(true);
  });

  it('applies correct styles to sky container', () => {
    const wrapper = mount(BackgroundStars);
    const sky = wrapper.find('.sky');
    expect(sky.exists()).toBe(true);
    expect(sky.classes()).toContain('sky');
  });

  it('speed prop scales animation duration on blinking layers', async () => {
    const normalWrapper = mount(BackgroundStars, { props: { speed: 1 } });
    const slowWrapper = mount(BackgroundStars, { props: { speed: 3 } });
    await waitForRaf();

    const normalDur = (normalWrapper.find('.star-small').element as HTMLElement).style
      .animationDuration;
    const slowDur = (slowWrapper.find('.star-small').element as HTMLElement).style
      .animationDuration;

    expect(normalDur).toBeTruthy();
    expect(slowDur).toBeTruthy();
    expect(parseFloat(slowDur)).toBeGreaterThan(parseFloat(normalDur));
  });
});
