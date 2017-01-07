<template>
  <div class="wrapper">
    <div
      class="update-message"
      v-if="palettesWasAdded">
      {{ palettesWasAdded }} new palettes was added. Do you want to see new palettes?
      <span
        @click="loadPublicPalettes(palettesWasAdded)"
        class="update-message__button"
      >Update palettes</span>
    </div>
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
      palettesWasAdded: state => state.public.palettesWasAdded,
      isNoMorePalettes: state => state.public.isNoMorePalettes,
    }),
  },
  methods: {
    ...mapActions({
      loadPublicPalettes: 'loadPublicPalettes',
      clearPublicPalettes: 'clearPublicPalettes',
      addPublicPalettesToEnd: 'addPublicPalettesToEnd',
    }),
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight
          && this.palettes[this.palettes.length - 1]) {
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

<style scoped>
.update-message {
  text-align: center;
}
.update-message__button {
  cursor: pointer;
  color: #555599;
  text-decoration: underline;
}
</style>
