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
  name: 'PublicPalettes',
  components: {
    PaletteContainer,
  },
  created() {
    this.loadPublicPalettes(3);
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    this.clearPublicPalettes();
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    ...mapState({
      palettes: state => state.public.palettes,
    }),
  },
  methods: {
    ...mapActions({
      loadPublicPalettes: 'loadPublicPalettes',
      clearPublicPalettes: 'clearPublicPalettes',
      addPublicPalettesToEnd: 'addPublicPalettesToEnd',
    }),
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.addPublicPalettesToEnd({
          uid: this.user.uid,
          endKey: this.palettes[this.palettes.length - 1].key,
          palettesNum: 3,
        });
      }
    },
  },
};
</script>
