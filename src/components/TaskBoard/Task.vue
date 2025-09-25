<script setup>
import { ref } from "vue";
import { Pencil, Trash2, Eye } from "lucide-vue-next"; // icon package
import { useKanbanStore } from "../../store/KanbanStore";
import { useThemeStore } from "../../store/ThemeStore";

// store
const TaskStore = useKanbanStore();
const themeStore = useThemeStore();

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

function openedit() {
  TaskStore.editTask(props.task);
}
</script>

<template>
  <div
    @click="openedit"
    class="p-4 bg-white cursor-pointer rounded-lg shadow border"
  >
    <!-- Top section with title and actions -->
    <div class="flex justify-between items-start">
      <h3 class="text-lg font-bold text-gray-800">{{ task.title }}</h3>
      <div class="flex gap-2">
        <!-- Edit -->
        <button
          @click.stop="openedit"
          class="p-1 text-purple-500 hover:text-purple-700"
        >
          <Pencil class="w-5 h-5" />
        </button>
        <!-- Delete -->
        <button
          @click.stop="TaskStore.handleDeleteTask(task)"
          class="p-1 text-red-500 hover:text-red-700"
        >
          <Trash2 class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-gray-600 mt-1">{{ task.description }}</p>

    <!-- Footer (assignee + date) -->
    <div class="flex justify-between items-center mt-3 text-sm text-gray-500">
      <p>👤 {{ task.Assignees }}</p>
      <p>📅 {{ task.date }}</p>
    </div>
  </div>
</template>
