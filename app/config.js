//  Crear variable de entorno mediante consola 
//   SETX PIZZERIA_URL c:\keys\pizzeria.json
// El archivo   pizzeria.json tiene que tener la siguiente estructura

/* 
{
    secret: "xxxx",
    profit: x.xx,
    cloudinarySecret: "xxxxx",
    "algoriaSecret":"xxxx"
}
*/
const fs = require('fs')
const config = fs.readFileSync (process.env.PIZZERIA_URL)

module.exports = JSON.parse(config)