const express = require("express")
const router = express.Router()

const estatisticaService = require("./../services/estatisticaService")
const { AuthMiddleware } = require('../middlewares/AuthMiddleware')



router.get("/", AuthMiddleware.apply(['Gerente', 'Dentista', 'Paciente']), async (req, res) => {
    try {
        const result = await estatisticaService.buscarTodos(req.user)
        return res.send(result)
    } catch (error) {
        console.log(`[ERRO - GET /pacientes/usuario] : ${error.message}`)
        res.status(error.status).json({
            message: "Erro ao buscar paciente por usuario."
        })
    }
})


module.exports = router
