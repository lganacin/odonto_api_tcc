const express = require("express")
const router = express.Router()

const pacienteService = require("./../services/PacienteService")
const {AuthMiddleware} = require("../middlewares/AuthMiddleware");

router.get("",async (req, res) => {
  try {
    let resposta = await pacienteService.buscarTodos()
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /pacientes] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar paciente."
    })
  }
})

router.get("/usuario/:id", AuthMiddleware.apply(['Gerente', 'Dentista']),async (req, res) => {
  try {
    let resposta = await pacienteService.buscarPorUsuario(req.params.id)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /pacientes/usuario] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar paciente por usuario."
    })
  }
})

router.post("",async (req, res) => {
  try {
    let resposta = await pacienteService.adicionar(req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - POST /pacientes] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao adicionar novo paciente."
    })
  }
})

router.put("/:id",AuthMiddleware.apply(['Gerente', 'Dentista']), async (req, res) => {
  try {
    let resposta = await pacienteService.editar(req.params.id, req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - PUT /pacientes] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao editar paciente."
    })
  }
})

module.exports = router
