import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
  
  },
  {
    path: "/:lang/list/:type",
    name: "list",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/:lang/about/:type/:id",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutMovie.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
