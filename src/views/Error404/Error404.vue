<template>
  <main class="error-page">
    <h1>4<span><FontAwesomeIcon :icon="['fas', 'ghost']" /></span>4</h1>
    <h2>Error: Página no encontrada (404)</h2>
    <p>Lo sentimos, la página que estás buscando no está disponible.</p>
  </main>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

// Añadir el icono al library
library.add(faGhost);

export default {
  name: 'NotFoundPage',
  components: {
    FontAwesomeIcon
  }
};
</script>

<style scoped>
/* Import the Montserrat font from Google Fonts */
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");

/* Define custom variables */
:root {
  --bg: #313942;
  --ghost: #528cce;
  --heading: #e7ebf2;
}

/* Set box-sizing to border-box for all elements */
*,
*:after,
*:before {
  box-sizing: border-box;
}

/* Style the body */
body {
  background-color: var(--bg);
  font-family: 'Montserrat', sans-serif;
}

/* Style the main element */
main {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  text-align: center;
}

/* Style the heading (h1) */
h1 {
  color: var(--heading);
  font-size: 12.5rem;
  letter-spacing: 0.1em;
  margin: 0.025em 0;
  text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
  white-space: nowrap;

  @media (max-width: 30rem) {
    font-size: 8.5rem;
  }

  & > span {
    animation: spooky 2s alternate infinite linear;
    color: var(--ghost);
    display: inline-block;
  }
}

/* Style the subheading (h2) */
h2 {
  color: var(--heading);
  margin-bottom: 0.4em;
}

/* Style the paragraph (p) */
p {
  color: #ccc;
  margin-top: 0;
}

/* Define the spooky animation for the ghost icon */
@keyframes spooky {
  from {
    transform: translatey(0.15em) scaley(0.95);
  }

  to {
    transform: translatey(-0.15em);
  }
}
</style>
