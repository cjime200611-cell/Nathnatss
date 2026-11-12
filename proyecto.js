document.addEventListener("DOMContentLoaded", function () {

    //Elementos del HTML
    const portfolio = document.querySelector(".portfolio");
    const projects = Array.from(document.querySelectorAll(".Columna"));
    const filterButtons = document.querySelectorAll(".botton button");
    const moreButton = document.querySelector(".btn-more");
    const tellMoreButton = document.querySelector (".tell-more-btn");

    //Configuración
    const projectsPerPage = 6;
    let visibleProjects = projectsPerPage
    let currentFilter = "all";
    let recentFirst = false;

    //Mostrar categoria de cada proyecto
    function getCategory(project) {
        const tag = project.querySelector(".category-tag");

        if (tag) {
            return tag.textContent.trim().toLowerCase();
        }

        return "";
    }

    // Comprobar si el proyecto pertenece a su categoria
    function matchesFilter(project) {
        if (currentFilter === "all") {
            return true;
        }

        const category = getCategory(project);

        return category.includes(currentFilter);
    }

    //Ordenar por fecha
    function sortProjects () {
        if (!portfolio) return;

        const sortedProjects = [...projects];

        if (recentFirst) {
            sortedProjects.sort((a, b) => {
                const yearA = Number(
                    a.querySelector(".project-year")?.textContent.trim()
                ) || 0;

                const yearB = Number(
                    b.querySelector(".project-year")?.textContent.trim()
                ) || 0;

                return yearB - yearA;
            });
        }

        sortedProjects.forEach(project => {
            portfolio.appendChild(project);
        });
    }

    //Mostrar Proyectos
    function displayProjects() {
        const filteredProjects = projects.filter(matchesFilter);

        filteredProjects.forEach((project, index) => {
            project.style.display =
                index < visibleProjects ? "": "none";
        });

        projects.forEach(project => {
            if (!matchesFilter(project)) {
                project.style.display = "none";
            }
        });

        // Mostrar U Ocultar el botón More
        if (moreButton) {
            moreButton.style.display =
            filteredProjects.length > visibleProjects
            ? "inline-block"
            : "none";
        }
    }

    //Filtros de categoría
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {

            const buttonText = this.textContent.trim().toLowerCase();

            if (buttonText === "3d illustration"){
                currentFilter = "3d";
            } else if (buttonText === "personalized illustrations") {
                currentFilter = "personalized";
            } else if (buttonText === "commercial visualization") {
                currentFilter = "commercial";
        } else if (buttonText === "all"){
            currentFilter = "all";
        } else {
            return;
        }
        
        visibleProjects = projectsPerPage;
        displayProjects();
    });
});

// Most Recent
filterButtons.forEach(button => {
    if (button.textContent.trim().toLowerCase() === "most recent"){
        button.addEventListener("click", function (){
            recentFirst = true;
            sortProjects();
            displayProjects();
        });
    }
});

//Botón More
if (moreButton) {
    moreButton.addEventListener("click", function (){
        visibleProjects += 3;
        displayProjects();
    });
}

// Botón Tell Me More
if (tellMoreButton) {
    tellMoreButton.addEventListener("click", function () {
        const contactSection = document.querySelector("#contact");

        if (contactSection){
            contactSection.scrollIntoView({
                behavior: "smooth"
            });
        } else {
            alert("Contact section coming soon!");
        }
    });
}

//Iniciar Portfolio
displayProjects();

});