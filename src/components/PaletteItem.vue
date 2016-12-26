<template>
  <div class="palette-item">
    <div class="palette-item__header">
      <h5>Palette by {{ palette.author ? palette.author.nickname : user.nickname }}</h5>
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
        @click.native="!editMode ? selectColor(1) : undefined"
        :editMode="editMode"
        :color="{
          value: palette.colors.color1,
          colorIndex: 1,
          paletteIndex: index,
          }"
        :isBig="true"
      ></palette-color>

      <palette-color
        @click.native="!editMode ? selectColor(2) : undefined"
        :editMode="editMode"
        :color="{
          value: palette.colors.color2,
          colorIndex: 2,
          paletteIndex: index,
          }"
        :isBig="true"
      ></palette-color>
    </div>

    <div class="palette-item__row">
      <palette-color
        @click.native="!editMode ? selectColor(3) : undefined"
        :editMode="editMode"
        :color="{
          value: palette.colors.color3,
          colorIndex: 3,
          paletteIndex: index,
          }"
      ></palette-color>

      <palette-color
        @click.native="!editMode ? selectColor(4) : undefined"
        :editMode="editMode"
        :color="{
          value: palette.colors.color4,
          colorIndex: 4,
          paletteIndex: index,
          }"
      ></palette-color>

      <palette-color
        @click.native="!editMode ? selectColor(5) : undefined"
        :editMode="editMode"
        :color="{
          value: palette.colors.color5,
          colorIndex: 5,
          paletteIndex: index,
          }"
      ></palette-color>
    </div>
    <div class="palette-item__footer">
      <div
        :class="['edit-buttons', {'edit-buttons--right': palette.public}]"
        v-if="!isPublic"
      >
        <button
          class="btn btn-outline-primary"
          @click="editMode ? updatePalette() : startEditMode()"
          v-if="!palette.public"
          >{{editMode ? 'Save' : 'Edit'}}</button>
        <button
          class="btn btn-outline-primary"
          @click="makePublic()"
          v-if="!palette.public"
        >Make Public</button>
        <button
          class="btn btn-danger"
          @click="deletePalette"
        >Delete</button>
      </div>
      <div class="edit-buttons__copy"
        v-else
      >
        <button class="btn btn-outline-primary">Copy to My Palettes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import { mapActions, mapState } from 'vuex';
import PaletteColor from './Color';
import { db } from '../firebase';
import { hexToRgb } from '../helpers';

export default {
  name: 'palette-item',
  created() {
    /* eslint-disable no-new */
    new Clipboard('.palette-item__color');
    this.$bindAsObject('isLiked', db.ref(`likes/${this.user.uid}/${this.palette.key}`));
  },
  props: {
    palette: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
    },
    isPublic: {
      type: Boolean,
    },
    index: {
      type: Number,
    },
  },
  components: {
    PaletteColor,
  },
  data() {
    return {
      editMode: false,
    };
  },
  computed: {
    ...mapState({
      colorType: 'colorType',
    }),
  },
  methods: {
    ...mapActions({
      setSelectedColor: 'setSelectedColor',
      updateUserPaletteColors: 'updateUserPaletteColors',
      updateUserPaletteLikes: 'updateUserPaletteLikes',
      updatePublicPaletteLikes: 'updatePublicPaletteLikes',
      makePalettePublic: 'makePalettePublic',
      removeUserPalette: 'removeUserPalette',
    }),
    startEditMode() {
      this.editMode = true;
    },
    updatePalette() {
      this.editMode = false;
      this.updateUserPaletteColors({
        uid: this.user.uid,
        key: this.palette.key,
        index: this.index,
        colors: this.palette.colors,
      });
    },
    deletePalette() {
      this.removeUserPalette({
        uid: this.user.uid,
        key: this.palette.key,
        index: this.index,
      });
    },
    changeLikes() {
      const data = {
        uid: this.user.uid,
        key: this.palette.key,
        index: this.index,
        likes: this.palette.likes,
      };
      if (this.isPublic) {
        this.updatePublicPaletteLikes({
          ...data,
          authorId: this.palette.author.uid,
        });
      } else {
        this.updateUserPaletteLikes({
          ...data,
          isPublic: this.palette.public,
        });
      }
    },
    makePublic() {
      this.makePalettePublic({
        palette: this.palette,
        index: this.index,
      });
    },
    selectColor(index) {
      const colorNum = `color${index}`;
      if (this.colorType === 'hex') {
        this.setSelectedColor(`#${this.palette.colors[colorNum]}`);
      } else {
        this.setSelectedColor(hexToRgb(this.palette.colors[colorNum]));
      }
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
  padding: 10px 20px;
}

.edit-buttons {
  display: flex;
  justify-content: space-between;
}

.edit-buttons--right {
  justify-content: flex-end;
}

.edit-buttons__copy {
  display: flex;
  justify-content: center;
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
