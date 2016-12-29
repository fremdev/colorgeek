<template>
  <div class="admin-controls">
    <button
      class="btn btn-success"
      @click="makePalettePicked"
      :disabled="isDeleted || isPicked">{{ isPicked ? 'Picked' : 'Make Picked'}}</button>
    <button
      class="btn btn-danger"
      @click="deleteFromPublicPalettes"
      :disabled="isDeleted">{{ isDeleted ? 'Removed' : 'Delete' }}</button>
  </div>
</template>

<script>
import { db } from '../firebase';

export default {
  props: {
    paletteKey: {
      type: String,
    },
  },
  data() {
    return {
      isDeleted: false,
      isPicked: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    makePalettePicked() {
      if (this.user.uid === process.env.ADMIN_UID) {
        db.ref(`public/${this.paletteKey}/picked`).set(true)
          .then(() => {
            this.isPicked = true;
          });
      }
    },
    deleteFromPublicPalettes() {
      if (this.user.uid === process.env.ADMIN_UID) {
        db.ref(`public/${this.paletteKey}`).remove()
          .then(() => {
            this.isDeleted = true;
          });
      }
    },
  },
};
</script>

<style>
.admin-controls {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  margin: 10px;
  border-top: 1px solid #ccc;
}
</style>
