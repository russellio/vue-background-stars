import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ToggleSwitch from '../ToggleSwitch.vue';

describe('ToggleSwitch.vue', () => {
    it('updates modelValue and emits update:modelValue correctly', async () => {
        const wrapper = mount(ToggleSwitch, {
            props: {
                modelValue: false,
            },
        });

        const input = wrapper.find('input[type="checkbox"]');
        await input.setValue(true);

        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    });

    it('renders label and toggles active class based on modelValue', async () => {
        const wrapper = mount(ToggleSwitch, {
            props: {
                modelValue: false,
                label: 'Enable Stars',
            },
        });

        // Check label is rendered
        const labelText = wrapper.find('.toggle-switch-text');
        expect(labelText.exists()).toBe(true);
        expect(labelText.text()).toBe('Enable Stars');

        // Check active class is not present initially
        expect(labelText.classes()).not.toContain('toggle-switch-text-active');

        // Update modelValue
        await wrapper.setProps({ modelValue: true });

        // Check active class is now present
        expect(labelText.classes()).toContain('toggle-switch-text-active');
    });

    it('applies active classes to track and thumb when modelValue is true', async () => {
        const wrapper = mount(ToggleSwitch, {
            props: {
                modelValue: false,
            },
        });

        const track = wrapper.find('.toggle-switch-track');
        const thumb = wrapper.find('.toggle-switch-thumb');

        // Initially not active
        expect(track.classes()).not.toContain('toggle-switch-track-active');
        expect(thumb.classes()).not.toContain('toggle-switch-thumb-active');

        // Set to active
        await wrapper.setProps({ modelValue: true });

        expect(track.classes()).toContain('toggle-switch-track-active');
        expect(thumb.classes()).toContain('toggle-switch-thumb-active');
    });

    it('toggles icon visibility based on modelValue', async () => {
        const wrapper = mount(ToggleSwitch, {
            props: {
                modelValue: false,
                showIcon: true,
            },
        });

        const icon = wrapper.find('.toggle-switch-icon');

        // Initially hidden
        expect(icon.classes()).toContain('toggle-switch-icon-hidden');
        expect(icon.classes()).not.toContain('toggle-switch-icon-visible');

        // Set to active
        await wrapper.setProps({ modelValue: true });

        expect(icon.classes()).toContain('toggle-switch-icon-visible');
        expect(icon.classes()).not.toContain('toggle-switch-icon-hidden');
    });

    it('does not render label when label prop is empty', () => {
        const wrapper = mount(ToggleSwitch, {
            props: {
                modelValue: false,
                label: '',
            },
        });

        const labelText = wrapper.find('.toggle-switch-text');
        expect(labelText.exists()).toBe(false);
    });

    it('does not render icon when showIcon is false', () => {
        const wrapper = mount(ToggleSwitch, {
            props: {
                modelValue: false,
                showIcon: false,
            },
        });

        const icon = wrapper.find('.toggle-switch-icon');
        expect(icon.exists()).toBe(false);
    });

    it('syncs internal value with prop changes', async () => {
        const wrapper = mount(ToggleSwitch, {
            props: {
                modelValue: false,
            },
        });

        const input = wrapper.find('input[type="checkbox"]');
        expect((input.element as HTMLInputElement).checked).toBe(false);

        // Update prop from parent
        await wrapper.setProps({ modelValue: true });

        expect((input.element as HTMLInputElement).checked).toBe(true);
    });

    it('emits change when checkbox is toggled', async () => {
        const wrapper = mount(ToggleSwitch, {
            props: {
                modelValue: false,
            },
        });

        const input = wrapper.find('input[type="checkbox"]');

        // Toggle to true
        await input.setValue(true);
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

        // Toggle back to false
        await input.setValue(false);
        expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false]);
    });
});
