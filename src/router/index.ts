import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from '../components/RegistrationForm.vue';
import ThankYou from '../components/ThankYou.vue';

const routes = [
  {
    path: '/',
    name: 'RegistrationForm',
    component: RegistrationForm,
  },
  {
    path: '/thank-you/:name',
    name: 'ThankYou',
    component: ThankYou,
    props: true,
  },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
