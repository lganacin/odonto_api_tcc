const mongoose = require("mongoose")
const { Schema } = mongoose

const procedimentoSchema = new Schema({
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
})

module.exports = mongoose.model("Procedimento", procedimentoSchema)