"use strict";

let oLibreria = new Libreria();
ocultarTodo();
registrarEventos();

function registrarEventos() {
  document
    .querySelector("#menuAltaLibro")
    .addEventListener("click", mostrarFormularioAltaLibro);
  document
    .querySelector("#menuActualizarLibro")
    .addEventListener("click", mostrarFormularioActualizarLibro);
  document
    .querySelector("#menuEliminarLibro")
    .addEventListener("click", mostrarFormularioEliminarLibro);
  document
    .querySelector("#menuAltaAutor")
    .addEventListener("click", mostrarFormularioAltaAutor);
  document
    .querySelector("#menuActualizarAutor")
    .addEventListener("click", mostrarFormularioActualizarAutor);
  document
    .querySelector("#menuEliminarAutor")
    .addEventListener("click", mostrarFormularioEliminarAutor);
  document
    .querySelector("#menuLibroPorAutor")
    .addEventListener("click", mostrarListaLibroPorAutor);
  document
    .querySelector("#menuAutorPorLibro")
    .addEventListener("click", mostrarListaAutorPorLibro);
  document
    .querySelector("#menuListaAutores")
    .addEventListener("click", mostrarListaAutores);

  document
    .querySelector("#menuListaLibros")
    .addEventListener("click", mostrarListaLibros);

  document
    .getElementById("btnGuardarAutor")
    .addEventListener("click", altaAutorfrm);

  document
    .getElementById("btnGuardarLibro")
    .addEventListener("click", altaLibrofrm);

  document
    .getElementById("btnAutorPorLIbros")
    .addEventListener("click", mostarTablaAutoresPorLibro);
  document
    .getElementById("btnLibrosPorAutor")
    .addEventListener("click", mostarTablaLibroPorAutor);
  document.getElementById("btnActualizar").addEventListener("click", modLibro);
  document
    .getElementById("btnDeleteLibro")
    .addEventListener("click", deleteLibrofrm);
  document
    .getElementById("btnDeleteAutor")
    .addEventListener("click", deleteAutorfrm);
  document
    .getElementById("btnActualizarAutor")
    .addEventListener("click", modAutorfrm);
}

async function altaAutorfrm() {
  let authorId = null;
  let authorNname = frmAltaAutor.txtNombreAutor.value.trim();
  let authorBirthdate = frmAltaAutor.dateFechaNacimiento.value;
  let authorPremio = frmAltaAutor.chkPremio.checked;
  let authorNacionalidad = frmAltaAutor.txtNacionalidad.value.trim();
  let oAutor = new Autor(
    authorId,
    authorNname,
    authorBirthdate,
    authorPremio,
    authorNacionalidad
  );

  let respuesta = await oLibreria.altaAutor(oAutor);
  // console.log(respuesta.mensaje);
  // console.log("respuesta: " + respuesta.mensaje);
  // alert(respuesta.mensaje);
  alert(respuesta.mensaje);
  if (!respuesta.error) {
    ocultarTodo();
  }
}
async function modLibrofrm() {
  let selectElementLibro = document.getElementById("lstLibrosModificar");
  let selectElementAutor = document.getElementById("lstModificarAutorDelLibro");
  // Obtener el valor seleccionado
  let bookId = Number(selectElementLibro.value);
  let bookIdAutor = Number(selectElementAutor.value);

  let bookTitle = frmModLibro.txtTituloLibroMod.value.trim();
  let bookPublished = frmModLibro.dateFechaLibroMod.value;
  let oLibro = new Libro(bookId, bookTitle, bookPublished, bookIdAutor);
  let respuesta = await oLibreria.modLibro(oLibro);
  let mensajeElemento = document.getElementById("mensajeActualizarLibro");

  alert(respuesta.mensaje);
  if (!respuesta.error) {
    mensajeElemento.style.display = "block";
    mensajeElemento.innerText = "¡Libro actualizado correctamente!";
    ocultarTodo();
  } else {
    mensajeElemento.style.display = "block";
    mensajeElemento.innerText = "Error al actualizar el libro.";
  }
}
async function modAutorfrm() {
  let selectElementAutor = document.getElementById("lstAutorForMofificar");
  let IdAutor = selectElementAutor.value;
  let authorId = IdAutor;
  let authorNname = frmModAutor.txtAutorModificar.value.trim();
  let authorBirhdate = frmModAutor.dateFechaNacimientoModificar.value;
  let authorPremio = frmModAutor.chkPremioModificar.checked;
  let authorNacionalidad =
    frmModAutor.txtNacionalidadAutorModificar.value.trim();
  let oAutor = new Autor(
    authorId,
    authorNname,
    authorBirhdate,
    authorPremio,
    authorNacionalidad
  );
  let respuesta = await oLibreria.modAutor(oAutor);

  alert(respuesta.mensaje);

  if (!respuesta.error) {
    ocultarTodo();
  }
}
async function altaLibrofrm() {
  let bookId = null;
  let bookTitle = frmAltaLibro.txtTituloLibro.value.trim();
  let bookPublished = frmAltaLibro.dateFechaPublicacion.value;
  let bookIdAutor = frmAltaLibro.lstAutores.value;
  let oLibro = new Libro(bookId, bookTitle, bookPublished, bookIdAutor);
  let respuesta = await oLibreria.altaLibro(oLibro);
  alert(respuesta.mensaje);
  var toastElList = [].slice.call(document.querySelectorAll(".toast"));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl, option);

    toast.show();
  });
  if (!respuesta.error) {
    ocultarTodo();
  }
}

