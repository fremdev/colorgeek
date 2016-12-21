<template>
  <div class="wrapper">
    <palette-container
      :user="currentUser"
      :palettes="reversedPalettes"
      :isPublic="true"
    ></palette-container>
  </div>
</template>

<script>
import PaletteContainer from './PaletteContainer';
import { db } from '../firebase';

export default {
  name: 'Board',
  components: {
    PaletteContainer,
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    reversedPalettes() {
      return [].concat(this.palettes).reverse();
    },
  },
  firebase: {
    palettes: db.ref('public').orderByKey().limitToLast(6),
  },
};
</script>
