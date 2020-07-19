import handler from '../../../app/middelwares/nextconnect'
import PizzaService from '../../../app/application/pizzaservice'
import services from '../../../app/middelwares/service'
import auth from '../../../app/middelwares/auth'

const connect = handler();


connect.get(services(PizzaService), async (req, res) => {
    const pizza = await req.service.get(req.query.id);
    res.json(pizza);
})

connect.put(auth('admin'), services(PizzaService), async (req, res) => {
    const pizza = await req.service.update(req.query.id, req.body);
    res.status(201).json(pizza);
})



export default connect;