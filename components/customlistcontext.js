import react from 'react'

const noop = () => {}

const CustomListContext = react.createContext({
    handleToggleAll: noop,
    numberOfChecked: noop,
    handleToggle: noop,
    checked: [],
})

export default CustomListContext