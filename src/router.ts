import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/useradd',
    //   name: 'useradd',
    //   component: () => import('@/views/UserAdd.vue'),
    // },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UserForm.vue'),
    },
  ],
});
