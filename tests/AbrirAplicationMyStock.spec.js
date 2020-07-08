//desde donde empezamos a palpar nuestra aplicacion ?
//nuestra aplicacion necesita proveernos de 2 listas
//una lista de productos que tengo en stock y productos pendientes de compra...
//antes de poder ingresar un producto...
//necesito consultar y/o analisar estas listas

const AbrirAplicationMyStock = require("../src/AbrirAplicationMyStock");

describe("AplicacionMyStock", () => {

  let servicioDeCategorias, presentador, abrir;

  beforeEach(() => {
    servicioDeCategorias = {
      obtenerTodas: jest.fn()
    }
    presentador = {
      indicarQueNoHayCategorias: jest.fn(),
      mostrarCategorias: jest.fn()
    }
    abrir = new AbrirAplicationMyStock(servicioDeCategorias, presentador)
  })

  it("debe indicar falta de categorias cuando estas no estan configuradas", async () => {
    servicioDeCategorias.obtenerTodas.mockResolvedValue([])

    await abrir.ejecutar()

    expect(presentador.indicarQueNoHayCategorias).toBeCalled()
  })
  it("debe mostrar las categorias que se sirvan", async () => {
    servicioDeCategorias.obtenerTodas.mockResolvedValue([
      "En Stock",
      "Pendiente de compra"
    ])

    await abrir.ejecutar()

    expect(presentador.mostrarCategorias).toBeCalledWith([
      "En Stock",
      "Pendiente de compra"
    ])
  })
})