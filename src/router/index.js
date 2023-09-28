import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//rutas
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/IniciarSesion.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "/home/buscar",
        name: "Buscar",
        component: () => import("@/views/Buscar.vue"),
      },
      {
        path: "/home/subir",
        name: "Subir",
        component: () => import("@/views/Subir.vue"),
      },
      {
        path: "/home/crear-manual",
        name: "Crear Manual",
        component: () => import("@/components/crearConexion.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
