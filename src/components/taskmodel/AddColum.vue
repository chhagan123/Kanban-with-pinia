<script setup lang="ts">
import { ref } from "vue";

const newColumn = ref<string>("");
const emit = defineEmits(["addColumn", "close"]);
import { useColumStore } from "../../store/ColumStore";

// define column store

const columnStore = useColumStore();

function submitColumn() {
  if (!newColumn.value.trim()) return;
  emit("addColumn", {
    id: Date.now().toString(),
    name: newColumn.value.trim(),
  });

  newColumn.value = "";
  // emit("close");
}
</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow-lg w-80 flex flex-col gap-3">
      <h1 class="text-lg font-bold">Add Column</h1>
      <input
        class="border p-2 rounded w-full"
        placeholder="Enter column Name"
        v-model="newColumn"
      />
      <div class="flex justify-end gap-2">
        <button @click="emit('close')" class="px-3 py-1 border rounded">
          Cancel
        </button>
        <button
          @click="submitColumn"
          class="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
