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
    <div>
      <button
        @click="loadPalettesOnScroll(endKey, 4)"
      >Load 50</button>
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

export default {
  name: 'Board',
  created() {
    this.loadPalettes(3);
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
          this.palettes.unshift(data.val());
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
