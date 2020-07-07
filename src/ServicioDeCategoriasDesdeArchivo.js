const Categoria = require("../src/entities/Categoria");

class ServicioDeCategoriasDesdeArchivo {
  constructor(direccionAlArchivo) {
    this.categorias = require(direccionAlArchivo)
      .map(nombre => new Categoria(nombre));
  }
  async obtenerTodas() {
    return this.categorias
  }
  async guardar(producto, categoria) {
    const found = this.categorias.find(c => c.nombre === categoria)
    found.productos.push(producto)
  }
}

module.exports = ServicioDeCategoriasDesdeArchivo;