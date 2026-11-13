export function initializeMobileNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const navigation = document.querySelector("#site-nav");

    if (!toggle || !navigation) {
        return;
    }

    function setOpen(isOpen) {
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        navigation.classList.toggle("is-open", isOpen);
    }

    toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            setOpen(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setOpen(false);
            toggle.focus();
        }
    });

    window.matchMedia("(min-width: 769px)").addEventListener("change", function (event) {
        if (event.matches) {
            setOpen(false);
        }
    });
}
