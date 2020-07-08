class PresentadorDeCategorias {
  constructor(pantallas, ingresarProducto) {
    this.pantallas = pantallas;
    this.ingresarProducto = ingresarProducto;
  }
  indicarQueNoHayCategorias() {
    this.pantallas.mostrarPantallaFaltanteDeCategorias();
  }
  mostrarCategorias(categorias) {
    this.pantallas.mostrarPantallaDeCategorias(categorias, this);
  }
  async ingresarProductoEnCategoria(producto, categoria) {
    try {
      await this.ingresarProducto.ejecutar(producto, categoria);
    } catch (error) {
      this.pantallas.mostrarError(error.message);
    }
  }
}

module.exports = PresentadorDeCategorias;