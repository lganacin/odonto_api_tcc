const usuarioModel = require("./../models/Usuario")

module.exports = {
  buscarTodos: async () => {
    try {
      return await usuarioModel.find({})
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  adicionar: async (usuario) => {
    try {
      if (usuario) return await usuarioModel.create(usuario)
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  editar: async (id, usuario) => {
    try {
      if (id && usuario) return await usuarioModel.findOneAndUpdate({ _id: id }, usuario)
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  inativar: async (id) => {
    try {
      if (id){
        let usuarioEncontrado = await usuarioModel.findOne({ _id: id })
        if(usuarioEncontrado){
          usuarioEncontrado.ativo = false
          return await usuarioModel.findOneAndUpdate({ _id: id }, usuarioEncontrado)
        }
        throw { message: "Usuário não encontrado.", status: 400 }        
      } 
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  } 
}