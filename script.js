document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("form-turno");
  const mensajeTurno = document.getElementById("mensaje-turno");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const fecha = new Date(document.getElementById("fecha").value);
    const hora = document.getElementById("hora").value;

    const diaSemana = fecha.getDay(); 
    const horaNumerica = parseInt(hora.split(":")[0]);

    mensajeTurno.className = ""; 

    if (diaSemana === 0 || diaSemana === 6) {
      mensajeTurno.textContent = "No se pueden reservar turnos los fines de semana.";
      mensajeTurno.classList.add("error");
      return;
    }

    if (horaNumerica < 9 || horaNumerica >= 18) {
      mensajeTurno.textContent = "El horario de atención es de 9 a 18 hs.";
      mensajeTurno.classList.add("error");
      return;
    }

    mensajeTurno.textContent = `¡Turno reservado con éxito para ${nombre} el ${fecha.toLocaleDateString()} a las ${hora} hs!`;
    mensajeTurno.classList.add("exito");

    formulario.reset();
  });
});

