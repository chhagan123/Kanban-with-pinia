import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref(true);
  function toggleTheme() {
    theme.value = !theme.value;
  }

  return { theme, toggleTheme };
});
