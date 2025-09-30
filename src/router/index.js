import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/countries-page',
      name: 'countries-page',
      component: () => import('@/views/CountriesPage.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/Favorites.vue'),
    },
    {
      path: '/countries-page-composition-api-style',
      name: 'countries-page-composition-api-style',
      component: () => import('@/views/countryPageCompositionApiStyle.vue'),
    },
    {
      path: '/country/:code',
      name: 'CountryDetail',
      component: () => import('@/views/CountryDetail.vue'),
      props: true
    },
    {
      path: '/country/:code',
      name: 'CountryDetailsGraphQL',
      component: () => import('@/views/CountryDetailsGraphQL.vue'),
      props: true
    },
  ],
});

export default router;
