import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useKanbanStore = defineStore("kanbanStore", () => {
  const tasks = ref([]);
  const showTask = ref(false);
  const showEdit = ref(false);
  const selecTedTask = ref(null);


  // toggle addTask model 
  function toggleAddTask() {
    showTask.value = !showTask.value;
    console.log(showTask.value);
  }

  //  Add Task
  function handleAddTask(newTask) {
    tasks.value.push(newTask);
    showTask.value = false;
  }

  // edit Task

  function editTask(task) {
    selecTedTask.value = task;
    showEdit.value = true;
    console.log(task);
    console.log(showEdit.value);
  }

  function updateTask(updatedTask) {
    const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = { ...updatedTask };
    }
    showEdit.value = false;
    selecTedTask.value = null;
  }

  //  Delete Task
  function handleDeleteTask(task) {
    if (confirm(`are you sure to delete the Task ${task.title}`)) {
      tasks.value = tasks.value.filter((t) => t.id !== task.id);
    }
  }

  // 🔹 Load tasks from localStorage
  function loadTasks() {
    const saved = localStorage.getItem("kanban-tasks");
    if (saved) {
      tasks.value = JSON.parse(saved);
    }
  }

  //  Auto-save tasks when changed
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem("kanban-tasks", JSON.stringify(newTasks));
    },
    { deep: true }
  );

  //  Load tasks immediately when store initializes
  loadTasks();

  return {
    tasks,
    showTask,
    handleAddTask,
    handleDeleteTask,
    loadTasks,
    handleDeleteTask,
    showEdit,
    editTask,
    selecTedTask,
    updateTask,
    toggleAddTask
  };
});
