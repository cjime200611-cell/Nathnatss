document.addEventListener("DOMContentLoaded", function (){

    const form = document.getElementById("formulario");

    // Enviar formulario
    form.addEventListener("submit", function (event){
        event.preventDefault();

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const servicio = document.getElementById("servicio").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Obtener los espacios de los errores
        const errorNombre = document.getElementById("error-nombre");
        const errorEmail = document.getElementById("error-email");
        const errorServicio = document.getElementById("error-servicio");
        const errorMensaje = document.getElementById("error-mensaje");

        // Limpiar los espacios de los errores
        errorNombre.textContent = "";
        errorEmail.textContent = "";
        errorServicio.textContent = "";
        errorMensaje.textContent = "";

        let error = false;

        // Validar nombre
        if (nombre === "") {
            errorNombre.textContent = "Please enter your name or company name.";
            esValido = false;
        }

        // Validar email
        const rogexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            errorEmail.textContent = "Please enter your email.";
            esValido = false;
        }

        // Validar servicio
        if (servicio === "") {
            errorServicio.textContent = "Please select a service.";
            esValido = false;
        }

        //Validar descripción del proyecto
        if (mensaje === "") {
            errorMensaje.textContent = "Please describe your project.";
            esValido = false;
        }

        // Si hay errores, detener el proceso
        if (!esValido) {
            return;
        }

        // Mostrar confirmación de envio
        form.hidden = true;
        document.getElementById("mensaje-exito").hidden = false;
    });

    // Boton para cerrar el formulario
    const botonCerrar = document.querySelector(".close-button");

    botonCerrar.addEventListener("click", function () {
        window.location.href = "index.html";
    });
})