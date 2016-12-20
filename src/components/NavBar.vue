<template>
  <div class="navigation">
    <span v-if="!user.email">
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
    </span>
    <span v-else>
      <span
        class="menu-status"
      >Logged as {{ user.email }}</span>
      <span
        class="menu-item"
        @click.prevent="onLogout"
      >Log Out</span>
    </span>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'NavBar',
  props: {
    user: {
      type: Object,
    },
  },
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
    color: #9988ff;
    cursor: pointer;
  }
  .menu-item--active {
    background-color: #9999ee;
    color: #fff;
  }
  .menu-status {
    margin-right: 10px;
  }
</style>
