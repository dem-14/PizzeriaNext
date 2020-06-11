const { nanoid } = require('nanoid');

class Comment {
    #id = nanoid();
    constructor(dto) {
        this.text = dto.text;
        this.user = dto.user;
        this.rating = dto.rating;
    }
    toJSON() {
        return {
            id: this.#id,
            text: this.text,
            user: this.user,
            rating: this.rating
        }
    }
}

module.exports = Comment;