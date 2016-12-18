<template>
  <div class="palette-item">
    <div class="palette-item__header">
      <h5>Palette by Username</h5>
      <span class="likes__icon">&hearts;</span>
    </div>

    <div class="palette-item__row">
      <palette-color
        @colorWasChanged="currentColors.color1 = $event"
        :editMode="editMode"
        :color="colors.color1"
        :isHex="colorType === 'hex'"
        :isBig="true"
      ></palette-color>

      <palette-color
        @colorWasChanged="currentColors.color2 = $event"
        :editMode="editMode"
        :color="colors.color2"
        :isHex="colorType === 'hex'"
        :isBig="true"
      ></palette-color>
    </div>

    <div class="palette-item__row">
      <palette-color
        @colorWasChanged="currentColors.color3 = $event"
        :editMode="editMode"
        :color="colors.color3"
        :isHex="colorType === 'hex'"
      ></palette-color>

      <palette-color
        @colorWasChanged="currentColors.color4 = $event"
        :editMode="editMode"
        :color="colors.color4"
        :isHex="colorType === 'hex'"
      ></palette-color>

      <palette-color
        @colorWasChanged="currentColors.color5 = $event"
        :editMode="editMode"
        :color="colors.color5"
        :isHex="colorType === 'hex'"
      ></palette-color>
    </div>
    <div class="palette-item__footer">
      <button
        class="btn btn-outline-primary"
        @click="editMode ? savePalette() : startEditMode()"
        >{{editMode ? 'Save' : 'Edit'}}</button>
      <button
        class="btn btn-outline-primary"
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
import { mapActions } from 'vuex';
import PaletteColor from './Color';

export default {
  created() {
    /* eslint-disable no-new */
    new Clipboard('.palette-item__color');
  },
  props: ['colors', 'palette'],
  components: {
    PaletteColor,
  },
  data() {
    return {
      editMode: false,
      colorType: 'hex',
      currentColors: { ...this.colors },
    };
  },
  methods: {
    ...mapActions([
      'updatePalette',
    ]),
    startEditMode() {
      this.editMode = true;
    },
    savePalette() {
      this.editMode = false;
      this.updatePalette({
        id: this.palette,
        colors: this.currentColors,
      });
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
}
</style>
