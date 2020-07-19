import handler from '../../app/middelwares/nextconnect'
const cloudinary = require('cloudinary').v2
import { cloudinarySecret } from '../../app/config'

const connect = handler();

connect.post((req, res) => {
    const params = { timestamp: Math.floor(Date.now() / 1000).toString() }
    const key = cloudinary.utils.api_sign_request(params, cloudinarySecret)
    res.json({ ...params, key });
})

export default connect;