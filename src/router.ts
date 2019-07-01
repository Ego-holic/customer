import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/userregister',
      name: 'register',
      component: () => import('@/views/UserRegister.vue'),
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( '@/views/test.vue'),
    },
  ],
});
