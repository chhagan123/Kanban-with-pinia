<script setup>
import Toolbar from "./Toolbar.vue"
import AddTask from "../components/taskmodel/AddTask.vue"
import AddColumn from "../components/taskmodel/AddColum.vue"
import EditTask from "../components/taskmodel/EditTask.vue"
import Column from "../components/TaskBoard/Column.vue"
import { useKanbanStore } from "../store/KanbanStore"
import { onMounted, ref, watch } from "vue"

// State

const activeColumnId = ref(null)
const showAddColumn = ref(false)
const columnRef = ref(null)
const searchTerm = ref("")
const searchAssignee = ref("")
const showEdit = ref(false)
const selectedTask = ref(null)

const theme = ref(true)


// Task Store 

const TaskStore = useKanbanStore()



// -------------------- Functions --------------------

// Theme toggle
function toggleTheme() {
  theme.value = !theme.value
}

// Search
function handleSearch(query) {
  searchTerm.value = query.toLowerCase()
}

function handleAssigneeSearch(query) {
  searchAssignee.value = query.toLowerCase()
}

// Toggle modals
function toggleTaskModal() {
    showEdit.value = !showEdit.value  
}

function toggleColumnModal() {
  showAddColumn.value = !showAddColumn.value
}

// Task updates
function updateTasks(newTasks) {
  tasks.value = [...newTasks] // trigger reactivity
}

function openAddTask(columnId) {
  activeColumnId.value = columnId
  TaskStore.showTask = true
}



function handleEditTask(task) {
  selectedTask.value = task
  showEdit.value = true 

}

function handleUpdateTask(updatedTask) {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = { ...updatedTask }
  }
  showEdit.value = false
}


// Column updates
function handleAddColumn(newCol) {
  columnRef.value.addColumn(newCol)
  showAddColumn.value = false
}


</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="mt-[4rem]">Welcome to Kanban Board</h1>

    <Toolbar
      @togglecol="toggleColumnModal"
      @search="handleSearch"
      @assignee="handleAssigneeSearch"
      @theme="toggleTheme"
      :theme="theme"
      :onToggleTheme="toggleTheme"
    />

    <Column
      ref="columnRef"
      :tasks="tasks"
      :showAddColunm="showAddColumn"
      :searchTerm="searchTerm"
      :theme="theme"
      :searchAssine="searchAssignee"
      @openAddTask="openAddTask"
      @updateTasks="updateTasks"
      @editTask="handleEditTask"
     
    />

    <AddTask
      v-if="TaskStore.showTask"
      :column-id="activeColumnId"
      @addTask="TaskStore.handleAddTask"
      @close="toggleTaskModal"
    />

    <AddColumn
      v-if="showAddColumn"
      @addColumn="handleAddColumn"
      @close="toggleColumnModal"
    />

    <EditTask
      v-if="showEdit"
      v-model="showEdit"
      :task="selectedTask"
      @update-task="handleUpdateTask"
    />
  </div>
</template>
