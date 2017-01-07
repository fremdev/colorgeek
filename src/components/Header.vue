<template>
  <div class="header">
    <div class="logo">
      <router-link class="logo__title" tag="h1" to="/">ColorGeek</router-link>
      <p>Make & share your color palette</p>
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

<style>
  .header {
    width: 100%;
    padding: 10px 20px 0px;
    display: flex;
    justify-content: space-between;
    position: fixed;
  }
  .logo__title {
    cursor: pointer;
    color: #5454c5;
  }

  .wrapper {
    padding-top: 102px;
  }

  @media (max-width: 800px) {
    .header {
      flex-wrap: wrap;
    }
    .wrapper {
      padding-top: 126px;
    }
  }

  @media (max-width: 580px) {
    .logo__title {
      font-size: 32px;
    }
    .logo p {
      display: none;
    }
    .wrapper {
      padding-top: 82px;
    }
  }

  @media (max-width: 505px) {
    .logo {
      flex: 0 1 100%;
    }
    .logo__title {
      font-size: 26px;
      text-align: center;
      margin-bottom: 0px;
    }
    .header {
      padding: 0;
    }
    .wrapper {
      padding-top: 100px;
    }
  }

</style>
