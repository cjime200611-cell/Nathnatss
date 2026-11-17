import { initializeContactForm, resetContactForm } from "./form.js";

const openers = document.querySelectorAll("[data-contact-modal-open]");
const contactFormUrl = new URL("../../form.html", import.meta.url);
let modalPromise;
let lastOpener;

function loadContactModal() {
    return fetch(contactFormUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`Could not load the contact form: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(function (markup) {
            const formDocument = new DOMParser().parseFromString(markup, "text/html");
            const dialog = formDocument.querySelector("#contact-modal");

            if (!(dialog instanceof HTMLDialogElement)) {
                throw new Error("The contact form fragment must contain #contact-modal.");
            }

            dialog.querySelectorAll("img[src]").forEach(function (image) {
                image.src = new URL(image.getAttribute("src"), contactFormUrl).href;
            });

            document.body.append(dialog);
            initializeContactForm(dialog);

            function closeDialog() {
                if (!dialog.open || dialog.classList.contains("is-leaving")) {
                    return;
                }

                dialog.classList.add("is-leaving");

                let closeTimer;
                let hasClosed = false;

                function finishClose() {
                    if (hasClosed) {
                        return;
                    }

                    hasClosed = true;
                    window.clearTimeout(closeTimer);
                    dialog.removeEventListener("animationend", handleAnimationEnd);
                    resetContactForm(dialog);
                    dialog.close();
                    dialog.classList.remove("is-leaving");

                    const cursorLayer = dialog.querySelector(".logo-cursor");
                    if (cursorLayer) {
                        document.body.append(cursorLayer);
                    }

                    if (lastOpener && lastOpener.getClientRects().length > 0) {
                        lastOpener.focus();
                        return;
                    }

                    const navigationToggle = document.querySelector(".nav-toggle");
                    if (navigationToggle) {
                        navigationToggle.focus();
                    }
                }

                function handleAnimationEnd(event) {
                    if (event.target === dialog && event.animationName === "contact-modal-fade-out") {
                        finishClose();
                    }
                }

                dialog.addEventListener("animationend", handleAnimationEnd);
                closeTimer = window.setTimeout(finishClose, 350);
            }

            dialog.querySelector("#cerrar-modal").addEventListener("click", closeDialog);
            dialog.addEventListener("cancel", function (event) {
                event.preventDefault();
                closeDialog();
            });
            dialog.addEventListener("click", function (event) {
                if (event.target === dialog) {
                    closeDialog();
                }
            });

            return dialog;
        });
}

openers.forEach(function (opener) {
    opener.addEventListener("click", function (event) {
        event.preventDefault();
        lastOpener = opener;

        if (!modalPromise) {
            modalPromise = loadContactModal();
        }

        modalPromise
            .then(function (dialog) {
                if (!dialog.open) {
                    resetContactForm(dialog);
                    dialog.showModal();

                    const cursorLayer = document.querySelector(".logo-cursor");
                    if (cursorLayer) {
                        dialog.append(cursorLayer);
                    }
                }
            })
            .catch(function (error) {
                console.error("Could not open the contact form.", error);
            });
    });
});
