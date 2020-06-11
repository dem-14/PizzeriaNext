// TODO crear get by id y put
// TODO add comment pizzas/id/comments (POST)
import handler from '../../../app/middelwares/nextconnect'
import PizzaService from '../../../app/application/pizzaservice'
import services from '../../../app/middelwares/service'

const connect = handler();


connect.get(services(PizzaService), async (req, res) => {
    const pizza = await req.service.get(req.query.id);
    res.json(pizza);
})

connect.put(services(PizzaService), async (req, res) => {
    const pizza = await req.service.update(req.query.id, req.body);
    res.json(pizza);
})



export default connect;