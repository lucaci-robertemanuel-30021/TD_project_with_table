import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/devices",
    name: "devices",
    component: () => import("./components/DevicesList.vue"),
  },
  {
    path: "/devices/:id",
    name: "device-details",
    component: () => import("./components/DeviceDetails.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddDevice.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
