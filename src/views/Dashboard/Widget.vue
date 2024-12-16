<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Lista de Personas Registradas</h1>
    <div class="buttons">
      <label for="fecha" class="label-date">Asigna una fecha:</label>
      <input
        class="input-date"
        type="date"
        id="fecha"
        v-model="fecha"
      />
      <button id="descargar" class="btn btn-primary mb-2" @click="handleDescargar">
        Descargar CSV
      </button>
      <button id="descargar2" class="btn btn-primary mb-2" @click="handleDescargarHoy">
        Descargar CSV del Día Actual
      </button>
    </div>
    <div class="container mt-5">
      <h5 class="mb-4">Descargar Datos por Rango de Fechas</h5>
      <div class="mb-3">
        <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
        <input
          type="date"
          id="fechaInicio"
          class="form-control"
          v-model="fechaInicio"
        />
      </div>
      <div class="mb-3">
        <label for="fechaFin" class="form-label">Fecha de Fin</label>
        <input
          type="date"
          id="fechaFin"
          class="form-control"
          v-model="fechaFin"
        />
      </div>
      <button id="descargar3" class="btn btn-success" @click="handleDescargarRango">
        Descargar rango de fecha
      </button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "Widget",
  data() {
    return {
      urlApi: "http://172.16.2.8:3001",
      fecha: "",
      fechaInicio: "",
      fechaFin: "",
    };
  },
  methods: {
    convertirACSV(datos) {
      if (datos.length === 0) {
        return "No hay datos disponibles.\n";
      }
      const cabeceras = Object.keys(datos[0]).join(",") + "\n";
      const filas = datos.map((fila) => Object.values(fila).join(",")).join("\n");
      return cabeceras + filas;
    },
    async descargarCSV(fechaConsulta) {
      if (!fechaConsulta) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Por favor, selecciona una fecha.'
        });
        return;
      }
      try {
        const response = await fetch(`${this.urlApi}/listaPersonas?fecha=${fechaConsulta}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datos = await response.json();
        const csv = this.convertirACSV(datos);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", `datos_${fechaConsulta}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        Swal.fire({
          icon: 'success',
          title: '¡Descarga Exitosa!',
          text: `Los datos de ${fechaConsulta} se han descargado correctamente.`
        });
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al descargar los datos.'
        });
      }
    },
    handleDescargar() {
      this.descargarCSV(this.fecha);
    },
    handleDescargarHoy() {
      const fechaHoy = new Date().toISOString().split("T")[0];
      this.descargarCSV(fechaHoy);
    },
    async handleDescargarRango() {
      if (!this.fechaInicio || !this.fechaFin) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Por favor, selecciona ambas fechas.'
        });
        return;
      }
      try {
        const response = await fetch(
          `${this.urlApi}/listaPersonas?fecha-inicio=${this.fechaInicio}&fecha-final=${this.fechaFin}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datos = await response.json();
        const csv = this.convertirACSV(datos);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", `datos_${this.fechaInicio}_a_${this.fechaFin}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        Swal.fire({
          icon: 'success',
          title: '¡Descarga Exitosa!',
          text: `Los datos del rango de fechas se han descargado correctamente.`
        });
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al descargar los datos.'
        });
      }
    },
  },
};
</script>


<style scoped>
.container .mt-5 {
  width: 100%; /* Ancho del contenedor */
  margin: 5rem 0 0 0; /* Margen superior (mt-5) y sin margen lateral */
  padding: 20px; /* Espaciado interno */
  background-color: #ffffff; /* Fondo blanco para el contenedor */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
  position: relative; /* Posicionamiento absoluto */
  right: 0; /* Alinear a la derecha*/
}
.buttons {
  width: 100%;
  margin: auto;
}

.mb-2 {
  margin-right: 5px;
}

.input-date {
  margin: 10px;
  padding: 10px; /* Espaciado interno */
  border: 1px solid #b7b9bb; /* Borde */
  border-radius: 5px; /* Bordes redondeados */
  font-size: 16px; /* Tamaño de fuente */
  background-color: #f8f9fa; /* Color de fondo */
  transition: border-color 0.3s;
}

.label-date {
  font-weight: 500;
  font-size: 20px;
}

.input-date:focus {
  border-color: #3bd47b; /* Color del borde al enfocar */
  outline: none; /* Elimina el contorno predeterminado */
}

/* Estilos específicos para el componente Widget */
</style>
