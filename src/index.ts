import type { App } from 'vue';
import BackgroundStars from './components/BackgroundStars.vue';
import ToggleSwitch from './components/ToggleSwitch.vue';

export { BackgroundStars, ToggleSwitch };

const install = {
    install(app: App) {
        app.component('BackgroundStars', BackgroundStars);
        app.component('ToggleSwitch', ToggleSwitch);
    },
};

export default install;
