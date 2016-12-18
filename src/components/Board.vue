<template>
  <div>
    <h1>Board</h1>
    <h3>One</h3>
    <palette-container></palette-container>
  </div>
</template>

<script>
import PaletteContainer from './PaletteContainer';

export default {
  name: 'Board',
  components: {
    PaletteContainer,
  },
};
</script>
