const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET

function createAuthToken(data) {
    return jwt.sign(data, SECRET, {expiresIn: '1h'})
}

function decodeAuthToken(token) {
    const isValid = jwt.verify(token, SECRET)

    if (!isValid) {
        throw new Error('Invalid Auth Token')
    }
    return jwt.decode(token, SECRET)
}

module.exports = {createAuthToken, decodeAuthToken}
