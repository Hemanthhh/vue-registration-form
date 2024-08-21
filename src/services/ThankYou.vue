<template>
  <div class="container mt-5 text-center">
    <div class="card shadow p-4">
      <h2 class="display-4">Thank You!</h2>
      <p class="lead">
        Hello, {{ name }}! Thank you for registering. We are excited to have you on board.
      </p>
      <button class="btn btn-primary mt-3" @click="goToHome">Go Back to Home</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'ThankYou',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const name = route.params.name as string; // Use route.params to get the name

    const goToHome = () => {
      router.push('/');
    };

    return { name, goToHome };
  },
});
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
