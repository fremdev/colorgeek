<template>
  <div class="admin-controls">
    <button
      class="btn btn-success"
      @click="makePalettePicked">Make Picked</button>
    <button
      class="btn btn-danger"
      @click="deleteFromPublicPalettes">Delete</button>
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
            console.log('picked');
          });
      }
    },
    deleteFromPublicPalettes() {
      if (this.user.uid === process.env.ADMIN_UID) {
        db.ref(`public/${this.paletteKey}`).remove()
          .then(() => {
            console.log('removed');
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
