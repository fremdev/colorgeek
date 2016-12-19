<template>
  <div>
    <palette-item
      v-for="palette in palettes"
     :palette="palette" :key="palette['.key']"></palette-item>
  </div>
</template>

<script>
import PaletteItem from './PaletteItem';

export default {
  name: 'PaletteContainer',
  props: {
    palettes: {
      type: Array,
    },
  },
  components: {
    PaletteItem,
  },
};
</script>

<style scoped>
</style>
