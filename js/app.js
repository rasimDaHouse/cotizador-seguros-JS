//constructores

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

//realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  //leer el aNo
  const diferencia = new Date().getFullYear() - this.year;
  //si es mayor el aNo el costo se reduce  un 3%
  cantidad -= (diferencia * 3 * cantidad) / 100;
  console.log(cantidad);

  /* 
  seguro basico se multiplica por un 30%
  seguro completo se multiplica por un 50%
  */
  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};

function UI() {}

//llenar opciones de los Años
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

//Intanciar UI
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones(); //llena el select con los aNos
});

eventListeners();
function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}
// muestra alerta en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }
  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  //insertar en Html
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = (total, seguro) => {
  const { marca, year, tipo } = seguro;
  let textoMarca;

  switch (marca) {
    case "1":
      textoMarca = "Americano";
      break;
    case "2":
      textoMarca = "Asiatico";
      break;
    case "3":
      textoMarca = "Europeo";
      break;

    default:
      break;
  }
  //crear resultado
  const div = document.createElement("div");
  div.classList.add("mt-10");

  div.innerHTML = `
     <p class = "header"> Tu Resumen</p>
     <p class = "font-bold">Marca: <span class = "font-normal"> ${textoMarca}</span></p>
     <p class = "font-bold">Year: <span class = "font-normal">  ${year}</span></p>
     <p class = "font-bold">Tipo: <span class = "font-normal capitalize">  ${tipo}</span></p>
     <p class = "font-bold">Total: <span class = "font-normal"> $ ${total}</span></p>
  `;
  const resultadoDiv = document.querySelector("#resultado");

  const btnCotizar = document.querySelector("#cotizar");

  //msotrar spinner
  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  btnCotizar.classList.add("cursor-not-allowed", "opacity-50");
  btnCotizar.disabled = true;
  setTimeout(() => {
    spinner.style.display = "none"; // borra el; spinner
    resultadoDiv.appendChild(div); //muestra el resultado

    btnCotizar.disabled = false;
    btnCotizar.classList.remove("cursor-not-allowed", "opacity-50");
  }, 3000);
};

function cotizarSeguro(e) {
  e.preventDefault();

  //Leer la marca seleccionada
  const marca = document.querySelector("#marca").value;
  //Leer el aNo selecciondo
  const year = document.querySelector("#year").value;

  //Leer el tipo de cobertura
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }

  ui.mostrarMensaje("Cotizando...", "exito");

  //ocultar las cotizaciones previas
  const resultados = document.querySelector("#resultado div");
  if (resultados != null) {
    resultados.remove();
  }

  //   instanciar seguro

  const seguro = new Seguro(marca, year, tipo);

  const total = seguro.cotizarSeguro();
  // utilizar el prototype que va a cotizar
  ui.mostrarResultado(total, seguro);
}
