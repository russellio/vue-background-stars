<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    showIcon: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
});

const emitChange = () => {
    emit('update:modelValue', internalValue.value);
};
</script>

<template>
    <label class="toggle-switch-label">
        <span v-if="label" class="toggle-switch-text" :class="{ 'toggle-switch-text-active': internalValue }">
            {{ label }}
        </span>
        <div class="toggle-switch-wrapper">
            <input
                type="checkbox"
                class="toggle-switch-input"
                v-model="internalValue"
                @change="emitChange"
            />
            <div
                class="toggle-switch-track"
                :class="{ 'toggle-switch-track-active': internalValue }"
            ></div>
            <div
                class="toggle-switch-thumb"
                :class="{ 'toggle-switch-thumb-active': internalValue }"
            ></div>
        </div>
        <div v-if="showIcon" class="toggle-switch-icon" :class="{ 'toggle-switch-icon-visible': internalValue, 'toggle-switch-icon-hidden': !internalValue }">
            ⭐
        </div>
    </label>
</template>

<style scoped>
.toggle-switch-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    cursor: pointer;
    gap: 0.5rem;
}

@media (min-width: 1024px) {
    .toggle-switch-label {
        flex-direction: row;
    }
}

.toggle-switch-text {
    color: rgba(255, 255, 255, 0.8);
    margin-right: 0.5rem;
    transition: font-weight 0.2s ease-in-out;
}

.toggle-switch-text-active {
    font-weight: bold;
}

.toggle-switch-wrapper {
    position: relative;
    display: inline-block;
}

.toggle-switch-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-switch-track {
    width: 2rem;
    height: 1rem;
    background-color: #d1d5db;
    border-radius: 9999px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease-in-out;
}

.toggle-switch-track-active {
    background-color: #3b82f6;
}

.toggle-switch-thumb {
    position: absolute;
    left: 0;
    top: 0;
    width: 1rem;
    height: 1rem;
    background-color: white;
    border-radius: 9999px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateX(0);
    transition: transform 0.2s ease-in-out;
}

.toggle-switch-thumb-active {
    transform: translateX(1rem);
}

.toggle-switch-icon {
    display: none;
    font-size: 1.25rem;
    margin-left: 0.5rem;
    opacity: 0.4;
    transform: rotate(12deg);
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
}

@media (min-width: 1024px) {
    .toggle-switch-icon {
        display: inline-block;
    }
}

.toggle-switch-icon-visible {
    opacity: 1;
    visibility: visible;
}

.toggle-switch-icon-hidden {
    opacity: 0;
    visibility: hidden;
}
</style>

