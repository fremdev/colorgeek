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
    <span v-if="user.nickname">
      <span
        class="menu-status"
      >Logged as {{ user.nickname }}</span>
    </span>
    <span v-if="user.nickname">
      <router-link
        to="/my-palettes"
        class="menu-item"
        activeClass="menu-item--active"
      >My Palettes</router-link>
      <router-link
        to="/create"
        class="menu-item"
        activeClass="menu-item--active"
      >Create New</router-link>
      <span
        class="menu-item"
        @click="onLogout"
      >Log Out</span>
    </span>
    <span>
      <router-link
        to="/public"
        class="menu-item"
        activeClass="menu-item--active"
      >Public</router-link>
      <router-link
        to="/picked"
        class="menu-item"
        activeClass="menu-item--active"
      >Picked</router-link>
      <router-link
        to="/popular"
        class="menu-item"
        activeClass="menu-item--active"
      >Popular</router-link>
      <router-link
        to="/about"
        class="menu-item"
        activeClass="menu-item--active"
      >About</router-link>
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
    addPalette() {
      this.addNewUserPalette(this.user);
    },
  },
};
</script>

<style scoped>
  .navigation {
    display: flex;
    flex-direction: column;
  }
  .menu-item {
    padding: 1px;
    margin-right: 10px;
    color: #fff;
    cursor: pointer;
  }
  .menu-item--active {
    background-color: #99d3df;
    color: #30415d;
    font-weight: bold;
  }
  .menu-status {
    margin-right: 10px;
  }

  @media (max-width: 580px) {
    .menu-status {
      display: none;
    }
  }
  @media (max-width: 505px) {
    .navigation {
      flex: 0 1 100%;
      text-align: center;
    }
  }
</style>
