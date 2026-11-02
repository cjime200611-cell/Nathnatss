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
    })
})