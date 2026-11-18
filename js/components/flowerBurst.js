const interactiveSelector = "a, button, input, select, textarea, label, summary, [role='button']";
const flowerCount = 8;

export function initializeFlowerBurst() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    document.addEventListener("pointerdown", function (event) {
        if (event.pointerType !== "touch" || !event.isPrimary || !(event.target instanceof Element)) {
            return;
        }

        const control = event.target.closest(interactiveSelector);
        if (!control || control.matches(":disabled, [aria-disabled='true']")) {
            return;
        }

        const burst = document.createElement("span");
        burst.className = "flower-burst";
        burst.setAttribute("aria-hidden", "true");
        burst.style.left = event.clientX + "px";
        burst.style.top = event.clientY + "px";

        const marks = Array.from({ length: flowerCount }, function (_, index) {
            const mark = document.createElement("img");
            mark.className = "flower-burst__mark";
            mark.src = new URL("../../public/assets/shared/logo.png", import.meta.url).href;
            mark.alt = "";
            mark.draggable = false;
            mark.style.setProperty("--flower-angle", index * (360 / flowerCount) + "deg");
            mark.style.setProperty("--flower-delay", index * 12 + "ms");
            burst.append(mark);
            return mark;
        });

        const dialog = control.closest("dialog[open]");
        (dialog || document.body).append(burst);

        let cleanupTimer = 0;
        function removeBurst() {
            window.clearTimeout(cleanupTimer);
            burst.remove();
        }

        cleanupTimer = window.setTimeout(removeBurst, 900);
        marks[marks.length - 1].addEventListener("animationend", removeBurst, { once: true });
    }, { passive: true });
}
