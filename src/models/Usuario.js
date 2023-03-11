const mongoose = require("mongoose")
const { Schema } = mongoose

const usuarioSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: [
      "Dentista",
      "Paciente",
      "Gerente",
    ],
    required: true
  },
  ativo: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model("Usuario", usuarioSchema)
