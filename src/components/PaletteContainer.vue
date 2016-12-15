<template>
  <div>
    <palette-item
      v-for="palette in $store.state.palettes"
     :colors="palette"></palette-item>
  </div>
</template>

<script>
import PaletteItem from './PaletteItem';

export default {
  components: {
    PaletteItem,
  },
};
</script>

<style scoped>
</style>
