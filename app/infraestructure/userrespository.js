const redis = require('../utils/redis');
const User = require('../domain/user')
class UserRepository {
    constructor() {
        this.client = redis()
    }
    async get(email) {
        const data = await this.client.HGET('users',email)  
        if (data){
            return new User(JSON.parse(data));
        }
    }
    async add(user) {
        await this.client.HSET('users',user.email, JSON.stringify(user));
        return user;
    }
    async dispose(){
        await this.client.quit();
    }
}
module.exports = UserRepository