<template>
  <div class="login">
    <h3>Register:</h3>
    <form @submit.prevent="createUser">
      <div class="form-group">
        <label>Email address
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
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
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    createUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
        console.log('Registration error:', error.message);
      });
    },
  },
};
</script>

<style>
</style>
