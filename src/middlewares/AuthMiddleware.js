const {decodeAuthToken} = require("../helpers/TokenHelper");

class AuthMiddleware {
    static apply(roles = []) {
        return (req, res, next) => {
            try {
                const authHeader = req.headers.authorization
                const [, tokenAuthorization] = authHeader.split(' ')
                if(!tokenAuthorization) {
                    return res.status(401).send('Not Authorized')
                }

                const decodedToken = decodeAuthToken(tokenAuthorization)

                if(roles.includes(decodedToken.role)) {
                    req.user = decodedToken
                    return next()
                }
                return res.status(401).send('Not Authorized')
            } catch (e) {
                return res.status(401).send('Not Authorized')
            }
        }

    }
}

module.exports = {AuthMiddleware}
