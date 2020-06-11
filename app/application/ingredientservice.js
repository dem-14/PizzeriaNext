const IngredientRepository = require('../infraestructure/ingredientrepository')
const Ingredient = require('../domain/ingredient')
const { NotExistsError } = require('../utils/customerrors')
class IngredientService {
    constructor() {
        this.repository = new IngredientRepository();
    }
    async getAll(){
        return await this.repository.getAll();
    }
    async create(dto) {
        const ingredient = Ingredient.create(dto);
        return await this.repository.add(ingredient)
    }
    async remove(ingredientId) {
        await this.repository.remove(ingredientId);
    }   
    async update(id, dto) {
        const ingredient = await this.repository.get(id);
        if (!ingredient) {
            throw new NotExistsError(`can't find ingredient`)
        }
        ingredient.update(dto)
        return await this.repository.update(ingredient);
    }
    async dispose() {
        await this.repository.dispose();
    }
}
module.exports = IngredientService;