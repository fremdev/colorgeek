<template>
  <div class="wrapper">
    <div
      class="update-message"
      v-if="palettesWasAdded">
      {{ palettesWasAdded }} new palettes was added. Do you want to see new palettes?
      <span
        @click="loadPalettes(palettesWasAdded)"
        class="update-message__button"
      >Update palettes</span>
    </div>
    <palette-container
      :user="currentUser"
      :palettes="palettes"
      :isPublic="true"
    ></palette-container>
  </div>
</template>

<script>
import PaletteContainer from './PaletteContainer';
import { db } from '../firebase';

/* eslint-disable no-undef */
export default {
  name: 'Board',
  created() {
    this.loadPalettes(12);
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      palettes: [],
      palettesWasAdded: 0,
      endKey: '',
    };
  },
  components: {
    PaletteContainer,
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    loadPalettes(palettesToShow) {
      db.ref('public').off();
      this.palettesWasAdded = 0;
      let count = 0;
      db.ref('public').orderByKey().limitToLast(palettesToShow).on('child_added', (data) => {
        count += 1;
        if (count <= palettesToShow) {
          this.palettes.unshift({ ...data.val(), key: data.key });
          if (count === 1) this.endKey = data.key;
        } else {
          this.palettesWasAdded += 1;
        }
      });
    },
    loadPalettesOnScroll(endKey, palettesNum) {
      let count = 0;
      const loadedPalettes = [];
      db.ref('public').orderByKey().endAt(endKey).limitToLast(palettesNum)
      .on('child_added', (data) => {
        count += 1;
        if (count === 1) {
          this.endKey = data.key;
        }
        if (data.key !== endKey) {
          loadedPalettes.unshift(data.val());
        } else {
          this.palettes = this.palettes.concat(loadedPalettes);
        }
      });
    },
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadPalettesOnScroll(this.endKey, 7);
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
