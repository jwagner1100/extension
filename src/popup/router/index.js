import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
     {
          path: "/",
          name: "Home",
          component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
     },
     {
          path: "/settings",
          name: "Settings",
          component: () => import(/* webpackChunkName: "about" */ "../views/Settings.vue"),
     },
     {
          path: "/login",
          name: "Login",
          component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
     },
];

const router = new VueRouter({
     routes,
});

export default router;
