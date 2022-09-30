<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../hooks/useAuth';

const { login } = useAuth();
const router = useRouter();

const loginRequest = ref({
  email: '',
  password: ''
});

const onSubmit = async() => {
  const { ok, message } = await login( loginRequest.value );
  console.log(message);
	if ( !ok ) {
    return;
  }
  router.push({ name: 'home' });
}

</script>

<template>
  <div>
    <h1>My Library</h1>
  </div>
  <div>
    <form @submit.prevent="onSubmit" autocomplete="off">
      <div class="form-group mt-2">
        <label for="username">Email</label>
        <input type="email" class="form-control" id="email" v-model="loginRequest.email" />
      </div>
      <div class="form-group mt-2">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="loginRequest.password" />
      </div>
      <div class="mt-2">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>
