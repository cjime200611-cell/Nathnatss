export function initializeMobileNavigation(){
    const toggle = document.querySelector(".nav-toggle");
    const sideMenu = document.querySelector("#side-menu");
    const closeButton = document.querySelector("#close-menu");
    const pageContent = document.querySelector("#page-content");
    const menuLinks = document.querySelectorAll(".side-menu-links a, .side-menu-cta");

    if (!toggle || !sideMenu || !closeButton || !pageContent) {
        return;
    }
    
    // Animacion de presion de los botones
    function animatePress(button) {
        button.classList.add("is-pressed");

        setTimeout(function () {
            button.classList.remove("is-pressed");
        }, 140);
    }

    // Abrir y cerrar el menú
    function setOpen(isOpen){

        // Devolver al foco al boton de ocultar el menu
        if (!isOpen && sideMenu.contains(document.activeElement)) {
            toggle.focus();
        }

        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute(
            "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    sideMenu.classList.toggle("active", isOpen);
    sideMenu.setAttribute("aria-hidden", String(!isOpen));
    sideMenu.inert = !isOpen;

    pageContent.classList.toggle("menu-open", isOpen);

    if (isOpen){
        closeButton.focus();
    }
}

// Evento del boton harburguesa
toggle.addEventListener("click", function (event) {
    event.stopPropagation();
    
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    animatePress(toggle);
    setOpen(!isOpen);
});

// Evento del boton cerrar
closeButton.addEventListener("click", function (event) {
    event.stopPropagation();

    animatePress(closeButton);
        setOpen(false);
    });

// Cerrar el menu al seleccionar un enlace
menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        setOpen(false);
    });
});

// Cerrar el menu al hacer clic en el contenido
pageContent.addEventListener("click", function () {
    if (toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
    }
});

// Cerrar el menu con escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && 
        toggle.getAttribute("aria-expanded") === "true"
    ){
        setOpen(false);
        toggle.focus();
    }
});

// Cerrar el menu cuando se cambia a desktop
window.matchMedia("(min-width: 769px)").addEventListener(
    "change",
    function (event) {
        if (event.matches) {
            setOpen(false);
        }
    }
);
}

(() => {
    function initSideMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const closeMenu = document.getElementById('close-menu');
        const sideMenu = document.getElementById('side-menu');
        const pageContent = document.getElementById('page-content');
        const pageViewport = document.querySelector('.page-viewport');
        const sideLinks = document.querySelectorAll('.side-menu-links a, .side-menu-cta, .side-menu-socials a');

        if (!navToggle || !sideMenu || !pageContent) return;

        function animarPresion(boton, callback) {
            if (!boton) {
                callback();
                return;
            }
            boton.classList.add('is-pressed');
            setTimeout(() => {
                boton.classList.remove('is-pressed');
                callback();
            }, 140);
        }

        function abrirMenu() {
            sideMenu.classList.add('active');
            sideMenu.setAttribute('aria-hidden', 'false');
            sideMenu.removeAttribute('inert');

            pageContent.classList.add('menu-open');
            if (pageViewport) pageViewport.classList.add('menu-open');

            navToggle.setAttribute('aria-expanded', 'true');
        }

        function cerrarMenu() {
            sideMenu.classList.remove('active');
            sideMenu.setAttribute('aria-hidden', 'true');
            sideMenu.setAttribute('inert', '');

            pageContent.classList.remove('menu-open');
            if (pageViewport) pageViewport.classList.remove('menu-open');

            navToggle.setAttribute('aria-expanded', 'false');
        }

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            animarPresion(navToggle, abrirMenu);
        });

        if (closeMenu) {
            closeMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                animarPresion(closeMenu, cerrarMenu);
            });
        }

        pageContent.addEventListener('click', () => {
            if (pageContent.classList.contains('menu-open')) {
                cerrarMenu();
            }
        });

        sideLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (pageContent.classList.contains('menu-open')) {
                    cerrarMenu();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && pageContent.classList.contains('menu-open')) {
                cerrarMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 769 && pageContent.classList.contains('menu-open')) {
                cerrarMenu();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSideMenu);
    } else {
        initSideMenu();
    }
})();
