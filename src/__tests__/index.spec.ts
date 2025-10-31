import { describe, it, expect } from 'vitest';
import { createApp } from 'vue';
import VueBackgroundStars, { BackgroundStars, ToggleSwitch } from '../index';

describe('Vue Plugin', () => {
    it('installs BackgroundStars and ToggleSwitch components globally', () => {
        const app = createApp({});

        // Install the plugin
        app.use(VueBackgroundStars);

        // Check that components are registered globally
        expect(app.component('BackgroundStars')).toBeDefined();
        expect(app.component('ToggleSwitch')).toBeDefined();

        // Verify they are the correct components
        expect(app.component('BackgroundStars')).toBe(BackgroundStars);
        expect(app.component('ToggleSwitch')).toBe(ToggleSwitch);
    });

    it('exports BackgroundStars component', () => {
        expect(BackgroundStars).toBeDefined();
        expect(typeof BackgroundStars).toBe('object');
    });

    it('exports ToggleSwitch component', () => {
        expect(ToggleSwitch).toBeDefined();
        expect(typeof ToggleSwitch).toBe('object');
    });

    it('default export has install method', () => {
        expect(VueBackgroundStars).toBeDefined();
        expect(typeof VueBackgroundStars.install).toBe('function');
    });
});
