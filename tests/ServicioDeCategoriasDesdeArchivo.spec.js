const Categoria = require("../src/entities/Categoria");
const ServicioDeCategoriasDesdeArchivo = require("../src/ServicioDeCategoriasDesdeArchivo");

describe("ServicioDeCategoriasDesdeArchivo", () => {
  it("debe retornar una lista vacia cuando el archivo no contenga categorias", async () => {

    const servicio = new ServicioDeCategoriasDesdeArchivo("../tests/archivo-vacio.json")

    const categorias = await servicio.obtenerTodas()

    expect(categorias).toEqual([])
  })
  it("debe retornar una lista de categorias desde el archivo", async () => {

    const servicio = new ServicioDeCategoriasDesdeArchivo("../tests/archivo-con-categorias.json")

    const categorias = await servicio.obtenerTodas()

    expect(categorias).toEqual([new Categoria("categorias")])
  })
})