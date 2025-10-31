<script setup lang="ts">
import { ref } from 'vue';
import BackgroundStars from '@/components/BackgroundStars.vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';

const showBackground = ref(true);

const handleBackgroundReady = () => {
  console.log('Background stars are ready!');
};
</script>

<template>
  <div class="demo-container">
    <!-- Toggle Control -->
    <div class="demo-header">
      <ToggleSwitch 
        label="Starry Sky" 
        v-model="showBackground"
        :showIcon="true"
      />
    </div>

    <!-- Background Stars -->
    <Transition name="background-fade" appear>
      <BackgroundStars 
        v-if="showBackground" 
        @background-ready="handleBackgroundReady"
      />
    </Transition>

    <!-- Demo Content -->
    <div class="demo-content">
      <h1 class="demo-title">Vue Background Stars</h1>
      <p class="demo-subtitle">A beautiful animated starry night sky background component for Vue 3</p>

      <div class="demo-section">
        <h2>✨ Features</h2>
        <ul class="demo-features">
          <li>Animated twinkling stars with realistic night sky colors</li>
          <li>Performance optimized with DocumentFragment for efficient rendering</li>
          <li>Zero external dependencies (except Vue 3)</li>
          <li>TypeScript support out of the box</li>
          <li>Fully customizable and responsive</li>
          <li>Optional toggle switch component included</li>
          <li>Perfect for landing pages, portfolios, and space-themed applications</li>
        </ul>
      </div>

      <div class="demo-section">
        <h2>📦 Installation</h2>
        <p>Install the package via npm:</p>
        <div class="demo-code">
          <code>npm install @russellio/vue-background-stars</code>
        </div>
        <p>Or via yarn:</p>
        <div class="demo-code">
          <code>yarn add @russellio/vue-background-stars</code>
        </div>
      </div>

      <div class="demo-section">
        <h2>🚀 Quick Start</h2>
        <p>1. Import the components:</p>
        <div class="demo-code">
          <code>
import { BackgroundStars, ToggleSwitch } from '@russellio/vue-background-stars';<br/>
import '@russellio/vue-background-stars/style.css';
          </code>
        </div>
        <p>2. Use in your template:</p>
        <div class="demo-code">
          <code>
&lt;template&gt;<br/>
  &nbsp;&lt;ToggleSwitch v-model="showStars" label="Starry Sky" /&gt;<br/>
  &nbsp;&lt;BackgroundStars v-if="showStars" /&gt;<br/>
&lt;/template&gt;<br/><br/>
&lt;script setup&gt;<br/>
  &nbsp;import { ref } from 'vue';<br/>
  &nbsp;const showStars = ref(true);<br/>
&lt;/script&gt;
          </code>
        </div>
      </div>

      <div class="demo-section">
        <h2>🎨 Customization</h2>
        <p>
          The BackgroundStars component is designed to work out of the box, but you can customize
          it by overriding the CSS classes. The component uses scoped styles, so you can modify
          the appearance by targeting the component's classes in your global stylesheet.
        </p>
        <p>
          The ToggleSwitch component accepts props for customization including <code>label</code>
          and <code>showIcon</code> to control its appearance.
        </p>
      </div>

      <div class="demo-footer">
        <p>Built with ❤️ using Vue 3 + TypeScript</p>
        <p>Toggle the switch above to see the stars appear and disappear!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-fade-enter-active {
  transition: opacity 1.5s ease-in-out;
}

.background-fade-enter-from {
  opacity: 0;
}

.background-fade-enter-to {
  opacity: 1;
}
</style>

