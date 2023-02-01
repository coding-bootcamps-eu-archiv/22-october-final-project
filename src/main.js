import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ListComponent from "@/components/ListComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import SearchbarComponent from "@/components/SearchbarComponent";
import InputFormComponent from "@/components/InputFormComponent.vue";
import TiptapComponent from "@/components/TiptapComponent.vue";
const app = createApp(App).use(router);
app.component("ListComponent", ListComponent);
app.component("HeaderComponent", HeaderComponent);
app.component("ButtonComponent", ButtonComponent);
app.component("SearchbarComponent", SearchbarComponent);
app.component("InputFormComponent", InputFormComponent);
app.component("TiptapComponent", TiptapComponent);
app.mount("#app");
