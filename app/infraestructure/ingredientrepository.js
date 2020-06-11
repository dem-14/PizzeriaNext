const redis = require('../utils/redis');
const Ingredient = require('../domain/ingredient')

class IngredientRepository {
    constructor() {
        this.client = redis();
    }
    async get(ingredientId) {
        const ingredient = await this.client.HGET('ingredients', ingredientId)
        if (ingredient) {
            return new Ingredient(JSON.parse(ingredient));
        }
    }
    async getAll() {
        const ingredients = await this.client.HVALS('ingredients')
        return ingredients.map(ingredient => new Ingredient(JSON.parse(ingredient)));
    }
    async add(ingredient) {
        await this.client.HSET('ingredients', ingredient.id, JSON.stringify(ingredient));
        return ingredient;
    }
    async remove(ingredientId) {
        await this.client.HDEL('ingredients', ingredientId)
    }
    async update(ingredient) {
        return await this.add(ingredient)
    }
    async dispose() {
        await this.client.quit()
    }
}

module.exports = IngredientRepository;