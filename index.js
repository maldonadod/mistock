const RepositorioDeProductos = require("./src/RepositorioDeProductos");
const Interfaz = require("./src/Interfaz");
const LibroDeProductos = require("./src/LibroDeProductos");

const interfaz = new Interfaz()

const listaDeProductos = {
  todos: [],
  encontrarTodos() {
    return listaDeProductos.todos
  },
  persistir(producto) {
    listaDeProductos.todos.push(producto)
  }
}

const repositorioDeProductos = new RepositorioDeProductos(listaDeProductos);

const libro = new LibroDeProductos(interfaz, repositorioDeProductos);

interfaz.libro = libro;

libro.leer()