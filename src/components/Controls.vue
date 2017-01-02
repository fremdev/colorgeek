<template>
  <div class="controls">
    <div class="controls__type">
      Color type:
      <label class="form-check-label">
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
    <div class="controls__display">
      Selected:
      <div
        class="indicator"
        :style="{backgroundColor: selectedColor}"></div> {{ selectedColor }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    colorType: {
      get() {
        return this.$store.state.colorType;
      },
      set(value) {
        this.setColorType(value);
      },
    },
    selectedColor() {
      return this.$store.state.selectedColor;
    },
  },
  methods: {
    ...mapActions({
      setColorType: 'setColorType',
    }),
  },
};
</script>

<style>
  .indicator {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: inline-block;
    margin-bottom: -3px;
    margin-left: 10px;
  }
  @media (max-width: 800px) {
    .controls {
      flex: 0 1 100%;
      display: flex;
      justify-content: center;
    }
    .controls__type {
      margin-right: 50px;
    }
  }

  @media (max-width: 450px) {
    .controls {
      font-size: 14px;
    }
    .controls__type {
      margin-right: 10px;
    }
  }
</style>
