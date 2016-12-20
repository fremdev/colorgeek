<template>
  <div class="navigation">
    <router-link
      to="/auth/register"
      class="menu-item"
      activeClass="menu-item--active"
    >Sign Up</router-link>
    <router-link
      to="/auth/login"
      class="menu-item"
      activeClass="menu-item--active"
    >Sign In</router-link>
    <span
      class="menu-item"
      @click.prevent="onLogout"
    >Log Out</span>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  methods: {
    onLogout() {
      firebase.auth().signOut();
    },
  },
};
</script>

<style scoped>
  .navigation {
    padding: 10px 20px;
  }
  .menu-item {
    margin-right: 10px;
  }
  .menu-item--active {
    background-color: #9999ee;
    color: #fff;
  }
</style>
