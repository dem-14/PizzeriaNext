const jwt = require('jsonwebtoken')
const config = require('../config');

function removeSchema(token) {
    return token.replace("bearer", '').trim()
}

function validateToken(authorization) {
    try {
        const token = removeSchema(authorization);
        return jwt.verify(token, config.secret);
    }
    catch (e) {
        return null;
    }
}

function verifyRoles(user, roles) {
    return true;
}

function auth(...roles) {
    return (req, res, next) => {
        const authorization = req.headers.authorization
        if (!authorization) {
            res.status(403).json('""')
        }
        const user = validateToken(authorization)
        if (!user || !verifyRoles(user, roles)) {
            res.status(403).json('""')
        }
        req.user = user
        next()
    }
}

module.exports = auth