async function deleteLibrofrm() {
  let selectElementLibro = document.getElementById("lstLibrosDelete");

  let bookId = selectElementLibro.value;
  let respuesta = await oLibreria.deleteLibro(bookId);

  let mensajeElemento = document.getElementById("mensajeDeleteLibro");
  alert(respuesta.mensaje);
  if (!respuesta.error) {
    ocultarTodo();
  }
}

async function deleteAutorfrm() {
  let selectElementLibro = document.getElementById("lstAutoresDelete");
  let authorId = selectElementLibro.value;
  let respuesta = await oLibreria.deleteAutor(authorId);

  alert(respuesta.mensaje);
  if (!respuesta.error) {
    ocultarTodo();
  }
}

async function mostarTablaAutoresPorLibro() {
  let selectElement = document.getElementById("lstAutoresForLibros");

  let selectedValue = selectElement.value;

  let resultado = await oLibreria.mostarTablaAutoresPorLibro(selectedValue);
  if (resultado.error) {
    mostrarModal("No se pudieron recuperar los datos\n" + resultado.datos);
  } else {
    tblListaAutoresPorLibro.style.display = "block";
    let rowsHTML = "";

    for (let fila of resultado.datos) {
      if (fila.authorPremio == 1) {
        fila.authorPremio = "Sí";
      } else {
        fila.authorPremio = "No";
      }
      rowsHTML +=
        "<tr><td>" +
        fila.authorId +
        "</td><td>" +
        fila.authorNname +
        "</td><td>" +
        fila.authorBirhdate +
        "</td><td>" +
        fila.authorPremio +
        "</td><td>" +
        fila.authorNacionalidad +
        "</td></tr>";
    }

    tableAuthorsPorLibro.innerHTML = rowsHTML;
  }
}
async function mostarTablaLibroPorAutor() {
  let selectElement = document.getElementById("lstLibrosForAutor");

  let selectedValue = selectElement.value;

  let resultado = await oLibreria.mostarTablaLibroPorAutor(selectedValue);
  if (resultado.error == true) {
    mostrarModal("No se han podido recuperar los datos\n" + resultado.datos);
  } else {
    tblListaLibrosPorAutor.style.display = "block";

    let rowsHTML = "";
    // Rellenar el desplegable
    for (let fila of resultado.datos) {
      rowsHTML +=
        "<tr><td>" +
        fila.bookId +
        "</td><td>" +
        fila.bookTitle +
        "</td><td>" +
        fila.bookPublished +
        "</td></tr>";
    }
    tableLibroPorAutor.innerHTML = rowsHTML;
  }
}

async function rellenarListadoAutores() {
  let resultado = await oLibreria.getAutores();

  if (resultado.error == true) {
    mostrarModal("No se han podido recuperar los datos\n" + resultado.datos);
  } else {
    let options = "";

    for (let fila of resultado.datos) {
      options +=
        "<option value='" +
        fila.authorId +
        "' >" +
        "" +
        fila.authorNname +
        "" +
        "</option>";
    }
    console.log("resultado");
    lstLibrosForAutor.innerHTML = options;
    lstAutores.innerHTML = options;
    lstModificarAutorDelLibro.innerHTML = options;
    lstAutorForMofificar.innerHTML = options;
    lstAutoresDelete.innerHTML = options;
  }
}

