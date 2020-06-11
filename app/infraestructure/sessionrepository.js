const redis = require('../utils/redis');
const Session = require('../domain/session')

class SessionRepository {
    constructor() {
        this.client = redis();
    }
    async get(refreshToken) {
        const session = await this.client.HGET('session', refreshToken)
        if (session) {
            return new Session(JSON.parse(session));
        }
    }
    async add(session) {
        await this.client.HSET('session', session.refreshToken, JSON.stringify(session));
        return session;
    }
    async remove(refreshToken) {
        await this.client.HDEL('session', refreshToken)
    }
    async update(session) {
        return await this.add(session)
    }
    async dispose() {
        await this.client.quit()
    }
}

module.exports = SessionRepository;