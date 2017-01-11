<template>
  <div class="wrapper">
    <div
      class="message"
      v-if="isNoMorePalettes && palettes.length === 0">
      You don't have any palettes yet.
      <router-link
        to="/create"
        class="message__button"
      >Create One</router-link>?
    </div>
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
    this.loadUserPalettes({
      uid: this.user.uid,
      palettesNum: 12,
    });
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    this.clearUserPalettes();
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    ...mapState({
      palettes: state => state.private.palettes,
      isNoMorePalettes: state => state.private.isNoMorePalettes,
    }),
  },
  methods: {
    ...mapActions({
      loadUserPalettes: 'loadUserPalettes',
      clearUserPalettes: 'clearUserPalettes',
      addUserPalettesToEnd: 'addUserPalettesToEnd',
    }),
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight
          && this.palettes[this.palettes.length - 1]) {
        this.addUserPalettesToEnd({
          uid: this.user.uid,
          endKey: this.palettes[this.palettes.length - 1].key,
          palettesNum: 7,
        });
      }
    },
  },
};
</script>

<style scoped>
.message {
  text-align: center;
  margin-top: 30px;
  font-size: 18px;
}
.message__button {
  cursor: pointer;
  color: #555599;
  text-decoration: underline;
}
</style>
