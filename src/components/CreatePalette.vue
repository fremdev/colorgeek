<template>
  <div class="palette-container">
    <div class="create-palette">
      <div class="create-palette__header">
        <h5>Palette by {{ palette.author ? palette.author.nickname : user.nickname }}</h5>
      </div>

      <div class="create-palette__row">
        <palette-color
          :editMode="editMode"
          :color="{
            value: palette.colors.color1,
            colorIndex: 1,
            paletteIndex: index,
            }"
          :isBig="true"
        ></palette-color>

        <palette-color
          :editMode="editMode"
          :color="{
            value: palette.colors.color2,
            colorIndex: 2,
            paletteIndex: index,
            }"
          :isBig="true"
        ></palette-color>
      </div>

      <div class="create-palette__row">
        <palette-color
          :editMode="editMode"
          :color="{
            value: palette.colors.color3,
            colorIndex: 3,
            paletteIndex: index,
            }"
        ></palette-color>

        <palette-color
          :editMode="editMode"
          :color="{
            value: palette.colors.color4,
            colorIndex: 4,
            paletteIndex: index,
            }"
        ></palette-color>

        <palette-color
          :editMode="editMode"
          :color="{
            value: palette.colors.color5,
            colorIndex: 5,
            paletteIndex: index,
            }"
        ></palette-color>
      </div>
      <div class="create-palette__footer">
        <div
          class="controls"
        >
          <button
            class="btn btn-outline-primary"
            @click="cancelCreating"
            >Cancel</button>
          <button
            class="btn btn-outline-success"
            @click="createPalette"
          >Create</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';
import PaletteColor from './Color';

export default {
  created() {
    this.addNewUserPalette(this.user);
  },
  destroyed() {
    this.clearUserPalettes();
  },
  components: {
    PaletteColor,
  },
  computed: {
    ...mapState({
      palette: state => state.userPalettes[0],
      user: 'currentUser',
    }),
  },
  data() {
    return {
      index: 0,
      editMode: true,
    };
  },
  methods: {
    ...mapActions({
      addNewUserPalette: 'addNewUserPalette',
      clearUserPalettes: 'clearUserPalettes',
    }),
    cancelCreating() {
      console.log('cancelled');
    },
    createPalette() {
      console.log('created');
    },
  },
};
</script>

<style scoped>
.palette-container {
  display: flex;
  justify-content: center;
}
.create-palette {
  background-color: #eee;
  display: inline-block;
  border-radius: 5px;
  margin: 10px 10px 0;
}

.create-palette__row {
  display: flex;
}

.create-palette__header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #000;
}

h5 {
  display: inline-block;
}

.create-palette__footer {
  padding: 10px 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
