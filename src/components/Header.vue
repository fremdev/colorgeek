<template>
  <div class="header">
    <div class="logo">
      <router-link class="logo__title" tag="h1" to="/">ColorGeek</router-link>
      <p>Make your color palette on ColorGeek</p>
    </div>
    <nav-bar :user="currentUser"></nav-bar>
    <color-controls></color-controls>
  </div>

</template>

<script>
import NavBar from './NavBar';
import Controls from './Controls';

export default {
  components: {
    NavBar,
    ColorControls: Controls,
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style scoped>
  .header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  .logo__title {
    cursor: pointer;
    color: #5454c5;
  }
</style>
