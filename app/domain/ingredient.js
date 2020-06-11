const { nanoid } = require('nanoid');

class Ingredient {
    constructor(dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.price = Number(dto.price);

    }
    static create(dto) {
        const ingredient = {
            id: nanoid(),
            name: dto.name,
            price: dto.price,
        }
        return new Ingredient(ingredient)
    }
    update(dto) {
        this.name = dto.name;
        this.price = dto.price;
    }
}
module.exports = Ingredient;