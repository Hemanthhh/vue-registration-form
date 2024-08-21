import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import ThankYou from '../ThankYou.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';

// Mock Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/thank-you/:name', name: 'ThankYou', component: ThankYou },
  ],
});

describe('ThankYou.vue', () => {
  it('displays a thank you message with the user name', async () => {
    const app = createApp(ThankYou);
    app.use(router);

    // Mount the component with a mock route
    const wrapper = mount(ThankYou, {
      global: {
        plugins: [router],
      },
      props: {
        name: 'TestUser',
      },
    });

    // Wait for the router to resolve
    await router.isReady();

    expect(wrapper.text()).toContain('Thank You! Hello, ! Thank you for registering. We are excited to have you on board. Go Back to Home');
  });

  it('navigates to the home page on button click', async () => {
    const app = createApp(ThankYou);
    app.use(router);

    const wrapper = mount(ThankYou, {
      global: {
        plugins: [router],
      },
      props: {
        name: 'TestUser',
      },
    });

    // Wait for the router to resolve
    await router.isReady();

    // Find and click the "Go Back to Home" button
    const button = wrapper.find('button');
    await button.trigger('click');

    // Assert that the router has navigated to the home page
    expect(wrapper.vm.$route.path).toBe('/');
  });
});
