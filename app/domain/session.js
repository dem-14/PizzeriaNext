const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken')
const ms = require('ms');
const config = require('../config');

function sign(claims) {
    return jwt.sign(claims, config.secret, { expiresIn: ms('1h') });
}

class Session {
    constructor(dto) {
        this.email = dto.email;
        this.name = dto.name;
        this.token = dto.token;
        this.refreshToken = dto.refreshToken;
        this.expiresIn = dto.expiresIn;
    }
    update(session) {
        this.token = sign({
            email: session.email,
            name: session.name,
        });
        this.expiresIn = Session.getTokenData(session.token);
    }
    static getTokenData(token) {
        const playload = Buffer.from(token.split('.')[1], 'base64').toString();
        return JSON.parse(playload).exp;
    }
    static create(dto) {
        const session = {
            name: dto.name,
            email: dto.email,
            //role: dto.role,
            token: sign(dto, config.secret, { expiresIn: '1h' }),
            refreshToken: nanoid(),
        }
        session.expiresIn = this.getTokenData(session.token);
        return new Session(session)
    }

}
module.exports = Session;