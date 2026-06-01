import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from 'vitest-axe';
import type { AxeResults } from 'axe-core';
import ToggleSwitch from '../ToggleSwitch.vue';
import BackgroundStars from '../BackgroundStars.vue';

const waitForRaf = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

// Skip contrast checks — happy-dom does not render CSS so computed colour
// values are always transparent, producing false positives.
const axeOptions = { rules: { 'color-contrast': { enabled: false } } };

function expectNoViolations(results: AxeResults) {
  if (results.violations.length > 0) {
    const report = results.violations
      .map((v) => `  [${v.impact}] ${v.id}: ${v.description}`)
      .join('\n');
    throw new Error(`axe found ${results.violations.length} violation(s):\n${report}`);
  }
  expect(results.violations).toHaveLength(0);
}

describe('ToggleSwitch accessibility', () => {
  it('has no axe violations with a label prop', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: { modelValue: false, label: 'Enable feature' },
      attachTo: document.body,
    });
    expectNoViolations(await axe(wrapper.element, axeOptions));
    wrapper.unmount();
  });

  it('has no axe violations when active (aria-checked=true)', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: { modelValue: true, label: 'Enable feature' },
      attachTo: document.body,
    });
    expectNoViolations(await axe(wrapper.element, axeOptions));
    wrapper.unmount();
  });

  it('has no axe violations without a label (falls back to aria-label)', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: { modelValue: false },
      attachTo: document.body,
    });
    expectNoViolations(await axe(wrapper.element, axeOptions));
    wrapper.unmount();
  });

  it('input has role switch and correct aria-checked', () => {
    const wrapper = mount(ToggleSwitch, { props: { modelValue: false, label: 'Test' } });
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.attributes('role')).toBe('switch');
    expect(input.attributes('aria-checked')).toBe('false');
  });

  it('input aria-checked reflects modelValue', async () => {
    const wrapper = mount(ToggleSwitch, { props: { modelValue: false, label: 'Test' } });
    await wrapper.setProps({ modelValue: true });
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.attributes('aria-checked')).toBe('true');
  });

  it('label for attribute matches input id', () => {
    const wrapper = mount(ToggleSwitch, { props: { modelValue: false, label: 'Test' } });
    const label = wrapper.find('label');
    const input = wrapper.find('input');
    expect(label.attributes('for')).toBeTruthy();
    expect(label.attributes('for')).toBe(input.attributes('id'));
  });

  it('icon has aria-hidden', () => {
    const wrapper = mount(ToggleSwitch, { props: { modelValue: false, showIcon: true } });
    const icon = wrapper.find('.toggle-switch-icon');
    expect(icon.attributes('aria-hidden')).toBe('true');
  });
});

describe('BackgroundStars accessibility', () => {
  it('has no axe violations after mount', async () => {
    const wrapper = mount(BackgroundStars, { attachTo: document.body });
    await waitForRaf();
    expectNoViolations(await axe(wrapper.element, axeOptions));
    wrapper.unmount();
  });
});
