import handler from '../../app/middelwares/nextconnect'
import services from '../../app/middelwares/service'
import SessionService from '../../app/application/sessionservice';
const connect = handler();
connect.post(services(SessionService),async (req,res)=>{
    await req.service.remove(req.body.refreshToken);
    res.status(204).end();
})

export default connect;