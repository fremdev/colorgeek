<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapActions } from 'vuex';
import AppHeader from './components/Header';

export default {
  name: 'app',
  components: {
    AppHeader,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      // User is signed in.
      if (user) {
        this.setCurrentUser({ nickname: user.displayName, uid: user.uid });
        this.$router.push('/');
      } else {
        // No user is signed in.
        this.clearCurrentUser();
      }
    });
  },
  methods: {
    ...mapActions({
      setCurrentUser: 'setCurrentUser',
      clearCurrentUser: 'clearCurrentUser',
    }),
  },
};
</script>

<style>
</style>
