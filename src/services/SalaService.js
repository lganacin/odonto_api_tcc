const salaModel = require("./../models/Sala")

module.exports = {
  buscarTodos: async () => {
    try {
      return await salaModel.find({})
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  adicionar: async (sala) => {
    try {
      if (sala) return await salaModel.create(sala)
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  editar: async (id, sala) => {
    try {
      if (id && sala) return await salaModel.findOneAndUpdate({ _id: id }, sala)
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  }
}
