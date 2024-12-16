import { createRouter, createWebHistory } from 'vue-router';
import login from '../views/login/login.vue';
import Dashboard from '../views/Dashboard/Dashboard.vue';
// import Tabla from '../views/Tabla/Tabla.vue';
import Error404 from '../views/Error404/Error404.vue';

const routes = [
  { path: '/', component: login },
  { path: '/dashboard', component: Dashboard },
  // { path: '/tabla', component: Tabla },
  { path: '/:pathMatch(.*)*', component: Error404 }, // Manejar 404
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
