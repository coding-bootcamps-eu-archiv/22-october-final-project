import { createRouter, createWebHistory } from "vue-router";
import AdminView from "../views/AdminView.vue";

const routes = [
  {
    path: "/",
    name: "Admin",
    component: AdminView,
  },
  {
    path: "/Attendee",
    name: "Attendee",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AttendeeView.vue"),
  },
  {
    path: "/Create",
    name: "Create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AttendeeView2.vue"),
  },
  {
    path: "/Edit/:id",
    name: "Edit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
