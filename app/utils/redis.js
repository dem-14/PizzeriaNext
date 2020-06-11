const redis = require("redis");
const {promisify } = require('util')
module.exports = function(){
    const client = redis.createClient();
    return {
        HSET:promisify(client.HSET).bind(client),
        HGET:promisify(client.HGET).bind(client),
        HDEL:promisify(client.HDEL).bind(client),
        HVALS:promisify(client.HVALS).bind(client),
        quit:promisify(client.quit).bind(client),
    }
}