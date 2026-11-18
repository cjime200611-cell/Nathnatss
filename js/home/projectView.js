// Actualiza los datos visibles del proyecto y controla sus animaciones.
import { resolveImageUrl } from "./projectData.js";

function getRequiredElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Required page element "#${id}" was not found.`);
    }
    return element;
}

function setBackgroundImage(element, image) {
    element.style.backgroundImage = `url(${JSON.stringify(resolveImageUrl(image))})`;
}

function playAnimation(element, className) {
    element.classList.remove(className);
    // Fuerza el reinicio del estado para que la animación vuelva a ejecutarse.
    void element.offsetWidth;
    element.classList.add(className);
}

export function createProjectView(projects) {
    // Obtiene los elementos del carrusel definidos por ID en el HTML.
    const stage = getRequiredElement("project-stage");
    const visual = getRequiredElement("project-artwork");
    const content = getRequiredElement("project-details");
    const name = getRequiredElement("project-title");
    const description = getRequiredElement("project-description");
    const projectYear = getRequiredElement("project-year");
    const projectClient = getRequiredElement("project-client-name");
    const portfolioCategoryLabel = getRequiredElement("project-category");
    const projectCount = getRequiredElement("project-count");
    const seeMore = getRequiredElement("project-link");
    const preview = getRequiredElement("project-preview");
    const previewName = getRequiredElement("project-preview-name");
    const transitionImage = getRequiredElement("project-transition");

    function showProject(index) {
        const project = projects[index];
        // Al llegar al final, la vista previa vuelve al primer proyecto.
        const nextProject = projects[(index + 1) % projects.length];

        setBackgroundImage(visual, project.image);
        name.textContent = project.name;
        description.textContent = project.description;
        portfolioCategoryLabel.textContent = project.portfolioCategory;
        projectYear.textContent = project.year;
        projectClient.textContent = project.client;
        projectCount.textContent = `PROJECT ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

        if (project.link) {
            seeMore.href = project.link;
            seeMore.removeAttribute("aria-disabled");
            seeMore.removeAttribute("tabindex");
        } else {
            // Sin enlace, el control queda fuera del foco y se anuncia como deshabilitado.
            seeMore.removeAttribute("href");
            seeMore.setAttribute("aria-disabled", "true");
            seeMore.setAttribute("tabindex", "-1");
        }

        preview.style.backgroundImage = `linear-gradient(rgba(10, 14, 11, 0.24), rgba(10, 14, 11, 0.24)), url(${JSON.stringify(resolveImageUrl(nextProject.image))})`;
        previewName.textContent = nextProject.name;
        preview.setAttribute("aria-label", `Go to ${nextProject.name}`);
        playAnimation(content, "is-entering");
    }

    function playPreviewAnimation() {
        playAnimation(preview, "is-entering");
    }

    function animateTransition(image) {
        if (window.matchMedia("(max-width: 1024px)").matches) {
            return Promise.resolve();
        }

        setBackgroundImage(transitionImage, image.src);
        const previewBounds = preview.getBoundingClientRect();
        const visualBounds = visual.getBoundingClientRect();

        // La capa de transición empieza en la posición exacta de la vista previa.
        transitionImage.style.setProperty("--transition-top", `${previewBounds.top - visualBounds.top}px`);
        transitionImage.style.setProperty("--transition-right", `${visualBounds.right - previewBounds.right}px`);
        transitionImage.style.setProperty("--transition-bottom", `${visualBounds.bottom - previewBounds.bottom}px`);
        transitionImage.style.setProperty("--transition-left", `${previewBounds.left - visualBounds.left}px`);
        transitionImage.style.setProperty("--transition-width", `${previewBounds.width}px`);
        transitionImage.style.setProperty("--transition-height", `${previewBounds.height}px`);
        transitionImage.style.setProperty("--transition-transform", "none");
        stage.classList.add("is-transitioning");
        // Aplica las medidas iniciales antes de activar la expansión animada.
        void transitionImage.offsetWidth;

        return new Promise(function (resolve) {
            let finished = false;
            const timeout = window.setTimeout(finishTransition, 1250);

            // Resuelve al terminar el cambio de ancho o al vencer el tiempo de respaldo.
            function finishTransition(event) {
                if (finished || (event && event.propertyName !== "width")) {
                    return;
                }

                finished = true;
                window.clearTimeout(timeout);
                transitionImage.removeEventListener("transitionend", finishTransition);
                resolve();
            }

            transitionImage.addEventListener("transitionend", finishTransition);
            window.requestAnimationFrame(function () {
                transitionImage.classList.add("is-expanding");
            });
        });
    }

    function resetTransition() {
        transitionImage.classList.remove("is-expanding");
        stage.classList.remove("is-transitioning");
        // Quita las medidas temporales para recuperar los valores responsivos de Sass.
        [
            "--transition-top",
            "--transition-right",
            "--transition-bottom",
            "--transition-left",
            "--transition-width",
            "--transition-height",
            "--transition-transform"
        ].forEach(function (property) {
            transitionImage.style.removeProperty(property);
        });
    }

    return {
        showProject,
        playPreviewAnimation,
        animateTransition,
        resetTransition
    };
}
