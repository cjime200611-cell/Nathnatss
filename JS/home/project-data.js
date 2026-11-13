// Para qué sirve: carga los proyectos desde projects.json y comprueba que sus
// datos, categorías, enlaces e imágenes sean válidos antes de mostrarlos.
const portfolioCategories = [
    "3D ILLUSTRATION",
    "COMMERCIAL VISUALIZATION",
    "PERSONALIZED ILLUSTRATIONS"
];

// Campos que cada proyecto necesita para mostrarse correctamente.
const requiredProjectFields = [
    "id",
    "name",
    "description",
    "image",
    "portfolioCategory",
    "year",
    "client"
];

const projectsUrl = new URL("../../projects.json", import.meta.url);

function validateProject(project, index, projectIds) {
    if (typeof project !== "object" || project === null || Array.isArray(project)) {
        throw new Error(`Project ${index + 1} must be an object.`);
    }

    requiredProjectFields.forEach(function (field) {
        if (typeof project[field] !== "string" || project[field].trim() === "") {
            throw new Error(`Project ${index + 1} is missing a valid "${field}" value.`);
        }
    });

    if (!portfolioCategories.includes(project.portfolioCategory)) {
        throw new Error(`Project "${project.id}" has an unsupported portfolio category.`);
    }

    if (projectIds.has(project.id)) {
        throw new Error(`Project id "${project.id}" must be unique.`);
    }
    projectIds.add(project.id);

    // Las imágenes aceptan rutas relativas; los enlaces externos deben ser HTTP(S).
    validateUrl(project.image, `Project "${project.id}" image`, true);
    if (project.link !== undefined && typeof project.link !== "string") {
        throw new Error(`Project "${project.id}" has an invalid link.`);
    }
    if (project.link && project.link.trim() !== "") {
        validateUrl(project.link, `Project "${project.id}" link`, false);
    }
}

function validateUrl(value, label, allowRelative) {
    let url;

    try {
        url = new URL(value, projectsUrl);
    } catch {
        throw new Error(`${label} has an invalid URL.`);
    }

    const isRelative = !/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value) && !value.startsWith("//");
    if (url.protocol !== "http:" && url.protocol !== "https:" && !(allowRelative && isRelative)) {
        throw new Error(`${label} has an unsupported URL.`);
    }
}

export async function loadProjects() {
    // La URL se calcula desde este módulo para que no dependa de la página actual.
    const response = await fetch(projectsUrl);
    if (!response.ok) {
        throw new Error(`Could not load projects.json: ${response.status} ${response.statusText}`);
    }

    const projects = await response.json();
    if (!Array.isArray(projects) || projects.length === 0) {
        throw new Error("Project data must be a non-empty array in projects.json.");
    }

    const projectIds = new Set();
    projects.forEach(function (project, index) {
        validateProject(project, index, projectIds);
    });

    return projects;
}

export function resolveImageUrl(image) {
    // Resuelve imágenes relativas desde la ubicación de projects.json.
    return new URL(image, projectsUrl).href;
}
