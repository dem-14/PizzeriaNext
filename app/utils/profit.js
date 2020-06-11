const { profit } = require('../config');

module.exports = function (price) {
    return price * profit;
}