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
    tryLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          const user = firebase.auth().currentUser;
          console.log(user);
        })
        .catch((error) => {
          console.log('Login error:', error.message);
        });
    },
  },
};
</script>

<style>
</style>
