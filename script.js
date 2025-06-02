document.getElementById("form-turno").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const fechaInput = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const mensajeDiv = document.getElementById("mensaje-confirmacion");

    mensajeDiv.innerHTML = "";
    mensajeDiv.className = "";

    if (!fechaInput || !hora || !nombre || !email) {
        mensajeDiv.textContent = "Por favor, completá todos los campos.";
        mensajeDiv.className = "error";
        return;
    }

    const fechaSeleccionada = new Date(`${fechaInput}T${hora}`);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); 

    if (fechaSeleccionada < hoy) {
        mensajeDiv.textContent = "La fecha seleccionada ya pasó. Por favor, elegí una fecha futura.";
        mensajeDiv.className = "error";
        return;
    }

    const diaSemana = fechaSeleccionada.getDay(); // 0 (domingo) a 6 (sábado)
    const horaSeleccionada = parseInt(hora.split(":")[0]);
    const minutos = parseInt(hora.split(":")[1]);

    if (diaSemana === 0 || diaSemana === 6) {
        mensajeDiv.textContent = "El consultorio está cerrado los fines de semana.";
        mensajeDiv.className = "error";
        return;
    }

    const horaDecimal = horaSeleccionada + minutos / 60;
    if (horaDecimal < 8 || (horaDecimal >= 13 && horaDecimal < 14) || horaDecimal >= 20) {
        mensajeDiv.textContent = "El consultorio solo atiende de 8:00 a 13:00 y de 14:00 a 20:00.";
        mensajeDiv.className = "error";
        return;
    }

    
    const dia = fechaSeleccionada.getDate().toString().padStart(2, '0');
    const mes = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaSeleccionada.getFullYear();

    mensajeDiv.innerHTML = `¡Hola ${nombre}, tu turno ha sido reservado exitosamente para el <strong>${dia}/${mes}/${año}</strong> a las <strong>${hora}</strong> hs!`;
    mensajeDiv.className = "exito";

    document.getElementById("form-turno").reset();
});
