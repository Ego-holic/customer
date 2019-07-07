import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/useradd',
      name: 'useradd',
      component: () => import('@/components/UserAdd.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UserForm.vue'),
    },
    {
      path: '/useredit/:id',
      name: 'useredit',
      component: () => import('@/views/UserInfoEdit.vue'),
    },
  ],
});
