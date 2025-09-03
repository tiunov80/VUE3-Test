import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/countries-page',
      name: 'countries-page',
      component: () => import('../views/CountriesPage.vue'),
    },
    {
      path: '/posts/:id',
      name: 'posts',
      component: () => import('../views/postIdPage.vue'),
    },
  ],
});

export default router;
