<template>
  <div class="error-message">
    <h5>Error occured:</h5> {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
  },
};
</script>

<style>
  .error-message {
    background-color: #ffeeee;
    color: #ff3333;
    padding: 5px 15px;
    margin-bottom: 20px;
  }
</style>
