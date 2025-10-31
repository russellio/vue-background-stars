import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BackgroundStars from '../BackgroundStars.vue';

describe('BackgroundStars.vue', () => {
    it('emits background-ready event after stars generation', async () => {
        const wrapper = mount(BackgroundStars);

        // Wait for requestAnimationFrame to complete
        await new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        expect(wrapper.emitted()).toHaveProperty('background-ready');
        expect(wrapper.emitted('background-ready')).toHaveLength(1);
    });

    it('generates correct number of star elements', async () => {
        const wrapper = mount(BackgroundStars);

        // Wait for requestAnimationFrame to complete
        await new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        const starsContainer = wrapper.find('.stars');
        const starsCrossContainer = wrapper.find('.stars-cross');
        const starsCrossAuxContainer = wrapper.find('.stars-cross-aux');

        // Basic stars: 250 iterations × 4 stars per iteration = 1000 stars
        // Cross stars: 150 iterations × 1 star-4 = 150 in main container
        // Aux stars: 50 iterations × 0.5 (i % 2 === 0) × 1 star-5 = 25 in main container
        // Total in main stars container: 1000 + 150 + 25 = 1175
        const starsCount = starsContainer.element.querySelectorAll('.star').length;
        expect(starsCount).toBe(1175);

        // Cross stars: 150 iterations × 2 elements (blur + star-1) = 300 elements
        const crossCount = starsCrossContainer.element.children.length;
        expect(crossCount).toBe(300);

        // Auxiliary cross stars: 50 iterations × 2 elements (blur + star-2) = 100 elements
        const auxCount = starsCrossAuxContainer.element.children.length;
        expect(auxCount).toBe(100);
    });

    it('renders all required sky elements', () => {
        const wrapper = mount(BackgroundStars);

        expect(wrapper.find('.sky').exists()).toBe(true);
        expect(wrapper.find('.mountains').exists()).toBe(true);
        expect(wrapper.find('.sky-base').exists()).toBe(true);
        expect(wrapper.find('.stars').exists()).toBe(true);
        expect(wrapper.find('.stars-cross').exists()).toBe(true);
        expect(wrapper.find('.stars-cross-aux').exists()).toBe(true);
    });

    it('applies correct styles to sky container', () => {
        const wrapper = mount(BackgroundStars);
        const sky = wrapper.find('.sky');

        expect(sky.attributes('style')).toContain('position: fixed');
        expect(sky.attributes('style')).toContain('z-index: -1');
    });

    it('generates stars with correct color palette', async () => {
        const wrapper = mount(BackgroundStars);

        await new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        const nightSkyColors = ['#280F36', '#632B6C', '#BE6590', '#FFC1A0', '#FE9C7F'];
        const starsCrossContainer = wrapper.find('.stars-cross');
        const stars = starsCrossContainer.element.querySelectorAll('.star');

        // Check that at least some stars use colors from the palette
        let foundColorFromPalette = false;
        stars.forEach((star) => {
            const backgroundColor = (star as HTMLElement).style.backgroundColor;
            if (backgroundColor && nightSkyColors.some((color) => backgroundColor.includes(color.toLowerCase().substring(1)))) {
                foundColorFromPalette = true;
            }
        });

        expect(foundColorFromPalette).toBe(true);
    });
});
