<script setup lang="ts">
import { ref } from "vue";
import { useKanbanStore } from "../../store/KanbanStore";

// crud store
const TaskStore = useKanbanStore();

const props = defineProps({
  columnId: {
    type: String,
    required: false, // ✅ make it optional
    default: null,
  },
});

const title = ref<string>("");
const description = ref<string>("");
const Assignees = ref<string>("");
const date = ref<string>("");
const Assignee: string[] = ["chhagan", "Nandu", "Rishabh"];

const emit = defineEmits(["close", "addTask"]);

function close() {
  emit("close");
}

function AddTask(): void {
  const Task = {
    id: Date.now().toString(),
    title: title.value,
    description: description.value,
    Assignees: Assignees.value,
    date: date.value,
    columnId: props.columnId,
  };
  emit("addTask", Task);
  emit("close"); // Emitting close after adding the task
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="bg-white w-[400px] p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-bold mb-4">Add Task</h2>
      <!-- Use a form element and handle the submit event -->
      <form @submit.prevent="AddTask">
        <input
          v-model="title"
          type="text"
          placeholder="Enter Title"
          class="border w-full p-2 rounded mb-3"
          required
        />

        <textarea
          v-model="description"
          placeholder="Enter Description"
          class="border w-full p-2 rounded mb-3"
        ></textarea>

        <select
          v-model="Assignees"
          class="border w-full p-2 rounded mb-3"
          required
        >
          <option disabled value="">Select Assignee</option>
          <option v-for="(a, index) in Assignee" :key="index" :value="a">
            {{ a }}
          </option>
        </select>

        <input
          v-model="date"
          type="date"
          class="border w-full p-2 rounded mb-4"
          required
        />

        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="TaskStore.toggleAddTask()"
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <!-- The button is now type="submit" to trigger form validation -->
          <button
            type="submit"
            class="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
