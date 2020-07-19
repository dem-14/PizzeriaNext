import { get } from 'idb-keyval';

class User {
    async get() {
        return await get('user')
    }
}

export default new User()