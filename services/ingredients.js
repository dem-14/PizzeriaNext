import User from './user'
const api = '/api/ingredients'
class IngredientClient{
    async add(data){
        const user = await User.get();
        const response = await fetch(api,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                'authorization': `bearer ${user.token}`
            },
            body:JSON.stringify(data)
        })
        return await response.json();
    }
    async getAll(){
        const response = await fetch(api)
        return await response.json();
    }
    async remove(id){
        return await fetch(`${api}/${id}`,{
            method:'DELETE',
            headers: {
                'authorization': `bearer ${user.token}`
            }
        })
    }
    async update(id,data){
        const resolve = await fetch(`${api}/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'authorization': `bearer ${user.token}`
            },
            body:JSON.stringify(data)
        })
return resolve.json();    }
}

export default new IngredientClient();