<script setup>
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

const activeColumnId = ref(null);
const showAddColumn = ref(false);
const searchTerm = ref("");
const searchAssignee = ref("");

// CRUD Task Store

const TaskStore = useKanbanStore();

// -------------------- Functions --------------------

// Search
function handleSearch(query) {
  searchTerm.value = query.toLowerCase();
}

function handleAssigneeSearch(query) {
  searchAssignee.value = query.toLowerCase();
}

function toggleColumnModal() {
  showAddColumn.value = !showAddColumn.value;
}

function openAddTask(columnId) {
  activeColumnId.value = columnId;
  TaskStore.showTask = true;
}

function handleAddColumn(newcol) {
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
