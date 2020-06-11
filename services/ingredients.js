const api = '/api/ingredients'
class IngredientClient{
    async add(data){
        const response = await fetch(api,{
            method:'POST',
            headers:{
                'content-type':'application/json'
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
        })
    }
    async update(id,data){
        return await fetch(`${api}/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
    }
}

export default new IngredientClient();