const UI = require("./src/ui");
const PresentadorDeCategorias = require("./src/PresentadorDeCategorias");
const AbrirAplicationMyStock = require("./src/AbrirAplicationMyStock");
const ServicioDeCategoriasDesdeArchivo = require("./src/ServicioDeCategoriasDesdeArchivo");

const servicio = new ServicioDeCategoriasDesdeArchivo("../categorias.json");

let abrir;

class IngresarProducto {
  async ejecutar(producto, categoria) {
    await servicio.guardar(producto, categoria);
    abrir.ejecutar();
  }
}

const ingresarProducto = new IngresarProducto();

const presentador = new PresentadorDeCategorias(new UI(), ingresarProducto);

abrir = new AbrirAplicationMyStock(servicio, presentador);

abrir.ejecutar()