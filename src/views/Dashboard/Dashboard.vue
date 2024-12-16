<template>
  <div v-if="isAuthorized">
    <Widget />
    <tabla />
  </div>
</template>

<script>
import tabla from './tabla.vue';
import Widget from './Widget.vue';

export default {
  name: 'Dashboard',
  components: {
    Widget,
    tabla,
  },
  data() {
    return {
      isAuthorized: false, // Bandera para verificar autorización
    };
  },
  created() {
    // Validar si el usuario tiene acceso
    if (sessionStorage.getItem('accessGranted') === 'true') {
      this.isAuthorized = true;
    } else {
      // Redirigir al usuario si no está autorizado
      this.$router.push('/')
    }
  },
};
</script>

<style scoped>
/* Estilos específicos para Dashboard */
</style>
