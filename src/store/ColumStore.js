import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useColumStore = defineStore("column", () => {
  const columns = ref([]);

  // add new colum
  function addcolumn(newcolum) {
    console.log(newcolum);

    columns.value.push(newcolum);
    console.log(columns.value);
  }

  // delete colum

  function deletecolum(column) {
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
      columns.value = JSON.parse(savedcol);
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
