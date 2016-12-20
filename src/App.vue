<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase';
import AppHeader from './components/Header';

export default {
  name: 'app',
  components: {
    AppHeader,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User loggedIN from App.vue');
    // User is signed in.
      } else {
    // No user is signed in.
        console.log('User loggeOUT from App.vue');
      }
    });
  },
};
</script>

<style>
</style>
