import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/provider',
      name: 'provider',
      component: () => import('../views/Provider.vue'),
    },
    {
      path: '/sms',
      name: 'sms',
      component: () => import('../views/Sms.vue'),
    },
    {
      path: '/sms-template',
      name: 'sms-template',
      component: () => import('../views/SmsTemplate.vue'),
    },
    {
      path: '/email',
      name: 'email',
      component: () => import('../views/Email.vue'),
    },
  ],
});

export default router;
