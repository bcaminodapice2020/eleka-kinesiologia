
const formulario = document.getElementById("form-turno");
const mensaje = document.getElementById("mensaje-confirmacion");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  
  mensaje.innerHTML = `Gracias <strong>${nombre}</strong>, tu turno fue agendado para el <strong>${fecha}</strong> a las <strong>${hora}</strong>.`;
  mensaje.style.color = "green";
  mensaje.style.marginTop = "15px";
  mensaje.style.fontWeight = "bold";

  formulario.reset();
});
