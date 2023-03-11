const express = require("express")
const router = express.Router()

const usuarioService = require("./../services/UsuarioService")
const {AuthMiddleware} = require("../middlewares/AuthMiddleware");

router.get("", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await usuarioService.buscarTodos()
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - GET /usuarios] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao buscar usuario."
    })
  }
})

router.post("", AuthMiddleware.apply(['Gerente']),async (req, res) => {
  try {
    let resposta = await usuarioService.adicionar(req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - POST /usuarios] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao adicionar novo usuario."
    })
  }
})

router.put("/:id", AuthMiddleware.apply(['Gerente']), async (req, res) => {
  try {
    let resposta = await usuarioService.editar(req.params.id, req.body)
    res.json(resposta)
  } catch (error) {
    console.log(`[ERRO - PUT /usuarios] : ${error.message}`)
    res.status(error.status).json({
      message: "Erro ao editar usuario."
    })
  }
})

router.put("/inativar/:id", AuthMiddleware.apply(['Gerente']),async (req, res) => {
    try {
      let resposta = await usuarioService.inativar(req.params.id)
      res.json(resposta)
    } catch (error) {
      console.log(`[ERRO - PUT /usuarios/inativar] : ${error.message}`)
      res.status(error.status).json({
        message: "Erro ao inativar usuario."
      })
    }
  })


module.exports = router
