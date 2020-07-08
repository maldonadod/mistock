const LibroDeProductos = require("../src/LibroDeProductos");
const PeticionEscritura = require("../src/PeticionEscritura");
const Producto = require("../src/Producto");

const unProducto = {
  deNombre(nombre) {
    unProducto.producto = { nombre }
    return this
  },
  conEstado(estado) {
    unProducto.producto.estado = estado
    return new Producto(unProducto.producto.nombre, unProducto.producto.estado)
  }
}

describe("StockApp", () => {

  let libro, interfaz, repositorioDeProductos;

  beforeEach(() => {
    interfaz = {
      informarAusenciaDeProductos: jest.fn(),
      listarProductos: jest.fn(),
      informarError: jest.fn(),
    }
    repositorioDeProductos = {
      guardar: jest.fn(),
      obtenerTodos: jest.fn()
    }
    libro = new LibroDeProductos(interfaz, repositorioDeProductos)
  })

  it("debe informar que no hay productos cargados", async () => {
    repositorioDeProductos.obtenerTodos.mockResolvedValue([])

    await libro.leer()

    expect(interfaz.informarAusenciaDeProductos).toBeCalled()
  })
  it("debe listar productos cargados", async () => {
    const aceitunas = unProducto
      .deNombre("Aceitunas")
      .conEstado("Pendiente de compra")

    repositorioDeProductos.obtenerTodos.mockResolvedValue([aceitunas])

    await libro.leer()

    expect(interfaz.listarProductos).toBeCalledWith([aceitunas])
  })
  it("debe guardar producto y al fallar mostrar error", async () => {
    repositorioDeProductos.guardar.mockRejectedValue(new Error("Imposible guardar"))

    const peticion = new PeticionEscritura()
    peticion.producto = "Queso rayado"
    peticion.estado = "Pendiente de compra"

    await libro.escribir(peticion)

    expect(interfaz.informarError).toBeCalledWith("Imposible guardar")
  })
  it("debe guardar producto y al conseguirlo volver a listar productos", async () => {
    const peticion = new PeticionEscritura("Queso rayado", "Pendiente de compra")
    const aceitunas = unProducto.deNombre(peticion.producto).conEstado(peticion.estado)

    repositorioDeProductos.guardar.mockResolvedValue()
    repositorioDeProductos.obtenerTodos.mockResolvedValue([aceitunas])


    await libro.escribir(peticion)

    expect(interfaz.listarProductos).toBeCalledWith([aceitunas])
  })
})