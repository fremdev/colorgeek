<template>
  <div class="wrapper">
    <palette-container
      :user="user"
      :palettes="palettes"
    ></palette-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PaletteContainer from './PaletteContainer';

/* eslint-disable no-undef */
export default {
  name: 'UserPalettes',
  components: {
    PaletteContainer,
  },
  created() {
    this.loadUserPalette({
      uid: this.user.uid,
      palettesNum: 3,
    });
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    this.clearUserPalettes();
    window.removeEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      endKey: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    ...mapState({
      palettes: 'userPalettes',
    }),
  },
  methods: {
    ...mapActions({
      loadUserPalette: 'loadUserPalette',
      addNewUserPalette: 'addNewUserPalette',
      clearUserPalettes: 'clearUserPalettes',
      addUserPalettesToEnd: 'addUserPalettesToEnd',
    }),
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.addUserPalettesToEnd({
          uid: this.user.uid,
          endKey: this.palettes[this.palettes.length - 1].key,
          palettesNum: 3,
        });
      }
    },
  },
};
</script>
