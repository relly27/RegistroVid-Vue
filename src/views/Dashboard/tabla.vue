<template>
  <div class="container my-5">
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Cédula</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Genero</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Nacionalidad</th>
          <th>Estado</th>
          <th>Municipio</th>
          <th>Parroquia</th>
          <th>Descripcion</th>
          <th>Fecha de Registro</th>
        </tr>
      </thead>
      <tbody id="personasTabla">
        <tr v-if="error">
          <td colspan="13" class="text-center text-danger">{{ error }}</td>
        </tr>
        <tr v-for="(persona, index) in personas" :key="persona.cedula_id">
          <td>{{ index + 1 }}</td>
          <td>{{ persona.cedula_id }}</td>
          <td>{{ `${persona.primer_nombre} ${persona.segundo_nombre}` }}</td>
          <td>{{ `${persona.primer_apellido} ${persona.segundo_apellido}` }}</td>
          <td>{{ persona.genero }}</td>
          <td>{{ persona.email }}</td>
          <td>{{ persona.telf }}</td>
          <td>{{ persona.nacionalidad }}</td>
          <td>{{ persona.estado }}</td>
          <td>{{ persona.municipio }}</td>
          <td>{{ persona.parroquia }}</td>
          <td>{{ persona.descripcion }}</td>
          <td>{{ new Date(persona.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';

const urlApi = "http://172.16.2.8:3001";

export default {
  name: 'TablaPersonas',
  setup() {
    const personas = ref([]);
    const error = ref(null);

    // Función para obtener los datos
    const obtenerDatos = async () => {
      try {
        const response = await fetch(`${urlApi}/listaPersonas`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        personas.value = data;
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        error.value = 'Error al cargar los datos.';
      }
    };

    // Llamada a la API cuando el componente se monta
    onMounted(() => {
      obtenerDatos();
    });

    return {
      personas,
      error
    };
  }
};
</script>

<style scoped>

.table-responsive {
  width: 100%; /* Ancho del contenedor de la tabla */
  max-width: 1300px; /* Ancho máximo para la tabla */
  margin: 20px auto; /* Margen automático para centrar */
  overflow-x: auto; /* Permite desplazamiento horizontal en pantallas pequeñas */
  border-radius: 0.5rem; /* Bordes redondeados para el contenedor */
}

.table-header {
  background-color: #007bff; /* Color de fondo del encabezado */
  color: white; /* Color del texto en el encabezado */
}

.table-header th {
  padding: 14px; /* Espaciado interno en el encabezado */
  text-align: center; /* Alinear texto al centro */
  font-weight: bold; /* Negrita para el encabezado */
  text-transform: uppercase; /* Texto en mayúsculas */
}

.table tbody tr {
  transition: background-color 0.3s, transform 0.2s; /* Transición suave para el efecto hover */
}

.table tbody tr:nth-of-type(odd) {
  background-color: #f2f2f2; /* Color de fondo para filas impares */
}

.table tbody tr:hover {
  background-color: #e0f7fa; /* Color de fondo al pasar el mouse */
  transform: scale(1.02); /* Efecto de aumento al pasar el mouse */
}

.table td {
  padding: 12px; /* Espaciado interno en celdas */
  border: 1px solid #dee2e6; /* Borde de las celdas */
}

.table td:last-child {
  border-right: none; /* Elimina el borde derecho de la última celda */
}

/*aqui inicia el codigo de tabla */
</style>