async function rellenarListadoLibros() {
  let resultado = await oLibreria.getLibros();

  if (resultado.error == true) {
    mostrarModal("No se han podido recuperar los datos\n" + resultado.datos);
  } else {
    let options = "";

    for (let fila of resultado.datos) {
      options +=
        "<option value='" +
        fila.bookId +
        "' >" +
        "" +
        fila.bookTitle +
        "" +
        "</option>";
    }
    lstAutoresForLibros.innerHTML = options;
    lstLibrosModificar.innerHTML = options;
    lstLibrosDelete.innerHTML = options;
  }
}

async function mostrarTablaAutores() {
  let resultado = await oLibreria.getAutores();
  if (resultado.error) {
    mostrarModal("No se pudieron recuperar los datos\n" + resultado.datos);
  } else {
    let rowsHTML = "";

    for (let fila of resultado.datos) {
      if (fila.authorPremio == 1) {
        fila.authorPremio = "Sí";
      } else {
        fila.authorPremio = "No";
      }
      rowsHTML +=
        "<tr><td>" +
        fila.authorId +
        "</td><td>" +
        fila.authorNname +
        "</td><td>" +
        fila.authorBirhdate +
        "</td><td>" +
        fila.authorPremio +
        "</td><td>" +
        fila.authorNacionalidad +
        "</td></tr>";
    }

    tableAuthors.innerHTML = rowsHTML;
  }
}
async function mostrarTablaLibros() {
  let resultado = await oLibreria.getLibros();
  if (resultado.error) {
    mostrarModal("No se pudieron recuperar los datos\n" + resultado.datos);
  } else {
    let rowsHTML = "";

    for (let fila of resultado.datos) {
      rowsHTML +=
        "<tr><td>" +
        fila.bookId +
        "</td><td>" +
        fila.bookTitle +
        "</td><td>" +
        fila.bookPublished +
        "</td></tr>";
    }

    tableBooks.innerHTML = rowsHTML;
  }
}

function mostrarFormularioAltaLibro() {
  ocultarTodo();
  frmAltaLibro.style.display = "block";
  rellenarListadoAutores();
}
function modLibro() {
  ocultarTodo();
  modLibrofrm();
}
function mostrarFormularioActualizarLibro() {
  ocultarTodo();
  frmModLibro.style.display = "block";
  rellenarListadoAutores();
  rellenarListadoLibros();
}
function mostrarFormularioEliminarLibro() {
  ocultarTodo();
  frmDelLibro.style.display = "block";
  rellenarListadoLibros();
}
function mostrarFormularioAltaAutor() {
  ocultarTodo();
  frmAltaAutor.style.display = "block";
}
function mostrarFormularioActualizarAutor() {
  ocultarTodo();
  rellenarListadoAutores();
  console.log("Actuali");
  frmModAutor.style.display = "block";
}
function mostrarFormularioEliminarAutor() {
  ocultarTodo();
  frmDelAutor.style.display = "block";
  rellenarListadoAutores();
}
function mostrarListaLibroPorAutor() {
  ocultarTodo();
  frmListaLibrosPorAutor.style.display = "block";
  rellenarListadoAutores();
}
function mostrarListaAutorPorLibro() {
  ocultarTodo();
  frmListaAutoresPorLibro.style.display = "block";
  rellenarListadoLibros();
}
function mostrarListaAutores() {
  ocultarTodo();
  tblListaAutores.style.display = "block";
  mostrarTablaAutores();
}
function mostrarListaLibros() {
  ocultarTodo();
  tblListaLibros.style.display = "block";
  mostrarTablaLibros();
}

function ocultarTodo() {
  frmAltaLibro.style.display = "none";
  frmModLibro.style.display = "none";
  frmDelLibro.style.display = "none";
  frmAltaAutor.style.display = "none";
  frmModAutor.style.display = "none";
  frmDelAutor.style.display = "none";
  frmListaLibrosPorAutor.style.display = "none";
  frmListaAutoresPorLibro.style.display = "none";
  tblListaLibros.style.display = "none";
  tblListaAutores.style.display = "none";
  tblListaAutoresPorLibro.style.display = "none";
  tblListaLibrosPorAutor.style.display = "none";
}
