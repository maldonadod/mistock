const inquirer = require("inquirer");

class Pantallas {
  mostrarPantallaFaltanteDeCategorias() {
    console.log("no hay categorias amigo")
  }
  mostrarError(errorMensaje) {
    console.log(errorMensaje)
  }
  async mostrarPantallaDeCategorias(categorias, presentador) {
    console.log(JSON.stringify(categorias, null, 2))
    const questions = [{
      type: "input",
      message: "Ingrese el nombre del producto",
      name: "producto"
    }, {
      type: "list",
      message: "Seleccione la categoria",
      choices: categorias.map(c => c.nombre),
      name: "categoria"
    }]

    const { producto, categoria } = await inquirer.prompt(questions)

    presentador.ingresarProductoEnCategoria(producto, categoria)
  }
}

module.exports = Pantallas;