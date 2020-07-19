const { nanoid } = require('nanoid');
const crypto = require('crypto');

class User {
    constructor(dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.password = dto.password;
        this.email = dto.email;
        //this.role = dto.role;
    }
    static encryptPassWord(password) {
        return crypto.createHash('sha256').update(password).digest('base64');
    }
    static create(dto) {
        const user = {
            id: nanoid(),
            name: dto.name,
            password: this.encryptPassWord(dto.password),
            email: dto.email,
        }
        return new User(user)
    }
}
module.exports = User;