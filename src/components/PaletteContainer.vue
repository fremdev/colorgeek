<template>
  <div>
    <div class="palette-container">
      <palette-item
        v-for="(palette, key) in palettes"
        :palette="palette"
        :user="user"
        :index="key"
        :key="palette.key"
        :isPublic="isPublic"
        ></palette-item>
    </div>
    <div class="loader">
      <rotate-loader :loading="isLoadingPublic || isLoadingPrivate"></rotate-loader>
    </div>
  </div>

</template>

<script>
import RotateLoader from 'vue-spinner/src/RotateLoader';
import { mapState } from 'vuex';
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
    RotateLoader,
  },
  computed: {
    ...mapState({
      isLoadingPublic: state => state.public.isLoading,
      isLoadingPrivate: state => state.private.isLoading,
    }),
  },
};
</script>

<style scoped>
  .palette-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .loader {
    margin-top: 50px;
    text-align: center;
  }
</style>
