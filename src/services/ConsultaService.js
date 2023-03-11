const consultaModel = require("./../models/Consulta")

module.exports = {
  buscarTodos: async () => {
    try {
      return await consultaModel.find({})
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  buscarTodosReferencias: async (user) => {
    try {
      const results =  await consultaModel.find({})
      .populate("sala")
      .populate("dentista")
      .populate('paciente')
      .exec()
      if(user.role === 'Paciente') {
        return results.filter(result => result?.paciente?.email == user.email)
      }
      else return results
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  buscarReferencias: async (id) => {
    try {
      return await consultaModel.find({_id: id})
      .populate("sala", "descricao")
      .populate("dentista", "nome")
      .populate("paciente", "nome celular") //separar por espaço para adicionar infos.
      .exec()
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  adicionar: async (consulta) => {
    try {
      if (consulta) return await consultaModel.create(consulta)
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  editar: async (id, consulta) => {
    try {
      if (id && consulta) return await consultaModel.findOneAndUpdate({ _id: id }, consulta)
      throw { message: "Informações incompletas.", status: 400 }
    } catch (error) {
      throw { message: error.message, status: 500 }
    }
  }
}
