const mongoose = require("mongoose")
const { Schema } = mongoose

const salaSchema = new Schema({
  numero: {
    type: Number,
    unique: true,
    required: true
  },
  descricao: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model("Sala", salaSchema)
