import TextField from '@material-ui/core/TextField';
export default function Input({ type, name, value, validators, label }) {
    const { register, errors, validator } = validators;
    const validateField = validator.find(f => f.fields.includes(name));
    const validateFn = (value) => {
        let result = true;
        for (const v of validateField.validators) {
            let args = [value, ...v.args]
            result = v.validator(...args)
            if (!v.sanitize && !result) {
                return result;
            }
            if (v.sanitize) {
                value = result;
            }
        }
        return result;
    }
    if (validateField)
        return (
            <>
                <TextField id={name} type={type} inputRef={register({
                    validate: validateFn
                })} name={name} value={value} label={label} />
            </>
        )
    return (<TextField id={name} type={type} inputRef={register} name={name} value={value} label={label} />)
}