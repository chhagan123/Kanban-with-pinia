<script setup lang="ts">
import { useKanbanStore } from "../../store/KanbanStore";
import type { Task } from "../../store/KanbanStore";
import { reactive, watch } from "vue";

const TaskStore = useKanbanStore();

const props = defineProps<{
  modelValue: boolean;
  task: Task | null;
}>();

const emit = defineEmits(["update:modelValue", "update-task"]);

// Local editable copy of task
const localTask = reactive<Task>({
  id: "",
  title: "",
  description: "",
  Assignees: "",
  date: "",
  columnId: "",
});

// Watch for prop changes and sync
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      Object.assign(localTask, newTask);
    }
  },
  { immediate: true }
);

// Close modal
function closeModal() {
  emit("update:modelValue", false);
}

// Save updated task
function saveTask() {
  TaskStore.updateTask({ ...localTask });
  closeModal();
}
</script>
<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-lg font-bold mb-4">Edit Task</h2>

      <div class="space-y-3">
        <input
          v-model="localTask.title"
          type="text"
          placeholder="Title"
          class="w-full p-2 border rounded"
          required
        />
        <textarea
          v-model="localTask.description"
          placeholder="Description"
          class="w-full p-2 border rounded"
        ></textarea>
        <input
          v-model="localTask.Assignees"
          type="text"
          placeholder="Assignee"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="localTask.date"
          type="date"
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="closeModal"
          class="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="saveTask"
          class="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
