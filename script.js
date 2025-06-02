const formulario = document.getElementById("form-turno");
const mensaje = document.getElementById("mensaje-confirmacion");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  const fechaSeleccionada = new Date(`${fecha}T${hora}`);
  const dia = fechaSeleccionada.getDay(); 
  const horaSeleccionada = fechaSeleccionada.getHours();
  const minutosSeleccionados = fechaSeleccionada.getMinutes();

  const dentroHorarioManiana = (horaSeleccionada >= 8 && horaSeleccionada < 13);
  const dentroHorarioTarde = (horaSeleccionada >= 14 && horaSeleccionada < 20);

  if (dia === 0 || dia === 6) {
    mensaje.innerHTML = "⚠️ Sólo se pueden reservar turnos de lunes a viernes.";
    mensaje.style.display = "block";
    mensaje.style.backgroundColor = "#f8d7da";
    mensaje.style.color = "#721c24";
    mensaje.style.border = "1px solid #f5c6cb";
    return;
  }

  if (!dentroHorarioManiana && !dentroHorarioTarde) {
    mensaje.innerHTML = "⚠️ El horario debe estar entre las 8:00 y las 13:00 o entre las 14:00 y las 20:00.";
    mensaje.style.display = "block";
    mensaje.style.backgroundColor = "#f8d7da";
    mensaje.style.color = "#721c24";
    mensaje.style.border = "1px solid #f5c6cb";
    return;
  }

  mensaje.innerHTML = `Gracias <strong>${nombre}</strong>, tu turno fue agendado para el <strong>${fecha}</strong> a las <strong>${hora}</strong>.`;
  mensaje.style.display = "block";
  mensaje.style.backgroundColor = "#d4edda";
  mensaje.style.color = "#155724";
  mensaje.style.border = "1px solid #c3e6cb";

  formulario.reset();
});
