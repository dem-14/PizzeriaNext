const { nanoid } = require('nanoid');
const profit = require('../utils/profit');

class Pizza {
    constructor(dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.image = dto.image;
        this.price = dto.price || this.getPrice(dto);
        this.comments = dto.comments || []
        this.rating = this.getRating(this.comments);
        this.ingredients = dto.ingredients.map(i => ({ id: i.id }));
    }
    static create(dto) {
        const pizza = {
            id: nanoid(),
            ...dto
        }
        return new Pizza(pizza)
    }
    getPrice(dto) {
        const price = dto.ingredients.reduce(
            (previous, current) => previous + current.price, 0);
        return profit(price);
    }
    addComment(comment) {
        this.comments.push(comment);
        this.rating = this.getRating(this.comments)
    }
    getRating(comments) {
        return comments.reduce(
            (previous, current) => previous + current.rating, 0
        ) / (comments.length || 1);
    }
    update(dto) {
        this.name = dto.name;
        this.image = dto.image;
        this.price = this.getPrice(dto);
        this.ingredients = dto.ingredients.map(i => ({ id: i.id }));
    }
}

module.exports = Pizza;