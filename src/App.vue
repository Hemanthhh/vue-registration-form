<template>
  <div id="app">
    <header class="bg-primary text-white p-3 text-center">
      <h1>Registration App</h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegistrationForm from './components/RegistrationForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    RegistrationForm,
  },
});
</script>

<style scoped>
#app {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

header {
  margin-bottom: 20px;
}

main {
  padding: 20px;
}
</style>
