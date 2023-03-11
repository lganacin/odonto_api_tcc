const dentistaModel = require("./../models/Dentista");
const usuarioModel = require("./../models/Usuario");

module.exports = {
  buscarTodos: async () => {
    try {
      return await dentistaModel.find({});
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

  buscarPorUsuario: async (usuarioId) => {
    try {
      return await dentistaModel.find({ usuario: usuarioId });
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

  adicionar: async (dentista) => {
    try {
      if (dentista && dentista.usuario){
        dentista.usuario.role = "Dentista"
        let usuario = await usuarioModel.create(dentista.usuario)
        dentista.usuario = usuario
        
        return await dentistaModel.create(dentista)
      }
      throw { message: "Informações incompletas.", status: 400 };
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

  editar: async (id, dentista) => {
    try {
      if (id && dentista)
        return await dentistaModel.findOneAndUpdate({ _id: id }, dentista);
      throw { message: "Informações incompletas.", status: 400 };
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },
};
