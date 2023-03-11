const express = require("express")
const router = express.Router()

const salaService = require("./../services/SalaService")
const {AuthMiddleware} = require("../middlewares/AuthMiddleware");

router.get("", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await salaService.buscarTodos()
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /salas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar salas."
    })
  }
})

router.post("",AuthMiddleware.apply(['Gerente']), async (req, res) => {
  try {
    let resposta = await salaService.adicionar(req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - POST /salas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao adicionar nova sala."
    })
  }
})

router.put("/:id", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await salaService.editar(req.params.id, req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - PUT /salas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao editar sala."
    })
  }
})

module.exports = router
