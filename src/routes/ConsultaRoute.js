const express = require("express")
const router = express.Router()

const consultaService = require("./../services/ConsultaService")
const {AuthMiddleware} = require("../middlewares/AuthMiddleware");

router.get("", AuthMiddleware.apply(['Gerente', 'Dentista', 'Paciente']),async (req, res) => {
  try {
    let resposta = await consultaService.buscarTodos()
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /consultas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar consultas."
    })
  }
})

router.get("/completa", AuthMiddleware.apply(['Gerente', 'Dentista', 'Paciente']),async (req, res) => {
  try {
    const user = req.user
    let resposta = await consultaService.buscarTodosReferencias(user)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /consultas/completa] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar consultas com referências."
    })
  }
})

router.get("/completa/:id", AuthMiddleware.apply(['Gerente', 'Dentista', 'Paciente']),async (req, res) => {
  try {
    let resposta = await consultaService.buscarReferencias(req.params.id)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /consultas/completa] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar consultas com referências."
    })
  }
})

router.post("", AuthMiddleware.apply(['Gerente', 'Dentista', 'Paciente']),async (req, res) => {
  try {
    let resposta = await consultaService.adicionar(req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - POST /consultas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao adicionar nova consulta."
    })
  }
})

router.put("/:id", AuthMiddleware.apply(['Gerente', 'Dentista', 'Paciente']),async (req, res) => {
  try {
    let resposta = await consultaService.editar(req.params.id, req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - PUT /consultas] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao editar consulta."
    })
  }
})

module.exports = router
