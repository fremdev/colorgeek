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
        @colorWasChanged="currentColors.color1 = $event"
        :editMode="editMode"
        :color="palette.colors.color1"
        :isBig="true"
      ></palette-color>

      <palette-color
        @click.native="!editMode ? selectColor(2) : undefined"
        @colorWasChanged="currentColors.color2 = $event"
        :editMode="editMode"
        :color="palette.colors.color2"
        :isBig="true"
      ></palette-color>
    </div>

    <div class="palette-item__row">
      <palette-color
        @click.native="!editMode ? selectColor(3) : undefined"
        @colorWasChanged="currentColors.color3 = $event"
        :editMode="editMode"
        :color="palette.colors.color3"
      ></palette-color>

      <palette-color
        @click.native="!editMode ? selectColor(4) : undefined"
        @colorWasChanged="currentColors.color4 = $event"
        :editMode="editMode"
        :color="palette.colors.color4"
      ></palette-color>

      <palette-color
        @click.native="!editMode ? selectColor(5) : undefined"
        @colorWasChanged="currentColors.color5 = $event"
        :editMode="editMode"
        :color="palette.colors.color5"
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
    isPublic: {
      type: Boolean,
    },
  },
  components: {
    PaletteColor,
  },
  data() {
    return {
      editMode: false,
      currentColors: { ...this.palette.colors },
      selectedColor: '',
    };
  },
  computed: {
    ...mapState({
      colorType: 'colorType',
      selectedColor: 'selectedColor',
    }),
    rgbColors() {
      return {
        color1: hexToRgb(this.currentColors.color1),
        color2: hexToRgb(this.currentColors.color2),
        color3: hexToRgb(this.currentColors.color3),
        color4: hexToRgb(this.currentColors.color4),
        color5: hexToRgb(this.currentColors.color5),
      };
    },
  },
  methods: {
    ...mapActions({
      setSelectedColor: 'setSelectedColor',
    }),
    startEditMode() {
      this.editMode = true;
    },
    updatePalette() {
      this.editMode = false;
      db.ref(`authors/${this.user.uid}/${this.palette['.key']}/colors`).set(this.currentColors);
    },
    deletePalette() {
      db.ref(`authors/${this.user.uid}/${this.palette['.key']}`).remove();
    },
    changeLikes() {
      let newLikesNum;
      if (this.isLiked['.value']) {
        newLikesNum = this.palette.likes - 1;
      } else {
        newLikesNum = this.palette.likes + 1;
      }
      db.ref(`authors/${this.user.uid}/${this.palette['.key']}/likes`).set(newLikesNum);

      if (this.palette.public || this.isPublic) {
        db.ref().child('public').child(this.palette['.key']).child('likes')
        .set(newLikesNum);
      }

      db.ref(`likes/${this.user.uid}/${this.palette['.key']}`).set(this.isLiked['.value'] ? null : true);
    },
    makePublic() {
      db.ref(`public/${this.palette['.key']}`).set({
        author: this.user,
        colors: this.palette.colors,
        likes: this.palette.likes,
      }).then(() => {
        db.ref(`authors/${this.user.uid}/${this.palette['.key']}/public`).set(true);
      });
    },
    selectColor(index) {
      const colorNum = `color${index}`;
      if (this.colorType === 'hex') {
        this.setSelectedColor(`#${this.currentColors[colorNum]}`);
      } else {
        this.setSelectedColor(this.rgbColors[colorNum]);
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
