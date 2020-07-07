class AbrirAplicationMyStock {
  constructor(servicioDeCategorias, presentador) {
    this.servicioDeCategorias = servicioDeCategorias
    this.presentador = presentador
  }
  async ejecutar() {
    const categorias = await this.servicioDeCategorias.obtenerTodas();
    if (categorias.length === 0) {
      this.presentador.indicarQueNoHayCategorias()
    } else {
      this.presentador.mostrarCategorias(categorias)
    }
  }
}

module.exports = AbrirAplicationMyStock;