const inquirer = require("inquirer");
const PeticionEscritura = require("./PeticionEscritura");

class Interfaz {
  informarAusenciaDeProductos() {
    console.clear()
    console.log("Es hora de cargar productos !!")
    mostrarInputParaProducto(this)
  }
  listarProductos(productos) {
    console.clear()
    console.log(
      productos
        .map(producto => producto.description)
        .join(", \n")
    )
    mostrarInputParaProducto(this)
  }
  informarError(mensajeDeError) {
    console.log(mensajeDeError)
  }
}

function mostrarInputParaProducto(interfaz) {
  inquirer
    .prompt([{
      name: "producto",
      message: "nombre del producto:"
    }])
    .then(answers => {
      const { producto } = answers;
      const peticion = new PeticionEscritura(producto, "pendiente de compra")
      interfaz.libro.escribir(peticion)
    })
}

module.exports = Interfaz;