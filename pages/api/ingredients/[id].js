import handler from '../../../app/middelwares/nextconnect'
import { INGREDIENTVALIDATORREGISTER } from '../../../app/validators/ingredientvalidator'
import services from '../../../app/middelwares/service'
import IngredientService from '../../../app/application/ingredientservice';
const connect = handler();

connect.delete(services(IngredientService), async (req, res) => {
    await req.service.remove(req.query.id);
    res.status(204).json("''");
})

connect.put(INGREDIENTVALIDATORREGISTER, services(IngredientService), async (req, res) => {
    await req.service.update(req.query.id, req.body);
    res.status(204).json("''");
})

export default connect;