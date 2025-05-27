
  const formulario = document.getElementById("form-turno");
  const mensaje = document.getElementById("mensaje-confirmacion");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); 

   
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    
    alert(`Gracias ${nombre}, su turno fue agendado para el día ${fecha} a las ${hora}.`);

   
    formulario.reset();
  });