class Producto {
  constructor(nombre, estado) {
    this.nombre = nombre;
    this.estado = estado;
  }
  get description() {
    return `${this.nombre}: ${this.estado}`
  }
}

module.exports = Producto;