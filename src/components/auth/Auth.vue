<template>
  <div class="auth-container">
    <error-message v-if="errorMessage" :message="errorMessage"></error-message>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ErrorMessage from '../ErrorMessage';

export default {
  name: 'Auth',
  components: {
    ErrorMessage,
  },
  computed: {
    ...mapState({
      errorMessage: 'errorMessage',
    }),
  },
};
</script>

<style>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
