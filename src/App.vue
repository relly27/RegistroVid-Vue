<template>
  <div id="app">
    <Header />
    <router-view /> <!-- Muestra la vista según la ruta -->
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
/* Opcional: Estilos globales */
body {
  font-family: Arial, sans-serif;
}
</style>
