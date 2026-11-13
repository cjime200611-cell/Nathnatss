// Mantiene una tarjeta abierta y delega las transiciones de altura a CSS.
export function initializeServiceCards() {
    const grid = document.querySelector("[data-service-grid]");
    if (!grid) {
        return;
    }

    const cards = Array.from(grid.querySelectorAll(".service-card")).map(function (card) {
        const button = card.querySelector(".service-title-toggle");
        const media = button && document.getElementById(button.getAttribute("aria-controls"));
        const action = card.querySelector(".service-action");

        if (!button || !media || !action) {
            throw new Error("A service card is missing its preview control, media, or action.");
        }

        return { card, button, media, action };
    });

    function setExpanded(activeCard) {
        let isOpen = false;

        cards.forEach(function (controls) {
            const expanded = controls.card === activeCard;

            controls.button.setAttribute("aria-expanded", String(expanded));
            controls.card.classList.toggle("is-expanded", expanded);
            controls.media.inert = !expanded;
            controls.action.inert = !expanded;
            isOpen = isOpen || expanded;
        });

        grid.dataset.state = isOpen ? "combined" : "all-closed";
    }

    cards.forEach(function (controls) {
        controls.media.inert = true;
        controls.action.inert = true;

        controls.card.addEventListener("click", function (event) {
            if (event.target.closest("a")) {
                return;
            }

            const activeCard = controls.button.getAttribute("aria-expanded") === "true"
                ? null
                : controls.card;
            setExpanded(activeCard);
        });
    });
}
