// --- Estado de la app ---
const turnos = [];        // Array de objetos {nombre,email,fechaISO,hora}
let editIndex = -1;       // -1 = modo “crear”, >=0 = modo “editar”

// --- Elementos del DOM ---
const form = document.getElementById("form-turno");
const listaTurnos = document.getElementById("lista-turnos");
const tituloTurnos = document.getElementById("titulo-turnos");
const mensajeDiv = document.getElementById("mensaje-confirmacion");

// --- Utilidades de validación ---
function validarTurno(nombre,email,fechaISO,hora){
  if(!nombre || !email || !fechaISO || !hora) return "Por favor, completá todos los campos.";

  const fechaSeleccionada = new Date(`${fechaISO}T${hora}`);
  const hoy = new Date(); hoy.setHours(0,0,0,0);
  if(fechaSeleccionada < hoy) return "La fecha seleccionada ya pasó. Por favor, elegí una fecha futura.";

  const diaSemana = fechaSeleccionada.getDay();
  if(diaSemana===0 || diaSemana===6) return "El consultorio está cerrado los fines de semana.";

  const [h,m] = hora.split(":").map(Number);
  const horaDec = h + m/60;
  if(horaDec<8 || (horaDec>=13 && horaDec<14) || horaDec>=20)
    return "El consultorio solo atiende de 8:00 a 13:00 y de 14:00 a 20:00.";

  return ""; // sin errores
}

// --- Renderiza la lista de turnos ---
function dibujarTurnos(){
  listaTurnos.innerHTML = "";
  if(turnos.length===0){
    tituloTurnos.style.display="none";
    return;
  }
  tituloTurnos.style.display="block";

  turnos.forEach(({nombre,fechaISO,hora},idx)=>{
    const li = document.createElement("li");
    li.className="turno-item";

    const fechaObj = new Date(`${fechaISO}T${hora}`);
    const dia = fechaObj.getDate().toString().padStart(2,"0");
    const mes = (fechaObj.getMonth()+1).toString().padStart(2,"0");
    const anio = fechaObj.getFullYear();

    li.innerHTML = `
      <span><strong>${nombre}</strong> • ${dia}/${mes}/${anio} • ${hora} hs</span>
      <button class="editar" data-idx="${idx}">Editar</button>
      <button class="eliminar" data-idx="${idx}">Eliminar</button>
    `;
    listaTurnos.appendChild(li);
  });
}

// --- Crear / actualizar turno ---
form.addEventListener("submit", e=>{
  e.preventDefault();
  mensajeDiv.textContent=""; mensajeDiv.className=""; mensajeDiv.style.display="block";

  const nombre = document.getElementById("nombre").value.trim();
  const email  = document.getElementById("email").value.trim();
  const fechaISO = document.getElementById("fecha").value;
  const hora   = document.getElementById("hora").value;

  const error = validarTurno(nombre,email,fechaISO,hora);
  if(error){
    mensajeDiv.textContent=error;
    mensajeDiv.classList.add("error");
    return;
  }

  if(editIndex === -1){
    // Alta
    turnos.push({nombre,email,fechaISO,hora});
  }else{
    // Edición
    turnos[editIndex] = {nombre,email,fechaISO,hora};
    editIndex = -1;
  }
  dibujarTurnos();

  const fechaObj = new Date(`${fechaISO}T${hora}`);
  const dia = fechaObj.getDate().toString().padStart(2,"0");
  const mes = (fechaObj.getMonth()+1).toString().padStart(2,"0");
  const anio = fechaObj.getFullYear();
  mensajeDiv.innerHTML = `¡Turno reservado con éxito para <strong>${nombre}</strong> el <strong>${dia}/${mes}/${anio}</strong> a las <strong>${hora}</strong> hs!`;
  mensajeDiv.classList.add("exito");

  form.reset();
});

// --- Delegación para Editar / Eliminar ---
listaTurnos.addEventListener("click", e=>{
  const idx = e.target.dataset.idx;
  if(idx === undefined) return;

  if (e.target.classList.contains("eliminar")){
  turnos.splice(idx,1);
  dibujarTurnos();
    
  // limpiar/ocultar el banner de confirmación
  mensajeDiv.textContent = "";
  mensajeDiv.className = "";
  mensajeDiv.style.display = "none";
  return;
  }else if(e.target.classList.contains("editar")){
    const t = turnos[idx];
    document.getElementById("nombre").value = t.nombre;
    document.getElementById("email").value  = t.email;
    document.getElementById("fecha").value  = t.fechaISO;
    document.getElementById("hora").value   = t.hora;
    editIndex = Number(idx);
    window.scrollTo({top:form.offsetTop-80,behavior:"smooth"});
  }
});

// --- Botón subir ---
document.addEventListener("DOMContentLoaded",()=>{
  const scrollUp = document.getElementById("scroll-up");
  window.addEventListener("scroll",()=>{scrollUp.style.display = window.scrollY>300 ? "block":"none";});
  scrollUp.addEventListener("click",e=>{
    e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"});
  });
});


