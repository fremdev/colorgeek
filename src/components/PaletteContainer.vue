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
      <rotate-loader :loading="isLoading"></rotate-loader>
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
      isLoading: state => state.public.isLoading,
    }),
  },
};
</script>

<style scoped>
  .palette-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 102px;
  }
  .loader {
    margin-top: 50px;
    text-align: center;
  }
  @media (max-width: 800px) {
    .palette-container {
      padding-top: 126px;
    }
  }

  @media (max-width: 580px) {
    .palette-container {
      padding-top: 82px;
    }
  }

  @media (max-width: 505px) {
    .palette-container {
      padding-top: 100px;
    }
  }
</style>
