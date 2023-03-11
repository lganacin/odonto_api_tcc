const pacienteModel = require("./../models/Paciente");
const usuarioModel = require("./../models/Usuario");

module.exports = {
  buscarTodos: async () => {
    try {
      return await pacienteModel.find({});
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

  buscarPorUsuario: async (usuarioId) => {
    try {
      return await pacienteModel.find({ usuario: usuarioId });
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

  adicionar: async (paciente) => {
    try {
      if (paciente && paciente.usuario){
        paciente.usuario.role = "Paciente"
        let usuario = await usuarioModel.create(paciente.usuario)
        paciente.usuario = usuario
        return await pacienteModel.create({...paciente, email: paciente.usuario.email})
      }
      throw { message: "Informações incompletas.", status: 400 };
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

  editar: async (id, paciente) => {
    try {
      if (id && paciente)
        return await pacienteModel.findOneAndUpdate({ _id: id }, paciente);
      throw { message: "Informações incompletas.", status: 400 };
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  },
};
