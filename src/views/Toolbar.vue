<script setup>
import UndoRedo from "../components/UndoredoButton/UndoRedo.vue";
import { useThemeStore } from "../store/ThemeStore";

import { ref } from "vue";

const searchquery = ref("");
const SearchQueryAssgnee = ref("");

const Assignees = ref(["chhagan", "Nandu", "Rishabh"]);

const emit = defineEmits([
  "toggle",
  "togglecol",
  "search",
  "assignee",
  "theme",
  "undo",
  "redo",
]);




// register store here 

const themeStore = useThemeStore();

// emit search query
function handlesearch() {
  emit("search", searchquery.value);
}
function searchAssignee() {
  emit("assignee", SearchQueryAssgnee.value);
}


function togglecol() {
  emit("togglecol");
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-center shadow rounded-lg px-4 py-3 w-full gap-3 sm:gap-6 transition-colors duration-300"
    :class="
      themeStore.theme
        ? 'bg-gray-50 text-gray-900' /* Light */
        : 'bg-gray-800 text-gray-100' /* Dark */
    "
  >
    <!-- Left Side: Search + Dropdown -->
    <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
      <!-- Search -->
      <div class="relative w-full sm:w-56">
        <input
          v-model="searchquery"
          @input="handlesearch"
          class="pl-3 pr-8 py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          :class="
            themeStore.theme
              ? 'border border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              : 'border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-300'
          "
          placeholder="Search by title..."
        />
        <span
          class="absolute right-2 top-2 text-sm"
          :class="themeStore.theme ? 'text-gray-500' : 'text-gray-300'"
        >
          🔍
        </span>
      </div>

      <!-- Dropdown -->
      <select
        v-model="SearchQueryAssgnee"
        @change="searchAssignee"
        class="rounded-lg px-2 py-2 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        :class="
          themeStore.theme
            ? 'border border-gray-300 bg-white text-gray-900'
            : 'border border-gray-600 bg-gray-700 text-gray-100'
        "
      >
        <option disabled value="">Search Assignee</option>
        <option v-for="person in Assignees" :key="person" :value="person">
          {{ person }}
        </option>
      </select>
    </div>

    <!-- Right Side: Buttons -->
    <div
      class="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 items-center w-full sm:w-auto"
    >
      <!-- Add Column -->
      <button
        @click="togglecol"
        class="px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto transition-colors duration-300"
        :class="
          themeStore.theme
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        "
      >
        ➕ Add Column
      </button>

      <!-- Undo -->
      <UndoRedo label="⟲ Undo" :theme="themeStore.theme" />
      <!--Redo-->
      <UndoRedo label="⟳ Redo" :theme="themeStore.theme" />

      <!-- Mode -->
      <button
        @click="themeStore.toggleTheme()"
        class="px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto transition-colors duration-300"
        :class="
          themeStore.theme
            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
            : 'bg-gray-600 text-yellow-300 hover:bg-gray-500'
        "
      >
        {{ themeStore.theme ? "☀️" : "🌙" }}
      </button>
    </div>
  </div>
</template>
