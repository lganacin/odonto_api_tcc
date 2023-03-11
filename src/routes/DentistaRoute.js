const express = require("express")
const router = express.Router()

const dentistaService = require("./../services/DentistaService")
const {AuthMiddleware} = require('../middlewares/AuthMiddleware')

router.get("", async (req, res) => {
  try {
    let resposta = await dentistaService.buscarTodos()
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /dentistas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar dentista."
    })
  }
})

router.get("/usuario/:id", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await dentistaService.buscarPorUsuario(req.params.id)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /dentistas/usuario] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar dentista por usuario."
    })
  }
})

router.post("", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await dentistaService.adicionar(req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - POST /dentistas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao adicionar novo dentista."
    })
  }
})

router.put("/:id", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await dentistaService.editar(req.params.id, req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - PUT /dentistas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao editar dentista."
    })
  }
})

module.exports = router
