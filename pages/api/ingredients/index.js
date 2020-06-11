import handler from '../../../app/middelwares/nextconnect'
import { INGREDIENTVALIDATORREGISTER } from '../../../app/validators/ingredientvalidator'
import services from '../../../app/middelwares/service'
import IngredientService from '../../../app/application/ingredientservice';
const connect = handler();

connect.get(services(IngredientService), async (req, res) => {
    const ingredients = await req.service.getAll();
    res.json(ingredients);
})

connect.post(INGREDIENTVALIDATORREGISTER, services(IngredientService), async (req, res) => {
    const ingredient = await req.service.create(req.body);
    res.status(201).json(ingredient);
})

export default connect;