<template>
  <div class="palette-item">
    <div class="palette-item__header">
      <h5>Palette by {{ palette.author.nickname }}</h5>
      <span>
        <span class="likes__num">{{ palette.likes ? palette.likes : '' }}</span>
        <span
         :class="['likes__icon', {'likes__icon--liked': isLiked['.value']}]"
         @click="user.uid ? changeLikes() : undefined"
        >&hearts;</span>
      </span>
    </div>

    <div class="palette-item__row">
      <palette-color
        @colorWasChanged="currentColors.color1 = $event"
        :editMode="editMode"
        :color="palette.colors.color1"
        :isHex="colorType === 'hex'"
        :isBig="true"
      ></palette-color>

      <palette-color
        @colorWasChanged="currentColors.color2 = $event"
        :editMode="editMode"
        :color="palette.colors.color2"
        :isHex="colorType === 'hex'"
        :isBig="true"
      ></palette-color>
    </div>

    <div class="palette-item__row">
      <palette-color
        @colorWasChanged="currentColors.color3 = $event"
        :editMode="editMode"
        :color="palette.colors.color3"
        :isHex="colorType === 'hex'"
      ></palette-color>

      <palette-color
        @colorWasChanged="currentColors.color4 = $event"
        :editMode="editMode"
        :color="palette.colors.color4"
        :isHex="colorType === 'hex'"
      ></palette-color>

      <palette-color
        @colorWasChanged="currentColors.color5 = $event"
        :editMode="editMode"
        :color="palette.colors.color5"
        :isHex="colorType === 'hex'"
      ></palette-color>
    </div>
    <div class="palette-item__footer">
      <button
        class="btn btn-outline-primary"
        @click="editMode ? updatePalette() : startEditMode()"
        >{{editMode ? 'Save' : 'Edit'}}</button>
      <button
        class="btn btn-outline-primary" disabled
      >Make Public</button>
      <div class="color-controls">
        <div class="color-type">
          <input
            class="form-check-input"
            type="radio"
            value="hex"
            v-model="colorType">
            hex
          </label>
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="radio"
              value="rgb"
              v-model="colorType">
            rgb
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import PaletteColor from './Color';
import { db } from '../firebase';

export default {
  created() {
    /* eslint-disable no-new */
    new Clipboard('.palette-item__color');
    this.$bindAsObject('isLiked', db.ref(`likes/${this.user.uid}/${this.palette['.key']}`));
  },
  props: {
    palette: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
    },
  },
  components: {
    PaletteColor,
  },
  firebase: {
    palettes: db.ref('palettes'),
  },
  data() {
    return {
      editMode: false,
      colorType: 'hex',
      currentColors: { ...this.palette.colors },
    };
  },
  methods: {
    startEditMode() {
      this.editMode = true;
    },
    updatePalette() {
      this.editMode = false;
      this.$firebaseRefs.palettes.child(this.palette['.key']).child('colors').set(this.currentColors);
    },
    changeLikes() {
      const diff = this.isLiked['.value'] ? -1 : 1;
      this.$firebaseRefs.palettes.child(this.palette['.key']).child('likes').set(this.palette.likes + diff);
      this.$firebaseRefs.isLiked.set(this.isLiked['.value'] ? null : true);
    },
  },
};
</script>

<style scoped>
.palette-item {
  background-color: #eee;
  display: inline-block;
  border-radius: 5px;
  margin: 10px 10px 0;
}

.palette-item__row {
  display: flex;
}

.palette-item__header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #000;
}

h5 {
  display: inline-block;
}

.palette-item__footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.likes__icon {
  font-size: 32px;
  line-height: 24px;
  padding: 5px;
}
.likes__icon--liked {
  color: #ff5588;
}
.likes__num {
  font-size: 28px;
  line-height: 32px;
}
</style>
