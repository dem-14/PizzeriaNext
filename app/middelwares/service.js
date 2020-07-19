function services(service) {
    return async (req, res, next) => {
        try {
            req.service = new service();
            await next()
        }
        finally {
            if (req.service && 'dispose' in req.service) {
                await req.service.dispose();
            }
        }
    }
}

module.exports = services