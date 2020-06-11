function getValidator({ fields, message, stack }) {
    return {
        fields,
        message,
        validators: stack.map(s => ({
            sanitizer:s.sanitizer?true:false,
            validator: s.sanitizer || s.validator,
            args: s.options.filter(s => s)
        }))
    }
}
function getBuilderProp(array) {
    return array.filter(o => o && 'builder' in o)
        .map(o => getValidator(o.builder))

}
function getBuilder(obj) {
    return Object.entries(obj)
        .filter(o => Array.isArray(o[1]))
        .reduce((a,b) => {
            a[b[0]]=getBuilderProp(b[1])
            return a;
        },{})

}
export {
    getBuilder,
    getBuilderProp
}