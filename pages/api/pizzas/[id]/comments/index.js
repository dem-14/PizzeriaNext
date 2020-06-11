import handler from '../../../../../app/middelwares/nextconnect'
import PizzaService from '../../../../../app/application/pizzaservice'
import services from '../../../../../app/middelwares/service'

const connect = handler();


connect.post(services(PizzaService), async (req, res) => {
    const comment = await req.service.addComment(req.query.id, req.body);
    res.status(201).json(comment);
})



export default connect;