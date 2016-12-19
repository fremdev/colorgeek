<template>
  <div class="login">
    <h3>Login:</h3>
    <form @submit.prevent="tryLogin">
      <div class="form-group">
        <label>Email address
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="username"
          >
        </label>
      </div>
      <div class="form-group">
        <label>Password
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          >
        </label>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    tryLogin() {
      console.log('login');
    },
  },
};
</script>

<style>
</style>
