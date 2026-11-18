export function resetContactForm(dialog) {
    const form = dialog.querySelector("#formulario");
    const confirmation = dialog.querySelector("#mensaje-exito");

    form.reset();
    form.hidden = false;
    form.classList.remove("is-leaving");
    confirmation.hidden = true;
    confirmation.classList.remove("mostrar");

    dialog.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });
    dialog.querySelectorAll("[aria-invalid]").forEach(function (field) {
        field.removeAttribute("aria-invalid");
    });
}

export function initializeContactForm(dialog) {
    const form = dialog.querySelector("#formulario");
    const confirmation = dialog.querySelector("#mensaje-exito");
    const fields = [
        {
            input: dialog.querySelector("#nombre"),
            error: dialog.querySelector("#error-nombre"),
            message: "Please enter your name",
            isValid: function (value) {
                return value.length > 0;
            }
        },
        {
            input: dialog.querySelector("#email"),
            error: dialog.querySelector("#error-email"),
            message: "Please enter a valid email",
            isValid: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
        },
        {
            input: dialog.querySelector("#telefono"),
            error: dialog.querySelector("#error-telefono"),
            message: "Please enter a valid phone number",
            isValid: function (value) {
                return /^[0-9+\-\s()]{8,20}$/.test(value) && /\d/.test(value);
            }
        },
        {
            input: dialog.querySelector("#servicio"),
            error: dialog.querySelector("#error-servicio"),
            message: "Please select a service",
            isValid: function (value) {
                return value.length > 0;
            }
        },
        {
            input: dialog.querySelector("#mensaje"),
            error: dialog.querySelector("#error-mensaje"),
            message: "Please describe your project",
            isValid: function (value) {
                return value.length > 0;
            }
        }
    ];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        fields.forEach(function (field) {
            const value = field.input.value.trim();
            const fieldIsValid = field.isValid(value);

            field.error.textContent = fieldIsValid ? "" : field.message;
            field.input.setAttribute("aria-invalid", String(!fieldIsValid));
            isValid = isValid && fieldIsValid;
        });

        if (!isValid) {
            const firstInvalidField = fields.find(function (field) {
                return field.input.getAttribute("aria-invalid") === "true";
            });
            firstInvalidField.input.focus();
            return;
        }

        form.classList.add("is-leaving");
    });

    form.addEventListener("animationend", function (event) {
        if (event.target !== form || event.animationName !== "contact-form-exit" || !form.classList.contains("is-leaving") || !dialog.open) {
            return;
        }

        form.reset();
        form.hidden = true;
        form.classList.remove("is-leaving");
        confirmation.hidden = false;
        confirmation.classList.add("mostrar");
        confirmation.focus();
    });
}
