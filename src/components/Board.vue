<template>
  <div>
    <palette-container :palettes="palettes"></palette-container>
  </div>
</template>

<script>
import PaletteContainer from './PaletteContainer';
import { db } from '../firebase';

export default {
  name: 'Board',
  components: {
    PaletteContainer,
  },
  firebase: {
    palettes: db.ref('palettes'),
  },
};
</script>
