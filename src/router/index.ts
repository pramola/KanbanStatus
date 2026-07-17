import { createRouter, createMemoryHistory, RouteRecordRaw } from "vue-router";
import StatesView from "../views/StatesView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: StatesView
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;
