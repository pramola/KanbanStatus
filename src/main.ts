import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon as any);
app.mount("#app");
