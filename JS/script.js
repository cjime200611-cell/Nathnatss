document.addEventListener("DOMContentLoaded",function(){

    //Obtener el formulario
    const form = document.getElementById("formulario");

    //Obtener el boton cerrar
    const botonCerrar = document.getElementById("cerrar-modal");

    //Obtener el mensaje de confirmación
    const confirmacion = document.getElementById("mensaje-exito");

    //Detectar cuando se envia el formulario
    form.addEventListener("submit",function(event){
        event.preventDefault();

        //Obtener los valores de los campos
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const servicio = document.getElementById("servicio").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        //Obtener los espacios para mostrar errores
        const errorNombre = document.getElementById("error-nombre");
        const errorEmail = document.getElementById("error-email");
        const errorTelefono = document.getElementById("error-telefono");
        const errorServicio = document.getElementById("error-servicio");
        const errorMensaje = document.getElementById("error-mensaje");

        //Limpiar los espacios de errores
        errorNombre.textContent = "";
        errorEmail.textContent = "";
        errorTelefono.textContent = "";
        errorServicio.textContent = "";
        errorMensaje.textContent = "";

        //Variable para comprobar si el formulario es valido
        let esValido = true;

        //Validar nombre
        if (nombre === "") {
            errorNombre.textContent = "Please enter your name";
            esValido = false;
        }

        //Validar correo
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            errorEmail.textContent = "Please enter a valid email";
            esValido = false;
        }

        //Validar telefono
        const regexTelefono = /^[0-9+\-\s()]{8,20}$/;
        if (telefono === "" || !regexTelefono.test(telefono)) {
            errorTelefono.textContent = "Please enter a valid phone number";
            esValido = false;
        }

        //Validar servicio
        if (servicio === "") {
            errorServicio.textContent = "Please select a service";
            esValido = false;
        }

        //Validar mensaje
        if (mensaje === "") {
            errorMensaje.textContent = "Please describe your project";
            esValido = false;
        }

        //Si hay errores detener el proceso
        if (!esValido) {
            return;
        }

        //Limpiar los campos del formulario
        form.reset();

        //Ocultar el formulario
        form.hidden = true;

        //Mostar confirmacion
        confirmacion.hidden = false;
        confirmacion.classList.add("mostrar");

        //Mostrar el mensaje de confirmación
        form.hidden = true
        document.getElementById("confirmacion").hidden = false;
    });

    //Boton para cerrar el modal
    botonCerrar.addEventListener("click",function(){
        window.location = "index.html";
    });
});