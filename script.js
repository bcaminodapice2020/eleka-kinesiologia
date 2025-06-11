document.getElementById("form-turno").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const fechaInput = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const mensajeDiv = document.getElementById("mensaje-confirmacion");

    mensajeDiv.innerHTML = "";
    mensajeDiv.className = "";
    mensajeDiv.style.display = "block";

    if (!fechaInput || !hora || !nombre || !email) {
        mensajeDiv.textContent = "Por favor, completá todos los campos.";
        mensajeDiv.classList.add("error");
        return;
    }

    const fechaSeleccionada = new Date(`${fechaInput}T${hora}`);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
        mensajeDiv.textContent = "La fecha seleccionada ya pasó. Por favor, elegí una fecha futura.";
        mensajeDiv.classList.add("error");
        return;
    }

    const diaSemana = fechaSeleccionada.getDay(); 
    if (diaSemana === 0 || diaSemana === 6) {
        mensajeDiv.textContent = "El consultorio está cerrado los fines de semana.";
        mensajeDiv.classList.add("error");
        return;
    }

    const [horaSeleccionada, minutos] = hora.split(":").map(Number);
    const horaDecimal = horaSeleccionada + minutos / 60;

    if (horaDecimal < 8 || (horaDecimal >= 13 && horaDecimal < 14) || horaDecimal >= 20) {
        mensajeDiv.textContent = "El consultorio solo atiende de 8:00 a 13:00 y de 14:00 a 20:00.";
        mensajeDiv.classList.add("error");
        return;
    }


    const dia = fechaSeleccionada.getDate().toString().padStart(2, '0');
    const mes = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaSeleccionada.getFullYear();

    mensajeDiv.innerHTML = `¡Turno reservado con éxito para <strong>${nombre}</strong> el <strong>${dia}/${mes}/${año}</strong> a las <strong>${hora}</strong> hs!`;
    mensajeDiv.classList.add("exito");

    document.getElementById("form-turno").reset();
});
