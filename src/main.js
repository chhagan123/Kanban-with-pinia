import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

// register Pinia in store
app.use(createPinia());

// mount with #app
app.mount("#app");


