const config = require('./config')
const url = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`

class CloudinaryService{
    
    async upload(image) {
        const params = await this.getParams();
        const data = new FormData();
        data.append('file', image);
        data.append('api_key', config.apiKey);
        data.append('timestamp', params.timestamp);
        data.append('signature', params.key)
        const response = await fetch(url, 
            {
                method: 'POST',
                body: data
            })
        return await response.json();
    }

    async getParams() {
        const response = await fetch('/api/cloudinary', {
            method: 'POST'
        })
        return await response.json()
    }
    
    getUrlImage(image) {
        return `https://res.cloudinary.com/${config.cloudName}/image/upload/c_scale,dl_2,f_webp,h_100,r_0/v${image.version}/${image.public_id}.${image.format}`
    }
}

export default new CloudinaryService();