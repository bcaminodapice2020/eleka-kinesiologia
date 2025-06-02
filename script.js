document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-turno");
    const mensaje = document.getElementById("mensaje-confirmacion");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;

        const fechaSeleccionada = new Date(fecha);
        const diaSemana = fechaSeleccionada.getDay(); // 0: Domingo, 6: Sábado

        const [horaSeleccionada, minutosSeleccionados] = hora.split(":").map(Number);
        const minutosTotales = horaSeleccionada * 60 + minutosSeleccionados;

        
        const mañanaInicio = 8 * 60;
        const mañanaFin = 13 * 60;
        const tardeInicio = 14 * 60;
        const tardeFin = 20 * 60;

        
        mensaje.innerText = "";
        mensaje.style.display = "none";

        
        if (diaSemana === 0 || diaSemana === 6) {
            mostrarMensaje("El consultorio está cerrado los fines de semana.", false);
            return;
        }

        if (!((minutosTotales >= mañanaInicio && minutosTotales < mañanaFin) ||
              (minutosTotales >= tardeInicio && minutosTotales <= tardeFin))) {
            mostrarMensaje("El horario seleccionado está fuera del horario de atención (08:00–13:00 y 14:00–20:00).", false);
            return;
        }

        const mensajeTexto = `¡Turno reservado con éxito para ${nombre} el ${fecha} a las ${hora} hs!`;
        mostrarMensaje(mensajeTexto, true);

        form.reset();
    });

    function mostrarMensaje(texto, esExito) {
        mensaje.innerText = texto;
        mensaje.style.display = "block";
        mensaje.style.backgroundColor = esExito ? "#d4edda" : "#f8d7da";
        mensaje.style.color = esExito ? "#155724" : "#721c24";
        mensaje.style.border = esExito ? "1px solid #c3e6cb" : "1px solid #f5c6cb";
        mensaje.style.padding = "10px";
        mensaje.style.marginTop = "10px";
        mensaje.style.borderRadius = "5px";
    }
});
