const redis = require('../utils/redis');
const Pizza = require('../domain/pizza');

class PizzaRepository {
    constructor() {
        this.client = redis();
    }
    async get(pizzaId) {
        const pizza = await this.client.HGET('pizzas', pizzaId)
        if (pizza) {
            return new Pizza(JSON.parse(pizza));
        }
    }
    async add(pizza) {
        await this.client.HSET('pizzas', pizza.id, JSON.stringify(pizza));
        return pizza;
    }
    async update(pizza) {
        return await this.add(pizza)
    }
    async dispose() {
        await this.client.quit()
    }
}

module.exports = PizzaRepository;