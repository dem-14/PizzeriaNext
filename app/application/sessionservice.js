const SessionRepository = require('../infraestructure/sessionrepository')
const Session = require('../domain/session')
const {NotExistsError} = require('../utils/customerrors')
class SessionService{
    constructor(){
        this.repository = new SessionRepository();
    }
    async create(dto){
        const session = Session.create(dto);
        return await this.repository.add(session)
    }
    async remove(refreshToken){
        await this.repository.remove(refreshToken);
    }
    async update(refreshToken){
        const session = await this.repository.get(refreshToken);
        if(!session){
            throw new NotExistsError(`can't refresh the token`)
        }
        session.update(session);
        await this.repository.update(session);
        return session;
    }
    async dispose(){
        await this.repository.dispose();
    }
}
module.exports = SessionService;