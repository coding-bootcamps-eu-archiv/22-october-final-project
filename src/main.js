import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ListComponent from "@/components/ListComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

const app = createApp(App).use(router);
app.component("ListComponent", ListComponent);
app.component("HeaderComponent", HeaderComponent);
app.mount("#app");
