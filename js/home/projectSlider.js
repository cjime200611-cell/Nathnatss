// Para qué sirve: conecta los controles de navegación, cambia el proyecto
// seleccionado y coordina la carga de imágenes con la transición animada.
import { resolveImageUrl } from "./projectData.js";

export function initializeProjectSlider(projects, view) {
    // IDs del HTML usados para conectar la navegación del carrusel.
    const next = document.getElementById("project-next");
    const previous = document.getElementById("project-previous");
    const preview = document.getElementById("project-preview");
    const stage = document.getElementById("proyecto-activo");
    const dotsContainer = document.getElementById("project-dots");

    if (!next || !previous || !preview) {
        throw new Error("Project navigation buttons were not found.");
    }

    let currentIndex = 0;
    let isAdvancing = false;

    function updateDots(index) {
        if (!dotsContainer) {
            return;
        }

        Array.from(dotsContainer.querySelectorAll(".project-dot")).forEach(function (dot, dotIndex) {
            const isActive = dotIndex === index;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });
    }

    if (dotsContainer) {
        projects.forEach(function (project, index) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "project-dot";
            dot.setAttribute("aria-label", `Go to project ${index + 1}: ${project.name}`);
            dot.addEventListener("click", function () {
                if (index !== currentIndex) {
                    goToProject(index - currentIndex);
                }
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateMobileEdge(index) {
        if (!stage) {
            return;
        }

        stage.classList.toggle("is-at-end", index === projects.length - 1);
    }

    async function goToProject(direction) {
        // Evita iniciar otra transición mientras la actual sigue en curso.
        if (isAdvancing) {
            return;
        }

        isAdvancing = true;
        const projectIndex = (currentIndex + direction + projects.length) % projects.length;
        const projectImage = new Image();
        projectImage.src = resolveImageUrl(projects[projectIndex].image);

        // Espera la imagen antes de animarla para evitar una transición vacía.
        try {
            await projectImage.decode();
        } catch (error) {
            console.error(`Could not load project image: ${projects[projectIndex].image}`, error);
            isAdvancing = false;
            return;
        }

        try {
            await view.animateTransition(projectImage);
            currentIndex = projectIndex;
            view.showProject(currentIndex);
            updateMobileEdge(currentIndex);
            updateDots(currentIndex);
            // Deja que el navegador pinte el nuevo contenido antes de limpiar la transición.
            await new Promise(function (resolve) {
                window.requestAnimationFrame(function () {
                    window.requestAnimationFrame(resolve);
                });
            });
            view.resetTransition();
            view.playPreviewAnimation();
        } finally {
            isAdvancing = false;
        }
    }

    next.addEventListener("click", function () {
        goToProject(1);
    });
    previous.addEventListener("click", function () {
        goToProject(-1);
    });
    preview.addEventListener("click", function () {
        goToProject(1);
    });

    // Muestra el primer proyecto y prepara la animación de su vista previa.
    view.showProject(currentIndex);
    updateMobileEdge(currentIndex);
    updateDots(currentIndex);
    view.playPreviewAnimation();
}
