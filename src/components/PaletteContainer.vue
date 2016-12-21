<template>
  <div class="palette-container">
    <palette-item
      v-for="palette in palettes"
      :palette="palette"
      :user="user"
      :key="palette['.key']"
      :isPublic="isPublic"
      ></palette-item>
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
    user: {
      type: Object,
    },
    isPublic: {
      type: Boolean,
    },
  },
  components: {
    PaletteItem,
  },
};
</script>

<style scoped>
  .palette-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
