<template>
  <div class="container mt-5">
    <h2>Registration Form</h2>
    <form @submit.prevent="submitForm">
      <!-- Name Field -->
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input 
          v-model="formState.name" 
          type="text" 
          id="name" 
          class="form-control" 
          :class="{ 'is-invalid': errors.name }" 
          @blur="validateName" 
        />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <!-- Username Field -->
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input 
          v-model="formState.username" 
          type="text" 
          id="username" 
          class="form-control" 
          :class="{ 'is-invalid': errors.username }" 
          @blur="validateUsername" 
        />
        <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
      </div>

      <!-- Email Field -->
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input 
          v-model="formState.email" 
          type="email" 
          id="email" 
          class="form-control" 
          :class="{ 'is-invalid': errors.email }" 
          @blur="validateEmail" 
        />
        <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <!-- Password Field -->
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input 
          v-model="formState.password" 
          type="password" 
          id="password" 
          class="form-control" 
          :class="{ 'is-invalid': errors.password }" 
          @blur="validatePassword" 
        />
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <!-- Confirm Password Field -->
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input 
          v-model="formState.confirmPassword" 
          type="password" 
          id="confirmPassword" 
          class="form-control" 
          :class="{ 'is-invalid': errors.confirmPassword }" 
          @blur="validateConfirmPassword" 
        />
        <div v-if="errors.confirmPassword" class="invalid-feedback">{{ errors.confirmPassword }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import registrationService from '../services/registrationService';

export default defineComponent({
  name: 'RegistrationForm',
  setup() {
     const router = useRouter();
    const formState = reactive({
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const errors = reactive({
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const validateName = () => {
      errors.name = !formState.name ? 'Name is required.' : '';
    };

    const validateUsername = () => {
      if (!formState.username) {
        errors.username = 'Username is required.';
      } else if (!/^[a-zA-Z0-9]+$/.test(formState.username)) {
        errors.username = 'Username can only contain letters and numbers.';
      } else {
        errors.username = '';
      }
    };

    const validateEmail = () => {
      if (!formState.email) {
        errors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
        errors.email = 'Email must be valid.';
      } else {
        errors.email = '';
      }
    };

    const validatePassword = () => {
      if (!formState.password) {
        errors.password = 'Password is required.';
      } else if (!/(?=.*[@$#]).{8,}/.test(formState.password)) {
        errors.password = 'Password must be at least 8 characters and contain atlease one special character from @ $ #.';
      } else {
        errors.password = '';
      }
    };

    const validateConfirmPassword = () => {
      errors.confirmPassword = formState.confirmPassword !== formState.password
        ? 'Passwords do not match.'
        : '';
    };

    const validateForm = () => {
      validateName();
      validateUsername();
      validateEmail();
      validatePassword();
      validateConfirmPassword();

      return !Object.values(errors).some((error) => error);
    };

    const submitForm = async () => {
      if (validateForm()) {
        try {
          const response = await registrationService.register({
            name: formState.name,
            username: formState.username,
            email: formState.email,
            password: formState.password,
          });
          console.log('Registration successful', response);
          // Redirect to the Thank You page and pass the user's name
          window.location.href = `/thank-you/${formState.name}`
        } catch (error) {
          console.error('Registration failed', error);
        }
      }
    };

    return {
      formState,
      errors,
      submitForm,
      validateName,
      validateUsername,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
    };
  },
});
</script>
