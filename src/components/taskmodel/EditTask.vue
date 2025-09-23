<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true }, // for showing/hiding modal
  task: { type: Object, required: true },
});

const emit = defineEmits(["update:modelValue", "update-task"]);

// Close modal
function closeModal() {
  emit("update:modelValue", false);
}

// Save changes
function saveTask() {
  emit("update-task", { ...props.task }); // send updated task back
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
        <!-- Title -->
        <input
          v-model="task.title"
          required
          type="text"
          placeholder="Title"
          class="w-full p-2 border rounded"
        />

        <!-- Description -->
        <textarea
          v-model="task.description"
          placeholder="Description"
          class="w-full p-2 border rounded"
        ></textarea>

        <!-- Assignees -->
        <input
          v-model="task.Assignees"
          type="text"
          placeholder="Assignee"
          class="w-full p-2 border rounded"
        />

        <!-- Date -->
        <input
          v-model="task.date"
          type="date"
          class="w-full p-2 border rounded"
        />
      </div>

      <!-- Buttons -->
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
