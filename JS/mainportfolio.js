document.addEventListener("DOMContentLoaded", function () {

    // Elements
    const portfolio = document.querySelector(".portfolio");
    const projects = Array.from(document.querySelectorAll(".project-card"));
    const filterButtons = document.querySelectorAll(".filter-group .filter-btn");
    const moreButton = document.querySelector(".btn-more");
    const tellMoreButton = document.querySelector(".tell-more-btn");
    const portfolioTitle = document.querySelector(".portfolio-title");
    const introText = document.querySelector(".intro-text");
    const categorySection = document.querySelector(".category-section");
    const filterHeader = document.getElementById("filter-header");
    const orderBtn = document.getElementById("order-btn");
    const orderMenu = document.getElementById("order-menu");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    // Configuration
    const projectsPerPage = 6;
    let visibleProjects = projectsPerPage;
    let currentFilter = "3d";
    let currentSort = "recent";

    // Category data with descriptions
    const categories = {
        "3d": {
            title: "3D Illustration",
            description: "An exploration of three-dimensional worlds, modeling, texturing, and rendering where art takes on volume and depth."
        },
        "personalized": {
            title: "Personalized Illustrations",
            description: "Unique stories and custom-made designs created exclusively to capture a special idea or personal project."
        },
        "commercial": {
            title: "Commercial Visualizations",
            description: "Projects focused on product design, architecture, and commercial environments created to highlight brands and connect with audiences."
        },
        "all": {
            title: "All Categories",
            description: "A journey through my entire creative universe; a comprehensive look at all the works and visual worlds I have created."
        }
    };

    // Update category colors and content
    function updateCategory(categoryKey) {
        // Update classes for color theming
        filterHeader.className = "button-group category-" + categoryKey;
        categorySection.className = "category-section category-" + categoryKey;

        // Update content
        portfolioTitle.textContent = categories[categoryKey].title;
        introText.textContent = categories[categoryKey].description;

        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
            if (btn.dataset.category === categoryKey) {
                btn.classList.add("active");
            }
        });
    }

    // Get category from project
    function getCategory(project) {
        const tag = project.querySelector(".category-tag");
        return tag ? tag.textContent.trim().toLowerCase() : "";
    }

    // Check if project matches filter
    function matchesFilter(project) {
        if (currentFilter === "all") {
            return true;
        }
        const category = getCategory(project);
        return category.includes(currentFilter);
    }

    // Sort projects
    function sortProjects() {
        if (!portfolio) return;

        const sortedProjects = [...projects];

        switch (currentSort) {
            case "recent":
                sortedProjects.sort((a, b) => {
                    const yearA = Number(a.querySelector(".project-year")?.textContent.trim()) || 0;
                    const yearB = Number(b.querySelector(".project-year")?.textContent.trim()) || 0;
                    return yearB - yearA;
                });
                break;
            case "oldest":
                sortedProjects.sort((a, b) => {
                    const yearA = Number(a.querySelector(".project-year")?.textContent.trim()) || 0;
                    const yearB = Number(b.querySelector(".project-year")?.textContent.trim()) || 0;
                    return yearA - yearB;
                });
                break;
            case "a-z":
                sortedProjects.sort((a, b) => {
                    const titleA = a.querySelector(".project-details h3")?.textContent.trim() || "";
                    const titleB = b.querySelector(".project-details h3")?.textContent.trim() || "";
                    return titleA.localeCompare(titleB);
                });
                break;
            case "z-a":
                sortedProjects.sort((a, b) => {
                    const titleA = a.querySelector(".project-details h3")?.textContent.trim() || "";
                    const titleB = b.querySelector(".project-details h3")?.textContent.trim() || "";
                    return titleB.localeCompare(titleA);
                });
                break;
        }

        sortedProjects.forEach(project => {
            portfolio.appendChild(project);
        });
    }

    // Display projects
    function displayProjects() {
        const filteredProjects = projects.filter(matchesFilter);

        filteredProjects.forEach((project, index) => {
            project.style.display = index < visibleProjects ? "" : "none";
        });

        projects.forEach(project => {
            if (!matchesFilter(project)) {
                project.style.display = "none";
            }
        });

        if (moreButton) {
            moreButton.style.display = filteredProjects.length > visibleProjects ? "inline-block" : "none";
        }
    }

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const categoryKey = this.dataset.category;
            if (!categoryKey) return;

            currentFilter = categoryKey;
            visibleProjects = projectsPerPage;

            updateCategory(categoryKey);
            sortProjects();
            displayProjects();
        });
    });

    // Dropdown menu toggle
    orderBtn?.addEventListener("click", function (e) {
        e.stopPropagation();
        orderBtn.classList.toggle("active");
        orderMenu?.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown-wrapper")) {
            orderMenu?.classList.remove("show");
            orderBtn?.classList.remove("active");
        }
    });

    // Handle dropdown item selection
    dropdownItems.forEach(item => {
        item.addEventListener("click", function () {
            currentSort = this.dataset.sort;
            visibleProjects = projectsPerPage;

            // Update button text and keep the arrow
            const buttonText = this.textContent;
            orderBtn.innerHTML = buttonText + '<span style="margin-left: auto;">▼</span>';

            // Update selected state
            dropdownItems.forEach(i => i.classList.remove("selected"));
            this.classList.add("selected");

            // Update projects
            sortProjects();
            displayProjects();

            // Close dropdown
            orderMenu?.classList.remove("show");
            orderBtn?.classList.remove("active");
        });
    });

    // Handle "More" button
    if (moreButton) {
        moreButton.addEventListener("click", function () {
            visibleProjects += 3;
            displayProjects();
        });
    }

    // Handle "Tell Me More" button
    if (tellMoreButton) {
        tellMoreButton.addEventListener("click", function () {
            const contactSection = document.querySelector("#contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            } else {
                alert("Contact section coming soon!");
            }
        });
    }

    // Initialize
    updateCategory("3d");
    dropdownItems[0]?.classList.add("selected");
    sortProjects();
    displayProjects();

});
