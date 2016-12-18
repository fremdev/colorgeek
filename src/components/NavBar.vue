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
  </div>
</template>

<script>
export default {

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
