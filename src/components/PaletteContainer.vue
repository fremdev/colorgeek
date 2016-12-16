<template>
  <div>
    <palette-item
      v-for="(palette, key) in $store.state.palettes"
     :colors="palette" :palette="key" :key="key"></palette-item>
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
