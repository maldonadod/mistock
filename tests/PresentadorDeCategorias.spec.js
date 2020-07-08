const PresentadorDeCategorias = require("../src/PresentadorDeCategorias");

describe("PresentadorDeCategorias", () => {
  
  let pantallas, presentador, ingresarProductoEnCategoria;

  beforeEach(() => {
    ingresarProductoEnCategoria = {
      ejecutar: jest.fn()
    }
    pantallas = {
      mostrarPantallaFaltanteDeCategorias: jest.fn(),
      mostrarPantallaDeCategorias: jest.fn(),
      mostrarError: jest.fn(),
    }
    presentador = new PresentadorDeCategorias(pantallas, ingresarProductoEnCategoria)
  })

  it("debe mostrar que no hay categorias", () => {
    presentador.indicarQueNoHayCategorias()

    expect(pantallas.mostrarPantallaFaltanteDeCategorias).toBeCalled()
  })  
  it("debe mostrar las categorias", () => {
    presentador.mostrarCategorias(["una categoria", "otra categoria"])

    expect(pantallas.mostrarPantallaDeCategorias).toBeCalledWith(["una categoria", "otra categoria"], presentador)
  })  
  it("debe intentar ingresar nuevo producto", async () => {
    ingresarProductoEnCategoria.ejecutar.mockRejectedValue(new Error("imposible guardar"))

    await presentador.ingresarProductoEnCategoria("Vino", "En Stock")
    
    expect(ingresarProductoEnCategoria.ejecutar).toBeCalledWith("Vino", "En Stock")
    expect(pantallas.mostrarError).toBeCalledWith("imposible guardar")
  })  
})