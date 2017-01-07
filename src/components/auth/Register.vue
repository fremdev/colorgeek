<template>
  <div class="login">
    <h3>Register:</h3>
    <form @submit.prevent="createUser">
      <div class="form-group">
        <label>Nickname
          <input
            type="text"
            class="form-control"
            placeholder="nickname"
            v-model="nickname"
          >
        </label>
      </div>
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
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      isError: false,
    };
  },
  destroyed() {
    if (this.isError) {
      this.setErrorMessage('');
    }
  },
  methods: {
    ...mapActions({
      setErrorMessage: 'setErrorMessage',
    }),
    createUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        user.updateProfile({
          displayName: this.nickname,
        });
      })
      .catch((error) => {
        this.setErrorMessage(error.message);
        this.isError = true;
      });
    },
  },
};
</script>

<style>
</style>
