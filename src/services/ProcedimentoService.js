const procedimentoModel = require("./../models/Procedimento")

module.exports = {
  buscarTodos: async () => {
    try {
      return await procedimentoModel.find({})
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  adicionar: async (procedimento) => {
    try {
      if (procedimento) return await procedimentoModel.create(procedimento)
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  editar: async (id, procedimento) => {
    try {
      if (id && procedimento) return await procedimentoModel.findOneAndUpdate({ _id: id }, procedimento)
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  excluir: async (id) => {
    try {
      if (id) return await procedimentoModel.findOneAndDelete({ _id: id })
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  } 
}