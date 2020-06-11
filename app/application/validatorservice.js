import {getBuilder} from './validatorbuilder'
const glog = require('glob');
const promisify = require('util').promisify;
const path = require('path');


const globPromise = promisify(glog).bind(null);

function loadModule(file){
   file = path.resolve(process.cwd(),file)
   return eval('require(file)');
}
async function getValidators() {
    try {
        const src = 'app/validators/**/*.js'
        const files = await globPromise(src);

        return files
            .map(file => loadModule(file))
            .filter(m => typeof m === 'object')
            .map(o => getBuilder(o))
            .filter(o=>o)[0];
    }
    catch(err){
        console.log(err);
    }

}
module.exports =getValidators;
    

