// Para qué sirve: punto de entrada de la página; carga los datos, prepara la
// vista y pone en marcha la navegación entre proyectos.
import { loadProjects } from "./project-data.js";
import { createProjectView } from "./project-view.js";
import { initializeProjectSlider } from "./project-slider.js";
import { initializeServiceCards } from "./service-accordion.js";
import { initializeMobileNavigation } from "./mobile-navigation.js";
import { initializeLogoCursor } from "./logo-cursor.js";

async function initialize() {
    initializeMobileNavigation();
    initializeServiceCards();
    initializeLogoCursor();

    // Carga y valida los datos antes de conectar la vista y sus controles.
    const projects = await loadProjects();
    const view = createProjectView(projects);
    initializeProjectSlider(projects, view);
}

// Registra en consola cualquier error al iniciar el portafolio.
initialize().catch(function (error) {
    console.error("Could not initialize the project portfolio.", error);
});
