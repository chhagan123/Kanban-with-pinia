import { defineStore } from "pinia";
import { ref, watch } from "vue";

// Define Task type

export type Task = {
  id:string;
  title:string;
  description:string;
  Assignees:String;
  date:any;
  columnId: String | number

}

export const useKanbanStore = defineStore("kanbanStore", () => {
  const tasks = ref<Task[]>([]);
  const showTask= ref(false);
  const showEdit = ref(false);
  const selecTedTask = ref<Task | null>(null);

  // toggle addTask model
  function toggleAddTask():void {
    showTask.value = !showTask.value;
    console.log(showTask.value);
  } 

  //  Add Task
  function handleAddTask(newTask:Task):void {
    tasks.value.push(newTask);
    showTask.value = false;
  }

  // edit Task

  function editTask(task:Task): void{
    selecTedTask.value = task;
    showEdit.value = true;
    console.log(task);
    console.log(showEdit.value);
  }

  function updateTask(updatedTask:Task): void {
    const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = { ...updatedTask };
    }
    showEdit.value = false;
    selecTedTask.value = null;
  }

  //  Delete Task
  function handleDeleteTask(task:Task):void {
    if (confirm(`are you sure to delete the Task ${task.title}`)) {
      tasks.value = tasks.value.filter((t) => t.id !== task.id);
    }
  }

  // 🔹 Load tasks from localStorage
  function loadTasks():void {
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
    toggleAddTask,
  };
});
