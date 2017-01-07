<template>
  <div class="auth-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Auth',
};
</script>

<style>
.auth-container {
  display: flex;
  justify-content: center;
  padding-top: 102px;
}
@media (max-width: 800px) {
  .auth-container {
    padding-top: 176px;
  }
}

@media (max-width: 580px) {
  .auth-container {
    padding-top: 132px;
  }
}

@media (max-width: 505px) {
  .auth-container {
    padding-top: 150px;
  }
}
</style>
