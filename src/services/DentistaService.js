const dentistaModel = require("./../models/Dentista");
const usuarioModel = require("./../models/Usuario");
const usuarioService = require('../services/UsuarioService')

const mongoose = require('mongoose');


module.exports = {
  buscarTodos: async () => {
    try {
      return await dentistaModel.find({}).populate('usuario').exec();
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
      let usuarioId = null
      if (id && dentista) {
        if(dentista.usuario?._id == null && dentista.usuario?.email !== null && dentista.usuario?.senha !== null) {
          const user = await usuarioService.adicionar({
            email: dentista.usuario?.email,
            senha: dentista.usuario?.senha,
            role: 'Dentista',
          })
          usuarioId = user._id
        }

        if (dentista.usuario?._id != null) {
          await usuarioService.editar(dentista.usuario?._id, {
            email: dentista.usuario?.email,
            senha: dentista.usuario?.senha,
          })
        }

        const usuario = dentista.usuario?._id || usuarioId
        const {_id, ...dados} = dentista
        return await dentistaModel.findByIdAndUpdate(id, {...dados, usuario});
      }
      throw { message: "Informações incompletas.", status: 400 };
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },
};
