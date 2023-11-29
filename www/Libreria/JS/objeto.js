"use strict";

class Autor {
  constructor(
    authorId,
    authorNname,
    authorBirhdate,
    authorPremio,
    authorNacionalidad
  ) {
    this._authorId = authorId;
    this._authorNname = authorNname;
    this._authorBirhdate = authorBirhdate;
    this._authorPremio = authorPremio;
    this._authorNacionalidad = authorNacionalidad;
  }

  get authorId() {
    return this._authorId;
  }

  get authorNname() {
    return this._authorNname;
  }

  get authorBirhdate() {
    return this._authorBirhdate;
  }

  get authorPremio() {
    return this._authorPremio;
  }
  get authorNacionalidad() {
    return this._authorNacionalidad;
  }

  set authorId(valor) {
    this._authorId = valor;
  }

  set authorNname(valor) {
    this._authorNname = valor;
  }

  set authorBirhdate(valor) {
    this._authorBirhdate = valor;
  }

  set authorPremio(valor) {
    this._authorPremio = valor;
  }
  set authorNacionalidad(valor) {
    this._authorNacionalidad = valor;
  }
}

class Libro {
  constructor(bookId, bookTitle, bookPublished, bookIdAutor) {
    this._bookId = bookId;
    this._bookTitle = bookTitle;
    this._bookPublished = bookPublished;
    this._bookIdAutor = bookIdAutor;
  }

  get bookId() {
    return this._bookId;
  }
  get bookTitle() {
    return this._bookTitle;
  }
  get bookPublished() {
    return this._bookPublished;
  }
  get bookIdAutor() {
    return this._bookIdAutor;
  }
  set bookId(valor) {
    this._bookId = valor;
  }
  set bookTitle(valor) {
    this._bookTitle = valor;
  }
  set bookPublished(valor) {
    this._bookPublished = valor;
  }
  set bookIdAutor(valor) {
    this._bookIdAutor = valor;
  }
}

class Libreria {
  constructor() {}

  async altaAutor(oAutor) {
    let parametros = new FormData();

    parametros.append("author", JSON.stringify(oAutor));

    let respuesta = await peticionPOST("alta_autor.php", parametros);
    return respuesta;
  }

  async altaLibro(oLibro) {
    let parametros = new FormData();
    parametros.append("books", JSON.stringify(oLibro));

    let respuesta = await peticionPOST("alta_libro.php", parametros);
    return respuesta;
  }
  async modLibro(oLibro) {
    let parametros = new FormData();
    parametros.append("books", JSON.stringify(oLibro));
    let respuesta = await peticionPOST("mod_libro.php", parametros);
    return respuesta;
  }
  async modAutor(oAutor) {
    let parametros = new FormData();
    parametros.append("author", JSON.stringify(oAutor));
    let respuesta = await peticionPOST("mod_autor.php", parametros);
    return respuesta;
  }

  async getAutores() {
    //para rellenar el desplegable.
    let parametros = new FormData();

    let respuesta = await peticionGET("get_autores.php", parametros);

    return respuesta;
  }
  async getLibros() {
    let parametros = new FormData();

    let respuesta = await peticionGET("get_libros.php", parametros);

    return respuesta;
  }

  async mostarTablaAutoresPorLibro(id) {
    let parametros = new FormData();
    parametros.append("books", JSON.stringify(id));
    let respuesta = await peticionGET("autor_por_libro.php", parametros);
    console.log(respuesta.datos);
    return respuesta;
  }

  async deleteLibro(id) {
    let parametros = new FormData();
    parametros.append("books", JSON.stringify(id));
    let respuesta = await peticionPOST("delete_libro.php", parametros);
    return respuesta;
  }
  async deleteAutor(id) {
    let parametros = new FormData();
    parametros.append("author", JSON.stringify(id));
    let respuesta = await peticionPOST("delete_autor.php", parametros);
    return respuesta;
  }
  async mostarTablaLibroPorAutor(id) {
    let parametros = new FormData();
    parametros.append("author", JSON.stringify(id));

    let respuesta = await peticionGET("libro_por_autor.php", parametros);
    return respuesta;
  }
}
