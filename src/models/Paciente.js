const mongoose = require("mongoose")
const { Schema } = mongoose

const pacienteSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cpf: {
    type: Number,
    unique: true,
    required: true
  },
  celular: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
})

module.exports = mongoose.model("Paciente", pacienteSchema)
