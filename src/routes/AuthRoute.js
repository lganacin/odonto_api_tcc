const { login, authenticateGoogle } = require("../services/AuthService");
const router = require("express").Router()
const passport = require("passport");
const qs = require('querystring')

router.post('/login', async (req, res) => {
    try {
        const errors = []
        if (!req.body.email) {
            errors.push('Email Obrigatório')
        }

        if (!req.body.senha) {
            errors.push('Senha é obrigatória')
        }

        if (errors.length > 0) {
            return res.status(400).send({ errors })
        }
        const user = await login(req.body)
        return res.status(200).send(user)
    } catch (error) {
        console.log(`[ERRO - Post /login] : ${error.message}`)
        res.status(error.status).json({
            message: "Erro ao realizar login"
        })
    }
})

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: `/` }),
    async (req, res) => {
        let formatted_user = {
            code: req.user.id,
            name: req.user.displayName,
            email: req.user.emails[0].value,
            active: true
        };
        const user = await authenticateGoogle(formatted_user)
        const query = qs.stringify(user)
        return res.redirect('http://191.252.210.189:8081/cadastro?' + query)
    }
);

module.exports = router
