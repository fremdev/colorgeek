<template>
  <div class="navigation">
    <span v-if="!user.nickname">
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
      >Logged as {{ user.nickname }}</span>
      <router-link
        to="/my-palettes"
        class="menu-item"
        activeClass="menu-item--active"
      >My Palettes</router-link>
      <router-link
        to="/public"
        class="menu-item"
        activeClass="menu-item--active"
      >Public</router-link>
      <router-link
        to="/popular"
        class="menu-item"
        activeClass="menu-item--active"
      >Popular</router-link>
      <span
        class="menu-item"
        @click="addNewUserPalette(user)"
      >Add New</span>
      <span
        class="menu-item"
        @click="onLogout"
      >Log Out</span>
    </span>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapActions } from 'vuex';

export default {
  name: 'NavBar',
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    ...mapActions({
      addNewUserPalette: 'addNewUserPalette',
    }),
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
