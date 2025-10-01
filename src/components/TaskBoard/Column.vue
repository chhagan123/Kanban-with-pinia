<script setup lang="ts">

import { useKanbanStore } from "../../store/KanbanStore";
import { useThemeStore } from "../../store/ThemeStore";
import { useColumStore } from "../../store/ColumStore";
import Task from "./Task.vue";
import draggable from "vuedraggable";

// Stores
const TaskStore = useKanbanStore();
const themeStore = useThemeStore();
const columnStore = useColumStore();

const props = defineProps({
  searchTerm: String,
  searchAssine: String,
});

const emit = defineEmits(["openAddTask", "editTask", "delete", "deleteColumn"]);


// 🔹 Filter tasks per column
function getFilteredTasks(colId: string) {
  return TaskStore.tasks.filter((task) => {
    const matchesColumn = task.columnId === colId;
    const matchesAssignee = !props.searchAssine
      ? true
      : task.Assignees.toLowerCase().includes(props.searchAssine.toLowerCase());

    const matchesSearch = !props.searchTerm
      ? true
      : task.title.toLowerCase().includes(props.searchTerm.toLowerCase());

    return matchesColumn && matchesSearch && matchesAssignee;
  });
}

// 🔹 Handle drag end
function onDragEnd(evt:any) {
  const { item, to } = evt;
  const newColId = to.closest("[data-col-id]")?.dataset.colId;

  if (newColId) {
    const taskId = item.getAttribute("data-task-id");
    const task = TaskStore.tasks.find((t) => t.id.toString() === taskId);

    if (task) {
      task.columnId = newColId;
    }
  }
  localStorage.setItem("kanban-tasks", JSON.stringify(TaskStore.tasks));
}

const notDeletecol = ["Todo", "Progress", "Done"];


</script>

<template>
  <div class="flex gap-6 w-full mt-4 p-4 items-start">
    <div
      v-for="col in columnStore.columns"
      :key="col.id"
      :data-col-id="col.id"
      class="w-60 h-auto rounded-lg p-2 flex flex-col flex-shrink-0 border"
      :class="
        themeStore.theme
          ? 'bg-gray-50 border-gray-300 text-gray-900'
          : 'bg-gray-800 border-gray-600 text-gray-100'
      "
    >
      <!-- Column Header -->
      <div
        class="flex w-full mb-2 pb-2 justify-start gap-4 items-center border-b"
        :class="themeStore.theme ? 'border-gray-300' : 'border-gray-600'"
      >
        <h1 class="font-bold ml-2">{{ col.name }}</h1>
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center bg-indigo-600 shadow"
        >
          <span class="text-white font-normal text-xs">
            {{ getFilteredTasks(col.id).length }}
          </span>
        </div>

        <button
          v-if="!notDeletecol.includes(col.name)"
          class="border bg-red-500 text-white px-2 rounded hover:bg-red-600"
          @click="columnStore.deletecolum(col)"
        >
          Delete
        </button>
      </div>

      <!-- Tasks -->
      <draggable
        :list="getFilteredTasks(col.id)"
        :group="{ name: 'tasks', pull: true, put: true }"
        item-key="id"
        class="flex flex-col gap-4 w-full h-full overflow-y-auto"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <Task
            :task="element"
            :data-task-id="element.id"
            @openedit="emit('editTask', $event)"
            @deletetask="emit('delete', $event)"
          />
        </template>
      </draggable>

      <!-- Add Task -->
      <button
        @click="emit('openAddTask', col.id)"
        class="mt-4 bg-indigo-600 text-white px-2 py-1 rounded text-sm hover:bg-indigo-700 w-auto"
      >
        ➕ Add Task
      </button>
    </div>
  </div>
</template>
