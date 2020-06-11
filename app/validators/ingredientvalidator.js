const { check } = require('express-validator');
const validator = require('./validator');
const ingredientValidator = [
    check('name').isAlphanumeric().isLength({ min: 1, max: 50 }),
    check('price').isDecimal(), //TODO min max
]

const INGREDIENTVALIDATORREGISTER = [
    ...ingredientValidator,
    validator
];

module.exports = {
    INGREDIENTVALIDATORREGISTER,
}