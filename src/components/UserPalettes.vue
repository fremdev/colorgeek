<template>
  <div class="wrapper">
    <palette-container
      :user="currentUser"
      :palettes="reversedPalettes"
    ></palette-container>
  </div>
</template>

<script>
import PaletteContainer from './PaletteContainer';
import { db } from '../firebase';

export default {
  name: 'UserPalettes',
  components: {
    PaletteContainer,
  },
  created() {
    this.$bindAsArray('palettes', db.ref(`authors/${this.currentUser.uid}`));
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    reversedPalettes() {
      return [].concat(this.palettes).reverse();
    },
  },
  // firebase: {
  //   palettes: db.ref(this.user.uid).orderByKey().limitToLast(6),
  // },
};
</script>
