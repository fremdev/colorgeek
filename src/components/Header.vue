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
    background-color: #52658f;
    color: #fff;
  }
  .logo__title {
    cursor: pointer;
    color: #99d3df;
    text-shadow: #30415d 2px 2px 2px;
  }

  .wrapper {
    padding-top: 102px;
  }

  @media (max-width: 800px) {
    .header {
      flex-wrap: wrap;
    }
    .wrapper {
      padding-top: 131px;
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
      padding-top: 87px;
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
      padding-top: 105px;
    }
  }

</style>
