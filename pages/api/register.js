import handler from '../../app/middelwares/nextconnect'
import { USERVALIDATOREGISTER } from '../../app/validators/uservalidator'
import services from '../../app/middelwares/service'
import UserService from '../../app/application/userservice';
const connect = handler();
connect.post(USERVALIDATOREGISTER, services(UserService), async (req, res) => {
    const session = await req.service.register(req.body);
    res.json(session);
})

export default connect;