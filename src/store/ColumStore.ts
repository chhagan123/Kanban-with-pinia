import { Type } from "lucide-vue-next";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import Column from "../components/TaskBoard/Column.vue";

export type Colum = {
  id: string;
  name: string;
};

export const useColumStore = defineStore("column", () => {
  const columns = ref<Colum[]>([]);

  // add new colum
  function addcolumn(newcolum: Colum) {
    columns.value.push(newcolum);
  }

  // delete colum

  function deletecolum(column: Colum) {
    if (confirm(`Are you sure you want to delete column "${column.name}"?`)) {
      columns.value = columns.value.filter((c) => c.id !== column.id);
    }
  }

  // set newcolums to local storage

  watch(
    columns,
    (newcol) => {
      localStorage.setItem("kanban-col", JSON.stringify(newcol));
    },
    { deep: true }
  );

  // load colums from local storage
  function loadColums() {
    const savedcol = localStorage.getItem("kanban-col");
    console.log("yehai", savedcol);
    if (savedcol) {
      columns.value = JSON.parse(savedcol) as Colum[];
    } else {
      columns.value = [
        { id: "todo", name: "Todo" },
        { id: "progress", name: "Progress" },
        { id: "done", name: "Done" },
      ];
    }
  }

  loadColums();

  return { columns, addcolumn, loadColums, deletecolum };
});
