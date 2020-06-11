class DuplicateError extends Error{
    constructor(messaje){
        super(messaje)
    }
}
class NotExistsError extends Error{
    constructor(messaje){
        super(messaje)
    }
}

module.exports={
    DuplicateError,
    NotExistsError
}