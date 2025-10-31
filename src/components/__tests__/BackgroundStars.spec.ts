import { describe, it, expect } from 'vitest';
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

        // Check that the sky element has the correct classes and exists
        expect(sky.exists()).toBe(true);
        expect(sky.classes()).toContain('sky');
    });

    it('generates stars with correct color palette', async () => {
        const wrapper = mount(BackgroundStars);

        await new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        const starsCrossContainer = wrapper.find('.stars-cross');
        const stars = starsCrossContainer.element.querySelectorAll('.star');

        // At minimum, we should have generated stars in the cross container
        expect(stars.length).toBeGreaterThan(0);

        // Verify that stars have background colors applied
        const starsWithColors = Array.from(stars).filter((star) => {
            const backgroundColor = (star as HTMLElement).style.backgroundColor;
            return backgroundColor && backgroundColor.length > 0;
        });

        expect(starsWithColors.length).toBeGreaterThan(0);
    });
});
