import handler from '../../../app/middelwares/nextconnect'
import PizzaService from '../../../app/application/pizzaservice'
import services from '../../../app/middelwares/service'
import auth from '../../../app/middelwares/auth'

const connect = handler();

connect.post(auth('admin'), services(PizzaService), async (req, res) => {
    const pizza = await req.service.create(req.body);
    res.status(201).json(pizza);
})

export default connect;