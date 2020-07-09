const Producto = require("./Producto");

class RepositorioDeProductos {
  constructor(listaDeProductos) {
    this.listaDeProductos = listaDeProductos;
    this.productos = []
  }
  async obtenerTodos() {
    if (this.productos.length === 0) {
      const raw = await this.listaDeProductos.encontrarTodos()
      this.productos = raw.map(({nombre, estado}) => new Producto(nombre, estado))
    }
    return this.productos
  }
  async guardar(producto) {
    try {
      await this.listaDeProductos.persistir(producto)
      this.productos.push(producto)
    } catch (error) {
      throw error
    }
  }
}

module.exports = RepositorioDeProductos;