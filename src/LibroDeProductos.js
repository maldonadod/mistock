const Producto = require("./Producto");

class LibroDeProductos {
  constructor(interfaz, repositorioDeProductos) {
    this.interfaz = interfaz;
    this.repositorioDeProductos = repositorioDeProductos;
  }
  async leer() {
    const productos = await this.repositorioDeProductos.obtenerTodos()
    if (productos.length === 0) {
      this.interfaz.informarAusenciaDeProductos()
    } else {
      this.interfaz.listarProductos(productos)
    }
  }
  async escribir(peticion) {
    try {
      const producto = new Producto(peticion.producto, peticion.estado)
      await this.repositorioDeProductos.guardar(producto)
      await this.leer()
    } catch (error) {
      this.interfaz.informarError(error.message)
    }
  }
}

module.exports = LibroDeProductos;