const User = require('../domain/user')
const UserRepository = require('../infraestructure/userrespository')
const SessionService = require('../application/sessionservice')
const {DuplicateError,NotExistsError} =require('../utils/customerrors')


class UserService {
    constructor(){
        this.userRepository = new UserRepository();
        this.sessionService = new SessionService();
    }
    async register(dto) {
        var user = await this.userRepository.get(dto.email);
        if(user){
            throw new DuplicateError('User already exists')
        }
        user = await this.userRepository.add(User.create(dto));
        return await this._createSession(user);
    }
    async _createSession(user){
        return await this.sessionService.create({
            name:user.name,
            email:user.email
        })
    }
    async login(dto) {
        const user = await this.userRepository.get(dto.email);
        if (!user || (User.encryptPassWord(dto.password) !== user.password)) {
            throw new NotExistsError('the username or password is incorrect')
        }
        return await this._createSession(user)
    }
    async dispose(){
        await this.userRepository.dispose();
        await this.sessionService.dispose();
    }
    
}

module.exports = UserService