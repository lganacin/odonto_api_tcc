const express = require("express")
const router = express.Router()

const procedimentoService = require("./../services/ProcedimentoService")
const {AuthMiddleware} = require("../middlewares/AuthMiddleware");

router.get("", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await procedimentoService.buscarTodos()
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /procedimentos] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar procedimentos."
    })
  }
})

router.post("", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await procedimentoService.adicionar(req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - POST /procedimentos] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao adicionar novo procedimento."
    })
  }
})

router.put("/:id", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await procedimentoService.editar(req.params.id, req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - PUT /procedimentos] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao editar procedimentos."
    })
  }
})

router.delete("/:id", AuthMiddleware.apply(['Gerente']), async (req, res) => {
    try {
      let resposta = await procedimentoService.excluir(req.params.id, req.body)
      res.json(resposta)
    } catch (error) {
      console.log(`[ERRO - DELETE /procedimentos] : ${error.message}`)
      res.status(error.status).json({
        message: "Erro ao excluir procedimentos."
      })
    }
  })

module.exports = router
