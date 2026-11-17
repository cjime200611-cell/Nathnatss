// Para qué sirve: punto de entrada de la página; carga los datos, prepara la
// vista y pone en marcha la navegación entre proyectos.
import { loadProjects } from "./projectData.js";
import { createProjectView } from "./projectView.js";
import { initializeProjectSlider } from "./projectSlider.js";
import { initializeServiceCards } from "./serviceAccordion.js";
import { initializeMobileNavigation } from "./mobileNavigation.js";
import { initializeLogoCursor } from "./logoCursor.js";
import { initializeFlowerBurst } from "../components/flowerBurst.js";

async function initialize() {
    initializeMobileNavigation();
    initializeServiceCards();
    initializeLogoCursor();
    initializeFlowerBurst();

    // Carga y valida los datos antes de conectar la vista y sus controles.
    const projects = await loadProjects();
    const view = createProjectView(projects);
    initializeProjectSlider(projects, view);
}

// Registra en consola cualquier error al iniciar el portafolio.
initialize().catch(function (error) {
    console.error("Could not initialize the project portfolio.", error);
});
