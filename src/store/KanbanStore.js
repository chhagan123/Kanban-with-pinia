import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useKanbanStore = defineStore("kanbanStore", () => {
  const tasks = ref([]);
  const showTask = ref(false);
  const showEdit = ref(false)

  //  Add Task
  function handleAddTask(newTask) {
    tasks.value.push(newTask);
    showTask.value = false;
  }

  // edit Task 

  function showEditModel() {
    showEdit.value = !showEdit.value
  }

  function hanldeEditTask(task){


  } 

  //  Delete Task
  function handleDeleteTask(task) {
    if(confirm(`are you sure to delete the Task ${task.title}`)){
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

  return { tasks, showTask, handleAddTask, handleDeleteTask, loadTasks ,handleDeleteTask,showEdit};
});
