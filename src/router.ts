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
      component: () => import('@/views/users/UserAdd.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/users/UserForm.vue'),
    },
    {
      path: '/useredit/:id',
      name: 'useredit',
      component: () => import('@/views/users/UserInfoEdit.vue'),
    },
    // {
    //   path: '/assignroles/:id',
    //   name: 'assignroles',
    //   component: () => import('@/views/users/UserAssginRole.vue'),
    // }
    // {
    //   path: '/changepassword',
    //   name:'changepassword/:id',
    //   component: () => import('@/views/users/UserChangePassword.vue')
    // }
  ],
});
