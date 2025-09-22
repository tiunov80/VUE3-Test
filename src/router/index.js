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
    }, {
      path: '/countries-page-composition-api-style',
      name: 'countries-page-composition-api-style',
      component: () => import('../views/countryPageCompositionApiStyle.vue'),
    },
    {
      path: '/country/:code',
      name: 'CountryDetail',
      component: () => import('@/views/CountryDetail.vue'),
      props: true
    },
  ],
});

export default router;
