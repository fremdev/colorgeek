<template>
  <div>
    <palette-item
      v-for="palette in palettes"
     :colors="palette.colors" :palette="palette['.key']" :key="palette['.key']"></palette-item>
  </div>
</template>

<script>
import PaletteItem from './PaletteItem';
import db from '../firebase';

export default {
  name: 'PaletteContainer',
  components: {
    PaletteItem,
  },
  firebase: {
    palettes: db.ref('palettes'),
  },
};
</script>

<style scoped>
</style>
