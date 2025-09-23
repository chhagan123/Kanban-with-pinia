<script setup>
const props = defineProps({
  label: String, // text shown on button
  theme: Boolean, // used only for styling
  variant: {
    type: String,
    default: "default", // default or theme
  },
});
</script>

<template>
  <button
    class="px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto transition-colors duration-300 flex items-center gap-1 justify-center"
    :class="[
      props.variant === 'theme'
        ? props.theme
          ? 'bg-yellow-400 text-black hover:bg-yellow-500'
          : 'bg-gray-600 text-yellow-300 hover:bg-gray-500'
        : props.theme
        ? 'border border-gray-300 hover:bg-gray-100 text-gray-800'
        : 'border border-gray-600 hover:bg-gray-700 text-gray-100',
    ]"
  >
    {{ label }}
  </button>
</template>
