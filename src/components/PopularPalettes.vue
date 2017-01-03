<template>
  <div class="wrapper">
    <palette-container
      :user="user"
      :palettes="palettes"
      :isPublic="true"
    ></palette-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PaletteContainer from './PaletteContainer';

/* eslint-disable no-undef */
export default {
  name: 'PopularPalettes',
  components: {
    PaletteContainer,
  },
  created() {
    this.loadPopularPalettes(3);
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    this.clearPublicPalettes();
    window.removeEventListener('scroll', this.handleScroll);
  },
  updated() {
    if (this.isNoMorePalettes) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    ...mapState({
      palettes: state => state.public.palettes,
      isNoMorePalettes: state => state.public.isNoMorePalettes,
    }),
  },
  methods: {
    ...mapActions({
      loadPopularPalettes: 'loadPopularPalettes',
      clearPublicPalettes: 'clearPublicPalettes',
      addPopularPalettesToEnd: 'addPopularPalettesToEnd',
    }),
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.addPopularPalettesToEnd({
          uid: this.user.uid,
          likes: this.palettes[this.palettes.length - 1].likes,
          endKey: this.palettes[this.palettes.length - 1].key,
          palettesNum: 3,
        });
      }
    },
  },
};
</script>
