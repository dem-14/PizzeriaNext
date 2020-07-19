const { check } = require('express-validator');
const validator = require('./validator');
const pizzaValidator = [
    check('name').isLength({ min: 1, max: 50 }),
]

const PIZZAVALIDATOR = [
    ...pizzaValidator,
    validator
];

module.exports = {
    PIZZAVALIDATOR,
}