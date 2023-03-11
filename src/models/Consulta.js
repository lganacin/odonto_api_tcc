const mongoose = require("mongoose")
const { Schema } = mongoose

const consultaSchema = new Schema({
  data: {
    type: Date,
    required: true
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true
  },
  dentista: {
    type: mongoose.Schema.Types.ObjectId, // testar diferença de Schema.Types
    ref: "Dentista",
    required: true
  },
  sala: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sala",
    required: true
  },
  procedimento: { //cópia
    descricao: {
      type: String,
      required: true
    },
    duracao: {
      type: Number,
      required: true
    },
    preco: {
      type: Number,
      required: true
    }
  }
})

module.exports = mongoose.model("Consulta", consultaSchema)