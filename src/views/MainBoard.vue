<script setup lang="ts">
import Toolbar from "./Toolbar.vue";
import AddTask from "../components/taskmodel/AddTask.vue";
import AddColumn from "../components/taskmodel/AddColum.vue";
import EditTask from "../components/taskmodel/EditTask.vue";
import Column from "../components/TaskBoard/Column.vue";
import { useKanbanStore } from "../store/KanbanStore";
import { useColumStore } from "../store/ColumStore";
import { onMounted, ref, watch } from "vue";

// State
const columnStore = useColumStore();
const activeColumnId = ref<any>(null);
const showAddColumn = ref<boolean>(false);
const searchTerm = ref<string>("");
const searchAssignee = ref<string>("");
// CRUD Task Store
const TaskStore = useKanbanStore();
// Search
function handleSearch(query) {
  searchTerm.value = query.toLowerCase();
}
// handle assignee search
function handleAssigneeSearch(query) {
  searchAssignee.value = query.toLowerCase();
}
// toggle column modal
function toggleColumnModal() {
  showAddColumn.value = !showAddColumn.value;
}
// open add task modal
function openAddTask(columnId:string) {
  activeColumnId.value = columnId;
  TaskStore.showTask = true;
}
// handle add column

function handleAddColumn(newcol:{ id: string; name: string }) {
  columnStore.addcolumn(newcol);
  showAddColumn.value = false;
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="mt-[4rem]">Welcome to Kanban Board</h1>

    <Toolbar
      @togglecol="toggleColumnModal"
      @search="handleSearch"
      @assignee="handleAssigneeSearch"
    />

    <Column
      :showAddColunm="showAddColumn"
      :searchTerm="searchTerm"
      :searchAssine="searchAssignee"
      @openAddTask="openAddTask"
    />

    <AddTask
      v-if="TaskStore.showTask"
      :column-id="activeColumnId"
      @addTask="TaskStore.handleAddTask"
    />

    <AddColumn
      v-if="showAddColumn"
      @addColumn="handleAddColumn"
      @close="toggleColumnModal"
    />

    <EditTask
      v-if="TaskStore.showEdit"
      v-model="TaskStore.showEdit"
      :task="TaskStore.selecTedTask"
    />
  </div>
</template>
