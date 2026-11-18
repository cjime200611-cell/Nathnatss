// Muestra el logo con una estela ligera solo en dispositivos con mouse.
export function initializeLogoCursor() {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) {
        return;
    }

    const layer = document.createElement("div");
    layer.className = "logo-cursor";
    layer.setAttribute("aria-hidden", "true");

    const marks = [38, 34, 30, 27, 24, 21, 18, 15, 12, 10, 8, 6].map(function (size, index) {
        const mark = document.createElement("img");
        mark.className = index === 0 ? "logo-cursor__mark logo-cursor__mark--main" : "logo-cursor__mark";
        mark.src = new URL("../../public/assets/shared/logo.png", import.meta.url).href;
        mark.alt = "";
        mark.draggable = false;
        mark.style.width = size + "px";
        mark.style.opacity = String(index === 0 ? 1 : 0.58 - index * 0.04);
        layer.append(mark);
        return { element: mark, x: 0, y: 0 };
    });

    document.body.append(layer);

    let targetX = 0;
    let targetY = 0;
    let animationFrame = 0;
    let hasPointer = false;

    function animate() {
        let leaderX = targetX;
        let leaderY = targetY;
        let remainingDistance = 0;

        marks.forEach(function (mark, index) {
            const previousX = mark.x;
            const previousY = mark.y;
            const followSpeed = index === 0 ? 0.58 : 0.24;

            mark.x += (leaderX - mark.x) * followSpeed;
            mark.y += (leaderY - mark.y) * followSpeed;
            mark.element.style.transform = "translate3d(" + mark.x + "px, " + mark.y + "px, 0) translate(-50%, -50%)";
            remainingDistance = Math.max(remainingDistance, Math.abs(mark.x - previousX), Math.abs(mark.y - previousY));
            leaderX = mark.x;
            leaderY = mark.y;
        });

        animationFrame = remainingDistance > 0.1 ? window.requestAnimationFrame(animate) : 0;
    }

    document.addEventListener("pointermove", function (event) {
        targetX = event.clientX;
        targetY = event.clientY;
        layer.classList.add("is-visible");
        document.body.classList.add("has-logo-cursor");

        if (!animationFrame) {
            if (!hasPointer) {
                marks.forEach(function (mark) {
                    mark.x = targetX;
                    mark.y = targetY;
                });
                hasPointer = true;
            }
            animationFrame = window.requestAnimationFrame(animate);
        }
    }, { passive: true });

    document.addEventListener("pointerout", function (event) {
        if (event.relatedTarget) {
            return;
        }

        layer.classList.remove("is-visible");
        document.body.classList.remove("has-logo-cursor");
    });
}
