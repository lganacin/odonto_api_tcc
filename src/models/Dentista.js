const mongoose = require("mongoose")
const { Schema } = mongoose

const dentistaSchema = new Schema({
  nome: {
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
  area: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
})

module.exports = mongoose.model("Dentista", dentistaSchema)