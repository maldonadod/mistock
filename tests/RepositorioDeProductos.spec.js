const RepositorioDeProductos = require("../src/RepositorioDeProductos");
const Producto = require("../src/Producto");

describe("RepositorioDeProductos", () => {
  let repositorioDeProductos, listaDeProductos;

  beforeEach(() => {
    listaDeProductos = {
      encontrarTodos: jest.fn(),
      persistir: jest.fn(),
    }
    repositorioDeProductos = new RepositorioDeProductos(listaDeProductos)
  })

  it("debe obtener productos", async () => {
    listaDeProductos.encontrarTodos.mockResolvedValue([{
      nombre: "Prepizza",
      estado: "pendiente de stock"
    }])

    const productos = await repositorioDeProductos.obtenerTodos()

    expect(productos).toEqual([
      new Producto("Prepizza", "pendiente de stock")
    ])
  })  
  it("debe intentar persistir el producto que se quiere escribir", async () => {
    const prepizza = new Producto("Prepizza", "pendiente de stock")

    await repositorioDeProductos.guardar(prepizza)

    expect(listaDeProductos.persistir).toBeCalledWith({
      "nombre": "Prepizza",
      "estado": "pendiente de stock"
    })
  })
  it("debe intentar persistir el producto que se quiere escribir y al fallar no escribirlo", async () => {
    listaDeProductos.encontrarTodos.mockResolvedValue([])
    listaDeProductos.persistir.mockRejectedValue(new Error("imposible guardar"))
    
    const prepizza = new Producto("Prepizza", "pendiente de stock")
    
    try {
      await repositorioDeProductos.guardar(prepizza)
    } catch (error) {
      const productos = await repositorioDeProductos.obtenerTodos()
  
      expect(productos).toEqual([])
    }
    
  })
  it("debe intentar persistir el producto que se quiere escribir y al fallar alzar error", async () => {
    listaDeProductos.encontrarTodos.mockResolvedValue([])
    listaDeProductos.persistir.mockRejectedValue(new Error("imposible guardar"))
    
    const prepizza = new Producto("Prepizza", "pendiente de stock")
    
    await expect(() => repositorioDeProductos.guardar(prepizza)).rejects.toThrow()
  })
  it("debe intentar persistir el producto y al conseguirlo agregarlo al listado en memoria", async () => {
    listaDeProductos.encontrarTodos.mockResolvedValue([])
    listaDeProductos.persistir.mockResolvedValue()
    
    const prepizza = new Producto("Prepizza", "pendiente de stock")
    
    await repositorioDeProductos.guardar(prepizza)
    
    const productos = await repositorioDeProductos.obtenerTodos()

    expect(productos).toEqual([prepizza])
  })
})