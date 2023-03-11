require('./helpers/Passport');
const session = require('express-session');
const express = require("express")
const PASSPORT = require('passport');
//ROTAS
const salaRoute = require("./routes/SalaRoute")
const procedimentoRoute = require("./routes/ProcedimentoRoute")
const usuarioRoute = require("./routes/UsuarioRoute")
const pacienteRoute = require("./routes/PacienteRoute")
const dentistaRoute = require("./routes/DentistaRoute")
const consultaRoute = require("./routes/ConsultaRoute")
const authRoute = require("./routes/AuthRoute")
const estatisticaRoute = require("./routes/estatisticaRoute")

const cors = require("cors")
const db = require("./db")
//const dentista = require("./models/Dentista")

const api = express()

db.connect()
api.use(session({
  secret: 'sua_chave_secreta',
  resave: true,
  saveUninitialized: true
}));
api.use(PASSPORT.initialize());
api.use(PASSPORT.session());
api.use(express.json())
api.use(
  cors({
    origin: "*"
  })
)

//Rotas especializadas
api.use("/salas", salaRoute)
api.use("/procedimentos", procedimentoRoute)
api.use("/usuarios", usuarioRoute)
api.use("/pacientes", pacienteRoute)
api.use("/dentistas", dentistaRoute)
api.use("/consultas", consultaRoute)
api.use("/auth", authRoute)
api.use("/estatistica", estatisticaRoute)

// Rota raíz
api.get("/", (req, res) => {
  res.send("Bem-vindo(a) ao Odonto API !!")
})

module.exports = api
