<template>
  <div id="app">
    <app-header></app-header>
    <palette-container></palette-container>
  </div>
</template>

<script>
import AppHeader from './components/Header';
import PaletteContainer from './components/PaletteContainer';

export default {
  name: 'app',
  components: {
    AppHeader,
    PaletteContainer,
  },
};
</script>

<style>
</style>
