class Container {
  constructor(baseDatos, tabla) {
    this.baseDatos = baseDatos
    this.tabla = tabla
  }

  async getAll() {
    try {
      const response = await this.baseDatos("*").from(this.tabla);
      return response;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const response = await this.baseDatos.insert(element).into(this.tabla);
      console.log(response)
      return response;
    } catch (error) {
      return error;
    }
  }
}

export {
  Container
};