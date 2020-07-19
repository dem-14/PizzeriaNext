import User from './user'
const api = '/api/pizzas'

class PizzaClient {
    async get(id) {
        const response = await fetch(`${api}/${id}`)
        return await response.json();
    }
    
    async add(data) {
        const user = await User.get();
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }

    async update(id, data) {
        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }
}

export default new PizzaClient();